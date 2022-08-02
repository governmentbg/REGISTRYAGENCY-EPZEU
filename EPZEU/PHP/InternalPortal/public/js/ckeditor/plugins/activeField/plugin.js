( function() {	
	CKEDITOR.plugins.add( 'activeField',
    {
        requires: [ 'iframedialog' ],
        
        lang : [ 'en', 'bg' ],
        
        init: function( editor )
        {
			
			var path = window.location.pathname;
			
			var me = this;
			var iframe;
			var iframeWindow;
			var lang = editor.lang.activeField;
			
			var pluginPath = me.path;
			var basePath = pluginPath.replace('js/ckeditor/plugins/activeField/', '');
			
           CKEDITOR.dialog.add( 'activeFieldDialog', function ( editor )
           {
              return {
                 title : lang.activeField.dialogTitle,
                 minWidth : 370,
                 minHeight : 80,
                 contents :
                       [
                          {
                             id : 'iframe',
                             label : lang.activeField.dialogTitle,
                             expand : true,
                             elements :
                                   [
                                      {
                                         type : 'iframe',
                                         src : basePath + 'get-active-fields',
                                         width : '370px',
                                         height : '80px',
                                         onContentLoad : function() {
												iframe = document.getElementById(this._.frameId),
												iframeWindow = iframe.contentWindow;
												iframeWindow.document.getElementById('fieldName').innerHTML = lang.activeField.fieldName;
	                                        	iframeWindow.document.getElementById('selectFieldName').innerHTML = lang.activeField.selectFieldName;
                                         }
                                         
                                      }
                                   ]
                          }
                       ],
                 onOk : function()
                 {
                	 var htmlContent = iframeWindow.document.getElementById('txtName').value;
                	
                 	 if ( htmlContent == 0 ) {
                		 	alert( lang.activeField.errNoData ) ;
	         				return false ;
	         		}
                	
                	 editor.insertHtml('{'+htmlContent+'}');
                 }
              };
           } );

            editor.addCommand( 'activeField', new CKEDITOR.dialogCommand( 'activeFieldDialog' ) );

            editor.ui.addButton( 'ActiveField',
            {
                label: lang.activeField.buttonName,
                command: 'activeField',
                icon: this.path + 'images/icon.png'
            } );
        }
    } );
} )();