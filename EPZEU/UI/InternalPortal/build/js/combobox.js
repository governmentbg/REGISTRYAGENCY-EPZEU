(function($) {
  $.widget( "custom.combobox", {
    _create: function() {
      this.wrapper = $( "<div>" )
        .addClass( "input-group custom-combobox" )
        .insertAfter( this.element );

      
      this.btn = $("<button>");  

      this.element.hide();
      this._createAutocomplete();

      this.buttonWrapper = $( "<div>" )
        .addClass( "input-group-append" )        
        .appendTo( this.wrapper );

      this._createShowAllButton();

      this.aIcon = $( "<i>" )
        .addClass( "ui-icon ui-icon-chevron-down-alt" )
        .appendTo( this.btn );

      // MODIFICATION - bind to the input's focus
      this.input.focus(function(event) {
    	  $(this).select();
      });     
    },

    _createAutocomplete: function() {
      var selected = this.element.children( ":selected" ),
        value = selected.val() ? selected.text() : "Избери";

      this.input = $( "<input>" )
        .appendTo( this.wrapper )
        .val( value )
        .attr( "title", "" )
        .addClass( "custom-combobox-input form-control"+(this.element.hasClass( "input-error" ) ? " input-error" : ""))
        .autocomplete({          
          delay: 0,
          minLength: 0,
          source: $.proxy( this, "_source" )
        });
        // .tooltip({
        //   classes: {
        //     "ui-tooltip": "ui-state-highlight"
        //   }
        // });

      this.input.autocomplete( "widget" )
        .removeClass( "ui-widget ui-widget-content ui-front ui-menu")
        .addClass( "dropdown-menu")
        ;

      this._on( this.input, {
        autocompleteselect: function( event, ui ) {
          ui.item.option.selected = true;
          this._trigger( "select", event, {
            item: ui.item.option
          });
        },

        autocompletechange: "_removeIfInvalid"
      });
    },

    _createShowAllButton: function() {
      var input = this.input,
        wasOpen = false;

      this.btn
        // .attr( "tabIndex", -1 )
        //.attr( "title", "Show All Items" )
        .attr( "type", "button" )
        // .tooltip()
        .appendTo( this.buttonWrapper )
        // .button({
        //   icons: {
        //     primary: "ui-icon-triangle-1-s"
        //   },
        //   text: false
        // })
        .removeClass( "ui-corner-all" )
        .addClass( "custom-combobox-toggle btn btn-secondary" )
        .on( "mousedown", function() {
          wasOpen = input.autocomplete( "widget" ).is( ":visible" );
        })
        .on( "click", function() {
          input.trigger( "focus" );          
          // Close if already visible
          if ( wasOpen ) {
            return;
          }

          // Pass empty string as value to search for, displaying all results
          input.autocomplete( "search", "" );
        });
    },

    _source: function( request, response ) {
      var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
      response( this.element.children( "option" ).map(function() {
        var text = $( this ).text();
        if ( this.value && ( !request.term || matcher.test(text) ) )
          return {
            label: text,
            value: text,
            option: this
          };
      }) );
    },

    _removeIfInvalid: function( event, ui ) {

      // Selected an item, nothing to do
      if ( ui.item ) {
        return;
      }

      // Search for a match (case-insensitive)
      var value = this.input.val(),
        valueLowerCase = value.toLowerCase(),
        valid = false;
      this.element.children( "option" ).each(function() {
        if ( $( this ).text().toLowerCase() === valueLowerCase ) {
          this.selected = valid = true;
          return false;
        }
      });

      // Found a match, nothing to do
      if ( valid ) {
        return;
      }

      // Remove invalid value
      this.input
        .val( "" )
        .attr( "title", value + " didn't match any item" )
        .tooltip( "open" );
      this.element.val( "" );
      this._delay(function() {
        this.input.tooltip( "close" ).attr( "title", "" );
      }, 2500 );
      this.input.autocomplete( "instance" ).term = "";
    },

    _destroy: function() {
      this.wrapper.remove();
      this.element.show();
    }
  });
})(jQuery);