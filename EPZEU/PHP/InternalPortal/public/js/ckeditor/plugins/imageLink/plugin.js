(function() {
	CKEDITOR.plugins.add('imageLink',
	{
		requires : [ 'iframedialog' ],

		lang : [ 'en', 'bg' ],

		init : function(editor) {
			
			var me = this;			
			var iframe;
			var iframeWindow;
			var lang = editor.lang.imageLink;
			var pluginPath = me.path;
	        var basePath = pluginPath.replace('js/ckeditor/plugins/imageLink/', '');

			CKEDITOR.dialog
					.add(
							'imageLinkDialog',
							function(editor) {
								return {
									title : lang.imageLink.dialogTitle,
									minWidth : 600,
									minHeight : 550,
									contents : [ {
										id : 'iframe',
										label : lang.imageLink.dialogTitle,
										expand : true,
										elements : [ {
											type : 'iframe',
											src : basePath+'admin/ck-image-select-popup',
											width : '600px',
											height : '550px',
											onContentLoad : function() {
													iframe = document.getElementById(this._.frameId),
													iframeWindow = iframe.contentWindow;
											}
										} ]
									} ],
									onOk : function() {
										
										var selectedGuid = iframeWindow.document.getElementById('imageLink').value;
										
										var imageSize = iframeWindow.document.getElementsByName('imageType');
										
										var imageSizeValue = '';
										
										for(var i = 0; i < imageSize.length; i++){
										    if(imageSize[i].checked){
										    	imageSizeValue = imageSize[i].value;
										    }
										}
								
										if (selectedGuid.length == 0) {
											alert(lang.imageLink.errNoData);
											return false;
										}
										
										imgSrc = 'load-image/' + selectedGuid;
										
										if (imageSizeValue.length != 0) {
											imgSrc = imgSrc + '/' + imageSizeValue;
										}
										
										var image = '<img src="' + imgSrc + '" alt="">';
									
										editor.insertHtml(image);
									}
								};
							});

			editor.addCommand('imageLink',
					new CKEDITOR.dialogCommand(
							'imageLinkDialog'));

			editor.ui.addButton('ImageLink', {
				label : lang.imageLink.buttonName,
				command : 'imageLink',
				icon : this.path + 'images/icon.gif'
			});
		}
	});
})();