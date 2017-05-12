var data = require('./src/js/data.js');
var basicData = require('./src/js/basicData.js');
var $ = require('jquery');
require('./src/js/filters.js');
require('./src/css/bootstrap.min.css');
require('./src/css/custom.css');
require('./src/css/flatpickr.min.css');
require('./src/css/font-awesome.css');
require('./src/css/framework.css');

$('.basicExample').filters({
	data: basicData
})

$('.filterDev').filters({
	data: data,
	customEventHandler: function(target){
		var target = $(target);
		if(target.is(':checked')){
			var targetDiv = target.closest('div.form-group');
			var addEle = '<div class="col-md-3 pull-right" name="'+target.attr('data-target')+'"><select class="form-control"><option value="lte"><=</option><option value="gte">>=</option></select></div><div class="col-md-3 pull-right" name="'+target.attr('data-target')+'"><input type="text" class="form-control" placeholder="YTD" /></div>';
			targetDiv.append(addEle);
		}
		else{
			var addParents = target.parents().eq(2);
			var addChildren = addParents.find('div.col-md-3');
			addChildren.remove();
		}

	}
});






