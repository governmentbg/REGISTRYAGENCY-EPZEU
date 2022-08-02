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
	 .done(function( msg ) {
		 
		 if (loaderContainer)
				$("#local-loader").remove();
		 
		 if (content) {
		 	$(content).html(msg);
		 }
	 });
}

/**
 * Ajax странициране
 * @param url
 * @param content
 */
/**
 * Ajax странициране
 * @param url
 * @param content
 */
function ajaxPaginate(url, content) {

	$(document).on('click', '.page-link', function(event){
		if (history.pushState) {
			event.preventDefault();
			
			var address = $(this).attr('href');
			var page = $(this).attr('data-page').trim();
			var urlWithoutGetParameters = url.split('?');
			
			ajaxRequest(urlWithoutGetParameters[0]+address, {page: page, getItemList: 1}, content);
			history.pushState(null, null, address);
		}
	})
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
	
	if (removeElements) {
		$.each(removeElements, function(key, value) {
			if( paramsObj[value] !== undefined ) {
				paramsObj[value] = null;
				delete paramsObj[value];
			}
		});
	}
		
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
 * Потвърждаване при изтриване
 * 
 * @param element
 * @param e
 */
function onDelete(element, message, e) {

	$('#modal-confirm .alert-warning').html(message);
	
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
 * Отваря страница за преглед
 * 
 * @param url
 * @param e
 */
function openPreview(url, e) {
	$.get( url, function( data ) {
		$("#modal-preview .modal-body").html(data);
	});
	$('#modal-preview').modal('show');
	e.preventDefault();
}

/**
 * Изчиства съдържанието на модален прозорец при затваряне
 */
$(document).on('hidden.bs.modal', '#modal-preview', function (e) {
	$("#modal-preview .modal-body").html('');
});

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
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" +domain+ ";path=/" + ";secure";
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

function showPasswordStrength() {
	$('<div class="progress progress--password active">'
			+' <div id="jak_pstrength" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>'
		+'</div>'
		).insertAfter("#password");

	$("#password").keyup(function() {
		passwordStrength(jQuery(this).val());
	});
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



// Show Navigation
function toggleNav() {

    $(".navbar-top-container-right").toggleClass('d-flex');
    $(".navbar-top-subnav").collapse('toggle');

};

function toggleSubnav() {			
    // $(".navbar-top-subnav").toggleClass("navbar-top-subnav--show");
    $(".navbar-top-subnav").collapse('toggle');
};

function p($var) {
	console.log($var);
}

function setCookiePrivacyAccept(domain) {         
	setCookie('cookiePrivacyAccept', 1, cookieExpiration, domain);
	$('#cookieInfo').addClass('d-none');
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
	
	var cookiePrivacyAccept = getCookie('cookiePrivacyAccept');
	
	if (cookiePrivacyAccept) {
		$('#cookieInfo').addClass('d-none');
	}
	else {
		$('#cookieInfo').removeClass('d-none');
	}
});


/**
 * Създава cookie при смяна на език
 * 
 * @param langCode
 * @param url
 * @param event
 */
function onChangeLanguage(langCode, url, domain, e) {
	
	e.preventDefault();
	
	setCookie('currentLang', langCode, cookieExpiration, domain);

	window.location.href = url;
	
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

		if (checkIdle >= idle) {
			deleteCookie('usr_active_timestamp', cookieDomain);
			window.location.href = url;
		}
		else
			timer = setTimeout(loguot, checkIdle);
    }
    
    function countSeconds() {
    	i++;
    }
    
    setTimeout(countSeconds, throttle);

    function resetTimer() {
    	
    	clearTimeout(loguot);
    	
    	if (i > 0) {
    		i = 0;
    		setCookie('usr_active_timestamp', Date.now().toString(), '', cookieDomain);
    		setTimeout(countSeconds, throttle);
    	}
		clearTimeout(timer);
		timer = setTimeout(loguot, idle);  // time is in milliseconds 
    }
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
});

function previewApplication(url, applicationNumber, registerId) {

	var data ={"applicationNumber" : applicationNumber, "registerId" : registerId};
	
	var newWindow = window.open('', '_blank');
	
	$.ajax({
		method: "POST",
		url: url,
		data: data,
		async: true
	})
	.done(function(msg) {

		var obj = jQuery.parseJSON(JSON.stringify(msg));

		if (obj.hasOwnProperty('status')) {

			switch(obj.status) {
				case 'success':
	
					newWindow.location.replace(obj.urlToRedirect);
					newWindow.focus();

					break;

				case 'error':
					
					newWindow.close();
					
					return false;
					break;
			}
		}
	});
}


/**
 * Отваря контекстен хелп на базата на текущ URL адрес.
 * 
 * @param string key 
 */
function openWebHelp(key) {
	
	webHelpWindow = window.open('', '_blank');
	
	$.getJSON("/js/webHelpCnf.json?v=3", function(helpConfig) {

		var uri = window.location.pathname;
		
		webHelpKey = typeof key !== 'undefined' ? key : uri;

		key = null;

		jQuery.each(helpConfig, function(i, obj) {

			var regEx = new RegExp(obj.pattern, "i");
		
			if (matches = regEx.exec(webHelpKey)) {

				matches.shift();
				
				var ii = 1;
				
				key = obj.key;

				matches.forEach(function(elment) {
					key = key.replace("$"+ii, elment);
					ii++;
				});

				return false;
			}
		});

		webHelpUrl = window.location.origin+'/help/index.html';
		
		if (key) {
			key = key.replace(/-|\//g, '_');
			key = key.replace(/^_|_$/, '');
			webHelpUrl = webHelpUrl+'?id='+key;
		}

		webHelpUrl = webHelpUrl.toLowerCase(); 
		webHelpWindow.location.replace(webHelpUrl);
		webHelpWindow.focus();
	
	});
};



