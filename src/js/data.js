var data = [
		{
			text: 'Metrics',
			id: '0',
			mutex: 'group1',
			class: 'bg-primary',
			nodes: [
				{
					text: 'Health & Safety',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-6"><label for="healthSafety_recordable" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="checkbox" data-target="healthSafety_recordable_hiddenInput" name="healthSafety_recordable"/>Recordable cases</label></div>'],
						['<div class="col-md-6"><label for="healthSafety_recordable" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="checkbox" data-target="healthSafety_recordable_hiddenInput" name="healthSafety_recordable"/>First Aid Cases<i class="fa fa-question-circle text-secondary pointer" role="button" data-toggle="tooltip" data-original-title="Please see the detail tips." data-placement="right"></i></label></div>']
					],
					onPanelActived: activeFunc
				},
				{
					text: 'Environment',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-12"><label class="control-label">Select Application:</label></div>'],
						['<div class="col-md-12"><select class="form-control rendered-select" name="UI_appScope"><option value = "All">All</option><optgroup label="Specialized Processes"><option value="149">Condition Reporting</option><option value="150">Water Watch</option></optgroup><optgroup label="Chemical & Product Management"><option value="101">U.S. TSCAIUR Reporting</option></optgroup></select></div>'],
						['<div class="col-md-12"><label class="control-label">Select Device:</label></div>'],
						['<div class="col-md-12"><select class="form-control rendered-select" name="UI_appScope"><option value = "All">All</option><optgroup label="Specialized Processes"><option value="149">Condition Reporting</option><option value="150">Water Watch</option></optgroup><optgroup label="Chemical & Product Management"><option value="101">U.S. TSCAIUR Reporting</option></optgroup></select></div>'],
						['<div class="col-md-3"><label class="control-label">Start Date:</label></div><div class="col-md-9"><div class="input-group"><input type="text" class="datepicker flatpickr-input form-control"/><div class="input-group-addon bg-secondary"><i class="fa fa-calendar"></i></div></div></div>'],
						['<div class="col-md-3"><label class="control-label">End Date:</label></div><div class="col-md-9"><div class="input-group"><input type="text" class="datepicker flatpickr-input form-control"/><div class="input-group-addon bg-secondary"><i class="fa fa-calendar"></i></div></div></div>']

					],
					onPanelActived: activeFunc
				}
			]
		},
		{
			text: 'Visualize Data',
			id: '0',
			mutex: 'group1',
			class: 'bg-primary',
			nodes: [
				{
					text: 'Visualize Data',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-6"><label for="healthSafety_recordable" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="checkbox" data-target="healthSafety_recordable_hiddenInput" name="healthSafety_recordable"/>Recordable cases</label></div>'],
						['<div class="col-md-6"><label for="healthSafety_recordable" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="checkbox" data-target="healthSafety_recordable_hiddenInput" name="healthSafety_recordable"/>First Aid Cases<i class="fa fa-question-circle text-secondary pointer" role="button" data-toggle="tooltip" data-original-title="Please see the detail tips." data-placement="right"></i></label></div>']
					],
					onPanelActived: activeFunc
				},
				{
					text: 'Health & Safety',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-12"><label class="form-check-label"><input type="radio" class="form-check-input" name="UI_History" value="all">Full User History<label></div>'],
						['<div class="col-md-12"><label class="form-check-label"><input type="radio" class="form-check-input" name="UI_History" value="all">Key Action History<label></div>']
					]
				}
			]
		},
		{
			text: 'NotMetux',
			id: '0',
			mutex: false,
			class: 'bg-primary',
			nodes: [
				{
					text: 'Health & Safety',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-12"><label class="form-check-label"><input type="radio" class="form-check-input" name="UI_History" value="all">Full User History<label></div>'],
						['<div class="col-md-12"><label class="form-check-label"><input type="radio" class="form-check-input" name="UI_History" value="all">Key Action History<label></div>']
					]
				}
			]
		}
]


function activeFunc(){
		$(function () {
				$('[data-toggle="tooltip"]').tooltip();
				$('.datepicker').flatpickr({ defaultDate: '01-01-' + (new Date()).getFullYear(), dateFormat: 'd-M-Y' });
		})   
}

module.exports = data;