/* global jQuery, wp.customize */
/**
 * Customizer preview.
 */

( function( $, api ) {

	// Add listener for the "blogname" control.
	api( 'blogname', function( value ) {

		value.bind( function( to ) {
			$( '#site-header .uk-logo' ).text( to );
		} );

	} );

    // Add listener for the "site_background_color" control.
	api( 'site_background_color', function( value ) {

		value.bind( function( to ) {

			// Add background color to theme .
			$( 'body' ).css( 'background-color', to );

			$( '#primary-navigation .uk-offcanvas-bar' ).css( 'background-color', to );

			$( '.uk-modal .uk-modal-dialog').css( 'background-color', to );

			if ( '#ffffff' === to ) {
				$( '.comments-wrapper' ).css( 'background-color', '#fcfcfc' );
			} else {
				$( '.comments-wrapper' ).css( 'background-color', to );
			}

		} );

	} );

} )( jQuery, wp.customize );
