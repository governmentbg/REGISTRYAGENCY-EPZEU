function pagination(paginatorClass, content, totalPages, closestElement) {

	closestElement = typeof closestElement !== 'undefined' ? closestElement : false;
	
	$(paginatorClass).twbsPagination({
		totalPages: totalPages,
	    pageVariable: 'page',
	    visiblePages: 10,
	    href: true,
	    initiateStartPageClick: false,
	    
	    onPageClick: function (evt, href) {

	    	var url = $(this).find('[data-page="'+href+'"]').attr('href');
	    	
	    	if (url) {
		    	var queryParams = createQuery({page: href});
				var urlWithoutGetParameters = url.split('?');
				closestElement = closestElement ? closestElement : $(this).closest('.card');
				ajaxRequest(urlWithoutGetParameters[0]+queryParams, {page: href, getItemList: 1}, content, closestElement);
				history.pushState(null, null, queryParams);
				
				$(this).closest( ".card" ).find('.alert').hide();
	    	}
	    }
	});
}