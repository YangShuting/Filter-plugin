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
    this.render();
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

  Filter.prototype.render = function(){
    if(!this.initialized){
      this.$element.addClass(pluginName);
      this.$wrapper = $(this.template.list);
      this.initialized = true;
    }

    this.$element.empty().append(this.$wrapper.empty());
    this.buildTree(this.tree, 0);
  }

  Filter.prototype.buildTree = function(nodes){
    if(!nodes) return;

    var _this = this;
    $.each(nodes, function addNodes(id, node){
      var treeItem = $(_this.template.item).attr('data-nodeid', node.nodeId);
      treeItem.append(node.text);
      if(node.state.parent){
        if(node.nodes){
          treeItem.append($(_this.template.icon).addClass(_this.options.menuRight));
        }
        _this.$wrapper.append(treeItem);
      }
    });
  }

  Filter.prototype.template = {
    list: '<div class="list-group"></div>',
    item: '<div class="list-group-item"></div>',
    icon: '<span class="icon"></span>',
    backIcon: '<div class="backIconDev"><span class="backIcon"></span></div>'
  }

  Filter.prototype.clickHandler = function(event){
    var target = $(event.target);
    var node = this.findNode(target);
    if(!node) return;
    var classList = target.attr('class') ? target.attr('class').split(' '): [];
    if((classList.indexOf('glyphicon-menu-right')!== -1)){
      this.toggleChildModule(node, _default.options);
    }
    else if((classList.indexOf('glyphicon-menu-left')!== -1)){
      this.toggleParentModule();
    }
    else if((classList.indexOf('glyphicon-menu-Up')!==-1)){
      this.toggleChildItem(node);
    }
  }

  Filter.prototype.findNode = function(target){
      var node;
      var nodeId = target.closest('div.list-group-item').attr('data-nodeid') || target;
      nodeId && (node = this.nodes[nodeId]) || (node = target);
      if(!node) console.log('Error: ndoes not found.');
      return node;
  }

  Filter.prototype.toggleChildModule = function(node){
      /*Clear all the parent lists*/
      var _this = this;
      this.$element.empty();
      /*generate the children panel*/
      this.$element.append($(_this.template.backIcon).addClass(this.options.menuLeft));
      _this.$wrapper = $(_this.template.list);
      _this.$element.append(_this.$wrapper);
      $.each(node.nodes, function createChild(index, node){
         var treeItem = $(_this.template.item).attr('data-nodeid', node.nodeId);
         treeItem.append($(_this.template.icon).addClass(_this.options.menuDown));
         treeItem.append(node.text);
         _this.$wrapper.append(treeItem);
      });
  }

  Filter.prototype.toggleParentModule = function(){
      this.render();
  }

  $.fn[pluginName] = function(options, args){
    this.each(function(){
      $.data(this, pluginName, new Filter(this, $.extend(true, {}, options)));
    });
  }

})(jQuery, window, document)