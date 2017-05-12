var basicData = [
		{
			text: 'Education',
			id: '0',
			mutex: 'group1',
			class: 'bg-primary',
			nodes: [
				{
					text: 'Primary',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-12"><label for="TeacherLevel" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="checkbox" data-target="TeacherLevel" name="TeacherLevel"/>Teacher certification level 4</label></div>'],
						['<div class="col-md-12"><label for="LanguageLevel" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="checkbox" data-target="LanguageLevel" name="LanguageLevel"/>Language Skills Level</label></div>']
					]
				},
				{
					text: 'Junior high',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-12"><label for="TeacherLevel" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="radio" data-target="TeacherLevel" name="EntryLevelTest"/>Entry level test 1</label></div>'],
						['<div class="col-md-12"><label for="LanguageLevel" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="radio" data-target="LanguageLevel" name="EntryLevelTest"/>Entry level test 2</label></div>']
					]
				},
				{
					text: 'Senior high',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-6">Testing content</div>'],
						['<div class="col-md-6">Testing content</div>']
					]
				},
				{
					text: 'College',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-6">Testing content</div>'],
						['<div class="col-md-6">Testing content</div>']
					]
				}
			]
		},
		{
			text: 'Medical',
			id: '0',
			mutex: 'group1',
			class: 'bg-primary',
			nodes: [
				{
					text: 'Surgical equipment',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-6"><label for="healthSafety_recordable" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="checkbox" data-target="healthSafety_recordable_hiddenInput" name="healthSafety_recordable"/>Recordable cases</label></div>'],
						['<div class="col-md-6"><label for="healthSafety_recordable" class="form-check-label"><input class="eventHandler form-check-input mr-2" type="checkbox" data-target="healthSafety_recordable_hiddenInput" name="healthSafety_recordable"/>First Aid Cases<i class="fa fa-question-circle text-secondary pointer" role="button" data-toggle="tooltip" data-original-title="Please see the detail tips." data-placement="right"></i></label></div>']
					]
				},
				{
					text: 'Medical training',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-6">Testing content</div>'],
						['<div class="col-md-6">Testing content</div>']
					]
				}
			]
		},
		{
			text: 'Environment',
			id: '0',
			mutex: 'group1',
			class: 'bg-primary',
			nodes: [
				{
					text: 'Garbage collection',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-6">Testing content</div>'],
						['<div class="col-md-6">Testing content</div>']
					]
				},
				{
					text: 'Plant trees',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-6">Testing content</div>'],
						['<div class="col-md-6">Testing content</div>']
					]
				}
			]
		},
		{
			text: 'Others',
			id: '0',
			mutex: false,
			class: 'bg-primary',
			nodes: [
				{
					text: 'Television entertainment',
					id: '1',
					class: 'bg-primary',
					content:[
						['<div class="col-md-6">Television entertainment</div>'],
						['<div class="col-md-6">Public welfare</div>']
					]
				}
			]
		}
]

module.exports = basicData;