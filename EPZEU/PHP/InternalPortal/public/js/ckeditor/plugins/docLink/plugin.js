
( function() {	
	CKEDITOR.plugins.add( 'docLink',
    {
        requires: 'iframedialog',
        lang : [ 'en', 'bg' ],
        
        init: function( editor )
        {
           var me = this;
           var iframe;
           var iframeWindow;
           var lang = editor.lang.docLink;
           var pluginPath = me.path;
           var basePath = pluginPath.replace('js/ckeditor/plugins/docLink/', '');
           
         CKEDITOR.dialog.add( 'docLinkDialog', function ( editor )
           {
              return {
                 title : lang.docLink.dialogTitle,
                 minWidth : 500,
                 minHeight : 400,
                 contents :
                       [
                          {
                             id : 'iframe',
                             label : lang.docLink.dialogTitle,
                             expand : true,
                             elements :
                                   [
                                      {
                                         type : 'iframe',
                                         src : basePath + 'admin/ck-editor-select-document',
                                         width : '550px',
										 height : '500px',
                                         onContentLoad : function() {
                                      	                                        	 
                                        	 iframe = document.getElementById( this._.frameId ),
                                             iframeWindow = iframe.contentWindow;
                                         }
                                      }
                                   ]
                          }
                       ],
                 onOk : function()
                 {
                	
                	 var htmlContent = iframeWindow.document.getElementById('docLink').innerHTML;
                	 
                	 console.log(htmlContent);
                	 
                	 var selectedText = editor.getSelection().getSelectedText();
               	 
                	 if ( htmlContent.length == 0 ) {
	         			alert( lang.docLink.errNoData ) ;
	         			return false ;
	         		}

                	var selection = editor.getSelection();
                	 
                	/*
            	    if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
            	    	
            	    	var selectedContent = selection.getSelectedElement();
            	    	
            	    	var imageSrc = selection.getSelectedElement().$.currentSrc;
            	    	
            	    	var attributes = selection.getSelectedElement().$.attributes;
            	    	
            	    	var elementAttr = '';
            	    	
            	    	$.each(attributes, function(k, v) {
	                   		 elementAttr = elementAttr + ' '+ (v.name + ' = "' + v.nodeValue + '"');
            	    	});
                   	 
            	    	var htmlContent = htmlContent.replace(/(<a[^<>]+>)(.[^<>]+?)(<\/a>)/gi,'\$1<img '+elementAttr+'/>\$3');
            	    } 
            	    
            	    else if (selection.getType() == CKEDITOR.SELECTION_TEXT) {
            	    	
            	    	var selectedText = editor.getSelection().getSelectedText();
            	    	
            	    	if (selectedText.length != 0) {
            	    		var htmlContent = (htmlContent.replace(/(<a[^<>]+>)(.*)(<\/a>)/gi, '\$1' + selectedText + '\$3'));
            	    	}
            	      }
            	      */
                	 
                	 editor.config.allowedContent = true;
                	 editor.insertHtml(htmlContent+' ');
                	                 	 
                 }
              };
           } );

            editor.addCommand( 'docLink', new CKEDITOR.dialogCommand( 'docLinkDialog' ) );

            editor.ui.addButton( 'DocLink',
            {
                label: lang.docLink.buttonName,
                command: 'docLink',
                icon: this.path + 'icons/doclink.gif'
            } );
        }
    } );
} )();

