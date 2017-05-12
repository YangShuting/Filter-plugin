console.log('load the filter.js successfully!');
/*Dynamically create the html elements of the filter module.*/
;(function($, window, document, undefined){
  'use strict';
  var pluginName = 'filters';
  var _default = {};
  _default.settings = {
    levels: 2,
    menuRight: 'fa fa-chevron-right',
    menuLeft: 'fa fa-chevron-left',
    menuUp: 'fa fa-chevron-up',
    menuDown: 'fa fa-chevron-down',
    customEventHandler: null
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

  /*Set the level of this card*/
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
      var treeHeader = $(_this.template.itemHeader).html(node.text);
      if (node.class !=undefined) treeHeader.addClass(node.class);
      if(node.state.parent && node.hasOwnProperty('mutex') && node['mutex']!= false){
        if(node.nodes){
          var icon = $(_this.template.icon).addClass(_this.options.menuRight);
          treeHeader.append($(_this.template.iconWrapper).append(icon));
        }
      }
      else{
        var icon = $(_this.template.icon).addClass(_this.options.menuDown)
        treeHeader.append($(_this.template.iconWrapper).append(icon));
      }

      $wrapper.append(treeItem.append(treeHeader));
      $listWrapper.append($wrapper);
    });
  }

  Filter.prototype.template = {
    list: '<div class="" data-tree="list-group"></div>',
    item: '<div class="card" data-tree="list-group-item"></div>',
    itemHeader: '<div class="card-header bg-secondary pointer"></div>',
    iconWrapper: '<span data-tree="iconw-wrapper" class="pull-right"></span>',
    icon: '<i class="icon" aria-hidden="true"></i>',
    listWrapper: '<div class="listWrapper"></div>',
    itemContent: '<div class="card-block" data-tree="item-content"></div>',
    itemDev: '<div class="row form-group"></div>',
    itemLabel: '<label class="col-md-3"></label>',
    backIconWrapper: '<div class="card"></div>',
    backItemHeader: '<div class="card-header bg-primary pointer"></div>',
  }

  Filter.prototype.buildItem = function(target){
    var _this = this; 
    var nodeItem =  target.closest('div[data-tree="list-group-item"]');
    var iconChange = target.find('span > i.icon')
    var iconWrapper = iconChange.closest('span[data-tree="iconw-wrapper"]');
    iconChange.removeClass('fa-chevron-down').addClass('fa-chevron-up');
    var nodeId = nodeItem.attr('data-nodeid');
    var node = this.nodes[nodeId];
    var node1 = node.nodes || node.content;
    var nodeContent = nodeItem.find('div[data-tree="item-content"]');
    if (node.onPanelActived !=undefined && $.isFunction(node.onPanelActived)) {
      node.onPanelActived.call();
    };
      this.renderItem(node1, nodeItem);
  }

  Filter.prototype.clickHandler = function(event){
    var target = $(event.target); 
    var node = this.findNode(target);
    if(!node) return;

    if( target.hasClass('fa-chevron-right') || (target.hasClass('card-header') && target.find('i.fa-chevron-right').length)){
      this.toggleChildModule(target, node);
    }else if( target.hasClass('fa-chevron-left') ||  target.hasClass('card-header') && target.find('i.fa-chevron-left').length){
      this.toggleParentModule(target, node);
    }else if(target.hasClass('fa-chevron-down') || target.hasClass('card-header') && target.find('i.fa-chevron-down').length){
      this.buildItem(target);
    }else if(target.hasClass('fa-chevron-up') || target.hasClass('card-header') && target.find('i.fa-chevron-up').length){
      this.itemClear(target);
    }else if(target.hasClass('eventHandler')){
      this.customFun(target);
    }
  }

  Filter.prototype.customFun = function(target){
    if( $.isFunction(this.customFun)){
      this.options.customEventHandler.call(this, target);
    }
  }

  Filter.prototype.findNode = function(target){
    var node;
    var nodeId = target.closest('div[data-tree="list-group-item"]').attr('data-nodeid') || target;
    nodeId && (node = this.nodes[nodeId]) || (node = target);
    if(!node) console.log('Error: nodes not found.');
    return node;
  }

  Filter.prototype.toggleChildModule = function(target, node){
    /*Clear all the parent lists*/
    var _this = this;
    var $listWrapper = target.closest('div.listWrapper');
    var $wrapper = target.closest('div[data-tree="list-group"]');
    var $siblings = $listWrapper.siblings();
    $siblings.remove();
    $wrapper.empty();

    /*generate the children panel*/
    $.each(node.nodes, function createChild(index, node){
      var iconWrapper = $(_this.template.iconWrapper);
      var icon = $(_this.template.icon).addClass(_this.options.menuDown); 
      var treeItem = $(_this.template.item).attr('data-nodeid', node.nodeId);
      var treeHeader = $(_this.template.itemHeader).html(node.text);
      if (!node.class) treeHeader.addClass(node.class);
      //var headerText = document.createElement("h5");
      //treeItem.innerHTML=node.text;
      treeHeader.append(iconWrapper.append(icon));
      treeItem.append(treeHeader);
      $wrapper.append(treeItem);
     });

    var backIcon = $('<i>').addClass(this.options.menuLeft);
    var backIconWrapper = $(_this.template.backIconWrapper).append($(_this.template.backItemHeader).append(backIcon).append(' Go back to the main menu'));
    $listWrapper.prepend(backIconWrapper);
    $wrapper.find('div[data-tree="list-group-item"]:first').find('div.card-header').trigger('click');
  }

  Filter.prototype.toggleParentModule = function(target, node){
    var _this = this;
    var $wrapper = $(this.template.list);
    var $listWrapper = target.closest('div.listWrapper');
    var listId = $listWrapper.attr('data-listid');
    $listWrapper.empty();
    this.$groups.forEach(function(each){
      _this.buildTree(each, $wrapper, $listWrapper);
    });
  }


  Filter.prototype.renderItem = function(node, nodeItem){
    var _this = this;
    var contentWrapper = $(this.template.itemContent);
    $.each(node, function addContents(index, item){
      if(item instanceof Array){
        var itemDev = $(_this.template.itemDev);
        $.each(item, function loopItem(index, item){
          if(item){
            itemDev.append(item);
            contentWrapper.append(itemDev);
          }   
        })
      }else{
        $.each(item.content, function loopItem1(index, ele){
          var itemDev = $(_this.template.itemDev);
          $.each(ele, function loopItem2(index, ele1){
            itemDev.append(ele1);
          })
          contentWrapper.append(itemDev);
        })
      }   
    });
    nodeItem.append(contentWrapper);
  }

  Filter.prototype.itemClear = function(target){
    var iconChange = target.find('span > i.icon');
    iconChange.removeClass('fa-chevron-up').addClass('fa-chevron-down');
    var listGroupItem =  target.closest('div[data-tree="list-group-item"]');
    var itemContent = listGroupItem.find('div[data-tree="item-content"]');
    itemContent.remove();
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

})(jQuery, window, document, undefined)