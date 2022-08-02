/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.allowedContent = true;
	// config.skin = 'kama';
	config.height = 400;
	config.language = 'bg';
	config.enterMode = CKEDITOR.ENTER_BR;
	config.extraPlugins = 'activeField,pageLink';
	config.removePlugins = 'elementspath';
	config.toolbar = 'Main';
	
	/*
	config.toolbar_Full =
		[
			{ name: 'document', items : ['Save'] },
			{ name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
			{ name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
			{ name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 
		        'HiddenField' ] },

			{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
			{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
			'-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
			{ name: 'links', items : [ 'Link','Unlink','Anchor' ] },
			{ name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },

			{ name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
			{ name: 'colors', items : [ 'TextColor','BGColor' ] },
			{ name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About', 'PageLink', 'Source' ] }
		];
	*/

	config.toolbar_Main =
		[		
			['Bold', 'Italic', 'Underline', 'Strike'],
			['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Format'],		
			['PageLink', 'Link', 'Unlink', 'Anchor'],
			['Table', 'HorizontalRule'],
			['Paste', 'PasteText', 'PasteFromWord'],
			['Find', 'RemoveFormat', 'ShowBlocks'],
			['Undo', 'Redo'],
			['Source', 'Maximize']
		];
	
	config.toolbar_DeclarationTemplate =
		[			
			['Bold', 'Italic', 'Underline', 'Strike'],
			['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Format', 'ActiveField'],
			['Paste', 'PasteText', 'PasteFromWord'],
			['Find', 'RemoveFormat', 'ShowBlocks'],
			['Undo', 'Redo'],			
			['Source', 'Maximize']
		];
	
	config.toolbar_LabelDescription = 
		[		
			['Bold', 'Italic', 'Underline', 'Strike'],
			['NumberedList', 'BulletedList'],
			['Link', 'Unlink'],
			['Paste', 'PasteText', 'PasteFromWord'],
			['Undo', 'Redo'],
			['Source']
		];
	
	config.allowedContent = true;
    config.removeFormatAttributes = '';
};
