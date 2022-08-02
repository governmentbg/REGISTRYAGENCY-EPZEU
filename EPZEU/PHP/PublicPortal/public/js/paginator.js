function pagination(paginatorClass, content, totalPages) {
	
	$(paginatorClass).twbsPagination({
		totalPages: totalPages,
	    pageVariable: 'page',
	    visiblePages: 5,
	    href: true,
	    initiateStartPageClick: false,
	    
	    onPageClick: function (evt, href) {
	    	
	    	var url = $(this).find('[data-page="'+href+'"]').attr('href');

	    	if (url) {
		    	var queryParams = createQuery({page: href});
				var urlWithoutGetParameters = url.split('?');
				// var closestElement = $(this).closest('#content');
				var closestElement = '#content';
				ajaxRequest(urlWithoutGetParameters[0]+queryParams, {page: href, getItemList: 1}, content, closestElement);
				history.pushState(null, null, queryParams);
	    	}
			
	    }
	
	});
}