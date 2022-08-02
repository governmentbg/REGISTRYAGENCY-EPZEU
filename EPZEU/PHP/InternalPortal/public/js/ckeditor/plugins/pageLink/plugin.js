( function() {	
	CKEDITOR.plugins.add( 'pageLink',
    {
        requires: [ 'iframedialog' ],
        
        lang : [ 'bg' ],
        
        init: function( editor )
        {
			
			var path = window.location.pathname;
			
			var me = this;
			var iframe;
			var iframeWindow;
			var lang = editor.lang.pageLink;
			
			var pluginPath = me.path;
			var basePath = pluginPath.replace('js/ckeditor/plugins/pageLink/', '');

			CKEDITOR.dialog.add( 'pageLinkDialog', function ( editor )
           {
              return {
                 title : lang.pageLink.dialogTitle,
                 minWidth : 370,
                 minHeight : 80,
                 contents :
                       [
                          {
                             id : 'iframe',
                             label : lang.pageLink.dialogTitle,
                             expand : true,
                             elements :
                                   [
                                      {
                                         type : 'iframe',
                                         src : basePath + 'ck-page-link',
                                         width : '600px',
                                         height : '400px',
                                         onContentLoad : function() {
												iframe = document.getElementById(this._.frameId),
												iframeWindow = iframe.contentWindow;
												//iframeWindow.document.getElementById('fieldName').innerHTML = lang.pageLink.fieldName;
	                                        	//iframeWindow.document.getElementById('selectFieldName').innerHTML = lang.pageLink.selectFieldName;
                                         }
                                         
                                      }
                                   ]
                          }
                       ],
                 onOk : function()
                 {
                	 
                	 var selelect = iframeWindow.document.getElementById("pageLink");
                	 
                	 var pageUrl = selelect.value;
                 	 var pageTitle= selelect.options[selelect.selectedIndex].text;
                	
                 	 if ( pageUrl == 0 ) {
                		 	alert( lang.pageLink.errNoData ) ;
	         				return false ;
	         		}
                	
                	 editor.insertHtml('<a href="/'+pageUrl+'">'+pageTitle+'</a> ');
                 }
              };
           } );

            editor.addCommand( 'pageLink', new CKEDITOR.dialogCommand( 'pageLinkDialog' ) );

            editor.ui.addButton( 'PageLink',
            {
                label: lang.pageLink.buttonName,
                command: 'pageLink',
                icon: this.path + 'images/icon.png'
            } );
        }
    } );
} )();