cookieExpiration = 365*5;

/**
 * Ajax заявка 
 * @param url
 * @param data
 * @param content
 */
function ajaxRequest(url, data, content, loaderContainer) {
	
	content = typeof content !== 'undefined' ? content : false;
	data = typeof data !== 'undefined' ? data : false;
	
	loaderContainer = typeof data !== 'undefined' ? loaderContainer : false;
	
	if (loaderContainer) {
		var loader = showLoader();
		$(loaderContainer).append(loader);
		$("#local-loader").show();
	}
	
	$.ajax({
	  method: "POST",
	  url: url,
	  data: data,
	  async: true
	})
	 .done(function(msg) {
		 
		 if (content) {
		 	
			 var obj = jQuery.parseJSON(JSON.stringify(msg));
			 
			 if (obj.hasOwnProperty('status') && (obj.hasOwnProperty('message') || obj.hasOwnProperty('errors'))) {
				 
				 switch(obj.status) {
				    case 'success':
				    	var message = createAlertBox('success', obj.message);
				    	 $(content).html(message);
				        break;
				    case 'error':
				    	var message = createAlertBox('danger', obj.message);
				    	$(content).html(message);
				        break;
				    case 'error-td':
				    	for (var i = 0; i < obj.errors.length; i++) {
				    		
				    		var key = Object.keys(obj.errors[i])[0];
				    		var message = createErrorMessage(obj.errors[i][key]);
				    		
				    		$('#'+key+' .invalid-feedback').remove();
				    		$('#'+key).append(message);
				    	}
				    	
				    	$("."+obj.editBtnClass).click();
				    					    	
				    	break;
				    
				    default:
				    	$(content).html(msg);
				}
			 }
			 
			 // Странициране
			 else if (!obj.hasOwnProperty('status')) {
				 
				$(content).html(msg);
			 }
		 }
		 
		 if (loaderContainer) {
				$("#local-loader").remove();
				$(content).trigger("change");
		 }
		 return msg;
	 });
}

/**
 * Създава елемент за съобщение
 * @param alertClass
 * @param message
 * @returns {String}
 */
function createAlertBox(alertClass, message) {
	
	var alertBox = 	'<div class="alert alert-'+alertClass+'" role="alert">'
						+ message
					+ '</div>';
	
	return alertBox;
}

/**
 * Създава съобщение за грешка под поле
 * @param message
 * @returns {String}
 */
function createErrorMessage(message) {
	var errorBox = '<div class="invalid-feedback">'+message+'</div>';
	return errorBox;
}


/**
 * Зарежда икона за Loading
 */
function showLoader() {
	
	var loader = '<div id="local-loader" class="local-load-overlay">'
					+ '<div class="local-loader">'
					+ '<i class="ui-icon ui-icon-loading ui-icon-spin"></i>'
					+ '<span class="sr-only"></span>'
					+ '</div>'
				+ '</div>';
	
	return loader;
	
}

function p($var) {
	console.log($var);
}

/**
 * Генерира стринг за GET параметри
 * 
 * @param addElements
 * @param removeElements
 */
function createQuery(addElements, removeElements) {
	
	addElements = typeof addElements !== 'undefined' ? addElements : false;
	removeElements = typeof removeElements !== 'undefined' ? removeElements : false;
	
	var getParams = window.location.search.substring(1);
	var sURLVariables = getParams.split('&');
	var paramsObj = {};
	
	for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == "")
        	continue;
        
        paramsObj[sParameterName[0]] = sParameterName[1];
    }
	
	if (addElements)
		jQuery.extend(paramsObj, addElements);

	return '?'+decodeURIComponent($.param(paramsObj));
}

/**
 * Взима GET параметър
 * @param paramName
 * @param defaultParam
 * @returns
 */
function getParam(paramName, defaultParam) {
	
	defaultParam = typeof defaultParam !== 'undefined' ? defaultParam : false;
	
	var getParams = window.location.search.substring(1);
	var sURLVariables = getParams.split('&');
	var paramsObj = {};
	
	for (i = 0; i < sURLVariables.length; i++) {
		
		sParameterName = sURLVariables[i].split('=');
		
		if (sParameterName[0] == paramName) {
        	return sParameterName[1];
        	break;
		}
    }
	
	return defaultParam;
}

/**
 * Отваря модален прозорец за потвърждение
 * 
 * @param element
 * @param e
 */
function openModalConfirm(element, message, e) {
	
	if ($('#modal-confirm .modal-body').has('div').length) {
		$('#modal-confirm .modal-body div').html(message);
	}
	else {
		$('#modal-confirm .modal-body').html(message);
	}
	
	$('#modal-confirm').modal('show');
	
	$('#confirm-bnt').on('click', function(){
		$(element).attr('onclick','').unbind('click');
		element.click();
		showGlobalLoader();
		return true;
	});
	
	e.preventDefault();
}

/**
 * Отваря модален прозорец за съобщение
 * 
 * @param element
 * @param e
 */
function openModalAlert(message, e) {
	
	if ($('#modal-alert .modal-body').has('div').length) {
		$('#modal-alert .modal-body div').html(message);
	}
	else {
		$('#modal-alert .modal-body').html(message);
	}
	
	$('#modal-alert').modal('show');
	
	e.preventDefault();
}


/**
 * Отваря страница за преглед
 * 
 * @param url
 * @param e
 */
function openPreview(url, e, iframe, title) {
	
	url = typeof url !== 'undefined' ? url : false;
	iframe = typeof iframe !== 'undefined' ? iframe : false;
	title = typeof title !== 'undefined' ? title : false;

	if (title) {
		$('#modal-title').html(title);
	}
	
	$('#modal-preview').modal('show');
	
	if (url) {
		$.get( url, function( data ) {
			$("#modal-preview .modal-body").html(data);
		});
	}
	else if (iframe) {		
		$("#modal-preview .modal-body").html('<iframe id="iframe_content" scrolling="no" src="'+iframe+'" style="width:100%;" frameborder="0"></iframe>');
	}	
	
	e.preventDefault();
}

/**
 * Отваря страница за преглед
 * 
 * @param url
 * @param e
 */
function openPreviewWithParams(paramObj, e) {

	if (paramObj.hasOwnProperty('title'))
		$('#modal-title').html(paramObj.title);
	
	$('#modal-preview').modal('show');
	
	if (paramObj.hasOwnProperty('urlType') && paramObj.urlType == 'iframe') {
		$("#modal-preview .modal-body").html('<iframe id="iframe_content" scrolling="no" src="'+paramObj.url+'" style="width:100%;" frameborder="0"></iframe>');
	}
	else if (iframe) {
		$.get(paramObj.url, function(data) {
			$("#modal-preview .modal-body").html(data);
		});
	}
	
	
	
	if (paramObj.hasOwnProperty('buttons')) {
		$("#modal-preview .button-bar").html('');
		
		
		if (paramObj.buttons.hasOwnProperty('close')) {
			var closeBtn = '<button type="button" class="btn btn-secondary close-preview-modal" data-dismiss="modal">'+paramObj.buttons.close+'</button>';	
			$("#modal-preview .button-bar").append(closeBtn);
		}
		
		if (paramObj.buttons.hasOwnProperty('confirm')) {
			
			var confirmId = 'confirmBnt'
				
			if (paramObj.buttons.hasOwnProperty('confirmId'))
				confirmId = paramObj.buttons.confirmId;
			
			var confirmBtn = '<button type="button" id="'+confirmId+'" class="btn btn-primary close-preview-modal btn-confirm" data-dismiss="modal">'+paramObj.buttons.confirm+'</button>';	
			
			$("#modal-preview .button-bar").append(confirmBtn);
		}
	}
	
	if (paramObj.hasOwnProperty('size')) {
		$("#modal-preview > .modal-dialog").removeClass("modal-sm modal-md modal-lg");
		$("#modal-preview > .modal-dialog").addClass(paramObj.size);
	}
	
	e.preventDefault();
}

/**
 * Отваря popup за ъплоуд на файл
 * 
 * @param url
 * @param e
 */
function openUploadForm(url, e) {

	$("#modal-upload-files .modal-body").html('');

	$('#modal-upload-files').modal('show');
	
	$("#modal-upload-files .modal-body").html('<iframe id="iframe_content" scrolling="no" src="'+url+'" style="width:100%;" frameborder="0"></iframe>');
		
	e.preventDefault();
}

/**  
 * Изчиства съдържанието на модален прозорец при затваряне
 */
$(document).on('hidden.bs.modal', '#modal-preview', function (e) {
	$("#modal-preview .modal-body").html('');
});

/**
 * Оразмерява модален прозорец, спрямо съдържанието на iframe в него
 */
function resizeIframe(iframeID, i) {
	
	i = typeof i !== 'undefined' ? i : 1;
	
	if (i >=5) 
		return false;
	
	var iframe = window.parent.document.getElementById(iframeID);
	iframe.style.height = '';
	iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
	
	if (!iframe.contentWindow.document.body.scrollHeight) {
		setTimeout(function(){
			i++;
			resizeIframe(iframeID, i);
		}, 100);
	}
}


/**
 * Добавя бисквитка
 * 
 * @param cname
 * @param cvalue
 * @param exdays
 */
function setCookie(cname, cvalue, exdays, domain) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = exdays ? "expires="+d.toUTCString() : exdays;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" +domain+ ";path=/";
}

/**
 * Изтрива бисквитка
 * 
 * @param name
 */
function deleteCookie(cname, domain) {
	var d = new Date();
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=ww;" + expires + ";domain=" +domain+ ";path=/";
}

/**
 * Взима бисквитка
 * 
 * @param cname
 * @returns {String}
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


$(document).ready(function () {

	if (window.self !== window.top) {
		
		resizeIframe('iframe_content');
		
		$('#collapsable-content').on('hidden.bs.collapse shown.bs.collapse', function(){
			resizeIframe('iframe_content');
		});
		
		$("#content, #files").on('change', function(e){
		
		 	if (e.target.type === "radio" || e.target.type === "checkbox") {
		        return;
		 	}
		 	
			resizeIframe('iframe_content');
		});
	}
	else {
		// Управление на основно меню
		$('.navbar-minimalize').on('click', function () {
	
			if ($('#main-wrapper').hasClass('mini-navbar-left')) {
				setCookie('menu-state', 'expand', 365, '');
			}
			else {
				$('#main-wrapper ul').removeClass('show');
				$('#main-wrapper ul i').removeClass('rotate-90');
	
				setCookie('menu-state', 'collapse', 365, '');
			}
	
			$("#main-wrapper").toggleClass("mini-navbar-left"); 
		});
		
		$(document).on('click', function(e){

			if(!$(e.target).is('#navbar-left, #navbar-left .menu-text')) {
				if ($('#main-wrapper').hasClass('mini-navbar-left')) {
					$('#main-wrapper ul').collapse('hide');
					$('#main-wrapper ul li a').removeClass('selected');
				}
			}
		});
		
	 
		$("#navbar-left a").click(function(e) {
			
			if (!$(this).find('i').hasClass('rotate-90'))
				$("#navbar-left i").removeClass('rotate-90');
			
			$(this).find('i').toggleClass('rotate-90');
			$(this).closest('li').find('>ul').collapse('toggle');
			$(this).closest('ul').find('li ul.collapse').collapse('hide');
			$(this).closest('ul').find('li a').removeClass("selected");
			$(this).addClass("selected");
	
			//e.preventDefault();
		});
	}
});

// Избор на файл
$(document).on('change', 'input:file', function () {
    var inputId = this.id;
    var filename = $(this).val().split('\\').pop();
    $("label[for='" + inputId + "'] .fileName").html(filename);
});

/**
 * Визуализира сигурност на паролата
 * 
 * @param password
 */
function passwordStrength(password) {

	var desc = [{'width':'5px'}, {'width':'20%'}, {'width':'40%'}, {'width':'60%'}, {'width':'80%'}, {'width':'100%'}];
	
	var descClass = ['', 'bg-danger', 'bg-danger', 'bg-warning', 'bg-success', 'bg-success'];

	var score = 0;


	//if password bigger than 6 give 1 point
	if (password.length > 6) score++;

	//if password has both lower and uppercase characters give 1 point	
	if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) score++;

	//if password has at least one number give 1 point
	if (password.match(/\d+/)) score++;

	//if password has at least one special caracther give 1 point
	if ( password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) )	score++;

	//if password bigger than 12 give another 1 point
	if (password.length > 10) score++;
	
	// display indicator
	$("#jak_pstrength").removeClass(descClass[score-1]).addClass(descClass[score]).css(desc[score]);
}

function closeModal() {
	$('#modal-preview, #modal-upload-files').modal('hide');
}

/**
 * Зарежда екран за изчакване на цял прозорец
 */
function showGlobalLoader() {
	var loader = '<div id="loader" class="load-overlay">'
		+ '<div class="loader">'
		+ '<i class="ui-icon ui-icon-loading ui-icon-spin"></i>'
		+ '<span class="sr-only"></span>'
		+ '</div>'
	+ '</div>';
	
	$('body').append(loader);
	$("#loader").show();
}

/**
 * Затваря екран за изчакване
 */
function closeGlobalLoader() {
	$("#loader").remove();
}




/**
 * Допълва с водещи нули в началото на стринг
 * 
 * @param str
 * @param max
 * @returns
 */
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function rightPad (str, max) {
	str = str.toString();
	return str.length < max ? pad(str+"0", max) : str;
}

/**
 * Изчиства тагове
 *  
 *  @param elementId
 */
function stripTags(elementId) {
	//Обновява стойността в input или textarea полето
	$("#edit-row-"+elementId).find('input:visible, textarea:visible:not(".cke_source")', this).each(function(index, elem) {
		var newValue = $(elem).val().replace(/(<([^>]+)>)/g,"");
		$(elem).val(newValue);
	})
}

/**
 * Променя максималната дължина на textarea, в случай, че има нови редове
 */
var maxLengthTextarea = 0;
$(document).on('change', 'textarea:visible', function(){
	if (maxLengthTextarea == 0)
		maxLengthTextarea = parseInt($(this).attr('maxlength'));
	
	if (maxLengthTextarea != 0 && typeof maxLengthTextarea !== 'undefined' && !isNaN(maxLengthTextarea)) {
		var text = $(this).val();
		var numberOfLineBreaks = parseInt((text.match(/\n/g)||[]).length);

		if (numberOfLineBreaks != 0) 
			$(this).attr("maxlength",(maxLengthTextarea-numberOfLineBreaks));	
	} 
});

/**
 * Изчиства <br> тагове
 * @param str
 * @returns
 */
function br2nl(str) {
	if (str)
		return str.replace(/<br\s*\/?>/g, "\r");
	
	return '';
}

/**
 * Добавя <br> таг за нов ред
 * @param str
 * @returns
 */
function nl2br(str) {
	return str.replace(/\n/g, '<br />');
}

/**
 * Изход от системата при неактивност на потребител
 */
function idleLogout(idle, url, cookieDomain) {

	var currentTimeStamp = Date.now().toString();
	var lastActivity = getCookie('usr_active_timestamp');
	
	idle = idle*1000;
	
	if (lastActivity) {
		
		checkIdle = (currentTimeStamp - lastActivity);

		if (checkIdle >= idle) {
			showGlobalLoader();
			deleteCookie('usr_active_timestamp', cookieDomain);
			window.location.href = url;
		}
	}
	else
		setCookie('usr_active_timestamp', Date.now().toString(), '', cookieDomain);
	
	
	var timer;
	
	throttle = 5000;
	
    resetTimer();
    
    var i = 0;
    
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;
    window.ontouchstart = resetTimer;
    window.onclick = resetTimer;
    window.onkeypress = resetTimer;   
    window.addEventListener('scroll', resetTimer, true);

    function loguot() {
   	
    	var currentTimeStamp = Date.now().toString();
		var lastActivity = getCookie('usr_active_timestamp');
    	
		if (!lastActivity) {
			setCookie('usr_active_timestamp', Date.now().toString(), '', cookieDomain);
			return '';
		}
		
		checkIdle = (currentTimeStamp - lastActivity);
		
		if (checkIdle >= idle)
			window.location.href = url;
		else
			timer = setTimeout(loguot, checkIdle);
    }
    
    function countSeconds() {
    	i++;
    }
    
    setTimeout(countSeconds, throttle);

    function resetTimer() {
	
    	if (i > 0) {
    		i = 0;
    		setCookie('usr_active_timestamp', Date.now().toString(), '', cookieDomain);
    		setTimeout(countSeconds, throttle);
    	}
		clearTimeout(timer);
		timer = setTimeout(loguot, idle);  // time is in milliseconds 
    }
}

function setFontSize(arg, domain) {            

	var doc = document.getElementsByTagName ("html")[0];
	var fontSize = getCookie('fontSize');
	
	if (!fontSize)
		fontSize = 16;
    
    switch(arg) {
        case -1:
        	if (fontSize >= 12)
        		fontSize--;
        break;
        case 1:
        	if (fontSize <= 20)
        		fontSize++
        break;
        default:
        	fontSize = 16;
    } 

    setCookie('fontSize', fontSize, cookieExpiration, domain);
    doc.style.fontSize = fontSize+'px';
}

$(document).ready(function(){
	
	var fontSize = getCookie('fontSize');
	
	if (fontSize) {
		var doc = document.getElementsByTagName ("html")[0];
		doc.style.fontSize = fontSize+'px';
	}
});
