console.log('load the filter.js successfully!');
/*Dynamically create the html elements of the filter module.*/
;(function($, window, document, undefined){
  'use strict';
  var pluginName = 'filters';
  var _default = {};
  _default.settings = {
    levels: 2,
    menuRight: 'glyphicon glyphicon-menu-right',
    menuLeft: 'glyphicon glyphicon-menu-left',
    menuUp: 'glyphicon glyphicon-menu-up',
    menuDown: 'glyphicon glyphicon-menu-down'
  };

  var Filter = function(element, options){
    this.$element = $(element);
    this.elementId = element.id;
    this.init(options);
    return {
      options: this.options,
      init: $.proxy(this.init, this),
      remove: $.proxy(this.remove, this)
    }
  }

  Filter.prototype.init = function(options){
    this.tree = [];
    this.nodes = [];
    if(options.data){
      if(typeof options.data === 'string'){
        options.data = $.parseJSON(options.data);
      }
      this.tree = $.extend(true, [], options.data);
      delete options.data;
    }
    this.options = $.extend({}, _default.settings, options);
    this.destroy();
    this.subscribeEvents();
    this.setInitializedState({nodes: this.tree}, 0);
    this.render({nodes: this.tree});
  }

  Filter.prototype.destroy = function(){
    if(!this.initialized) return;
    this.$wrapper.remove();
    this.$wrapper = null;
    this.unsubscribeEvents();
    this.initialized = false;
  }

  Filter.prototype.unsubscribeEvents = function(){
    this.$element.off('click');
  }

  Filter.prototype.subscribeEvents = function(){
     this.unsubscribeEvents();
     this.$element.on('click', $.proxy(this.clickHandler, this));
  }

  /*Set the level of this list-group-item*/
  Filter.prototype.setInitializedState = function(node, level){
     if(!node.nodes) return;
     level+=1;

     var parent = node;
     var _this = this;
     $.each(node.nodes, function checkState(index, node){
      node.nodeId = _this.nodes.length;
      node.parentId = parent.nodeId;
      _this.nodes.push(node);
      node.state = node.state || {};
      if(level < _this.options.levels){
        node.state.parent = true;
      }
      else{
        node.state.parent = false;
      }
      if(node.nodes){
        _this.setInitializedState(node, level);
      }
     });
  }

  Filter.prototype.render = function(nodes){
    var _this = this;
    if(!this.initialized){
      this.$element.addClass(pluginName);
      var groups = this.findMutexGroup(nodes);
      this.$groups = groups;
      this.$element.empty();
      $.each(groups, function createListGroup(index, group){
        var $wrapper = $(_this.template.list);
        var $listWrapper = $(_this.template.listWrapper).attr('data-listId', index);
        $listWrapper.append($wrapper);
        _this.$element.append($listWrapper.empty());
        _this.buildTree(group, $wrapper, $listWrapper);
      });
      this.initialized = true;
    }
  }

  Filter.prototype.buildTree = function(nodes, $wrapper, $listWrapper){
    if(!nodes) return;

    var _this = this;
    $.each(nodes, function addNodes(id, node){
      var treeItem = $(_this.template.item).attr('data-nodeid', node.nodeId);
      treeItem.append(node.text);
      if(node.state.parent && node.hasOwnProperty('mutex') && node['mutex']!= false){
        if(node.nodes){
          treeItem.append($(_this.template.icon).addClass(_this.options.menuRight));
        }
      }
      else{
        treeItem.append($(_this.template.icon).addClass(_this.options.menuDown));
      }
      $wrapper.append(treeItem);
      $listWrapper.append($wrapper);
    });
  }

  Filter.prototype.template = {
    list: '<div class="list-group"></div>',
    item: '<div class="list-group-item"></div>',
    icon: '<span class="icon"></span>',
    listWrapper: '<div class="listWrapper"></div>',
    itemContent: '<div class="itemContent row"></div>',
    itemDev: '<div class="itemDev col-md-12"></div>',
    backIcon: '<div class="backIconDev"><span class="backIcon"></span></div>'
  }

  Filter.prototype.clickHandler = function(event){
    var target = $(event.target);
    var node = this.findNode(target);
    if(!node) return;

    var classList = target.attr('class') ? target.attr('class').split(' '): [];
    if((classList.indexOf('glyphicon-menu-right')!== -1)){
      this.toggleChildModule(target, node);
    }
    else if((classList.indexOf('glyphicon-menu-left')!== -1)){
      this.toggleParentModule(target, node);
    }
    else if((classList.indexOf('glyphicon-menu-down')!== -1)){
      this.buildItem(target);
    }
    else if((classList.indexOf('glyphicon-menu-Up')!== -1)){
      if((classList.indexOf('itemUp')!== -1)){
         this.itemClear(target);
      }
      else{
      this.clearItem(target);
      }
    }
  }

  Filter.prototype.findNode = function(target){
      var node;
      var nodeId = target.closest('div.list-group-item').attr('data-nodeid') || target;
      nodeId && (node = this.nodes[nodeId]) || (node = target);
      if(!node) console.log('Error: nodes not found.');
      return node;
  }

  Filter.prototype.toggleChildModule = function(target, node){
      /*Clear all the parent lists*/
      var _this = this;
      var $listWrapper = target.closest('div.listWrapper');
      var $wrapper = target.closest('div.list-group');
      $wrapper.empty();
    
      /*generate the children panel*/
      $.each(node.nodes, function createChild(index, node){
         var treeItem = $(_this.template.item).attr('data-nodeid', node.nodeId);
         treeItem.append($(_this.template.icon).addClass(_this.options.menuDown));
         treeItem.append(node.text);
         $wrapper.append(treeItem);
      });
      $listWrapper.prepend($(_this.template.backIcon).addClass(this.options.menuLeft));
  }

  Filter.prototype.toggleParentModule = function(target, node){
      var $wrapper = $(this.template.list);
      var $listWrapper = target.closest('div.listWrapper');
      var listId = $listWrapper.attr('data-listid');
      $listWrapper.empty();
      this.buildTree(this.$groups[listId], $wrapper, $listWrapper);
  }

  Filter.prototype.buildItem = function(target){
      var _this = this; 
      var nodeItem =  target.closest('div.list-group-item');
      var iconChange = target.closest('span.glyphicon');
      iconChange.removeClass('glyphicon-menu-down').addClass('glyphicon-menu-Up itemUp');
      var nodeId = nodeItem.attr('data-nodeid');
      var node = this.nodes[nodeId];
      var contentWrapper = $(this.template.itemContent);
        var node1 = node.content || node.nodes;
        $.each(node1, function addContents(index, item){
          var $ele = document.createElement(item.htmlType);
          var itemDev = $(_this.template.itemDev);
          for( var key in item.attr){
            $ele.setAttribute(key, item.attr[key]);
          }
          $ele.append(item.text);
          itemDev.append($ele);
          contentWrapper.append(itemDev);
        });
        nodeItem.append(contentWrapper);
  }

  Filter.prototype.itemClear = function(target){
      var iconChange = target.closest('span.glyphicon');
      iconChange.removeClass('glyphicon-menu-Up').addClass('glyphicon-menu-down');
      var listGroupItem =  target.closest('div.list-group-item');
      var itemContent = listGroupItem.children();
      itemContent.empty();
  }

  Filter.prototype.findMutexGroup = function(nodes){
    return this.groupBy(nodes, function(item){
      return [item.mutex];
    });
  }

  /*Better practice: curry function*/
  Filter.prototype.groupBy = function(nodes, fn){
    var groups = {};
    $.each(nodes.nodes, function group(index, item){
      var group = JSON.stringify(fn(item));
      groups[group] = groups[group] || [];
      groups[group].push(item);
    });
    return Object.keys(groups).map(function(group){
      return groups[group];
    });
  }

  $.fn[pluginName] = function(options, args){
    this.each(function(){
      $.data(this, pluginName, new Filter(this, $.extend(true, {}, options)));
    });
  }

})(jQuery, window, document)