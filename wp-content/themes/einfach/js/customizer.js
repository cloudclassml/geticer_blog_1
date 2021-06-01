/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $ ) {

	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	} );
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	// Body Text Color.
	wp.customize( 'body_text_color', function( value ) {
		value.bind( function( to ) {
			
			$('#body_text_color').remove();
			$('html').append(
				'<style id="body_text_color">' + 
					'body, button, input, select, optgroup, textarea { color:' + to + '  }' + 
					'.site-title a, .comment-respond, .cat-links a, thead, button, input[type="button"], input[type="reset"], input[type="submit"] { border-color:' + to + '  }' + 
					'.single h1.entry-title:after, .page h1.entry-title:after, hr { background:' + to + '  }' + 
				'</style>'
				);
				
		} );
	} );

	// Link Color.
	wp.customize( 'link_color', function( value ) {
		value.bind( function( to ) {
			
			$('#link_color').remove();
			$('html').append('<style id="link_color">a { color:' + to + '  }</style>');
			
		} );
	} );

	// Link Hover Color.
	wp.customize( 'hover_link_color', function( value ) {
		value.bind( function( to ) {
			
			$('#hover_link_color').remove();
			$('html').append(
				'<style id="hover_link_color">' + 
					'a:hover { color:' + to + '  }' + 
				'</style>'
				);
			
		} );
	} );
	

	// Html Font Size
	wp.customize( 'html_font_size', function( value ) {
		value.bind( function( to ) {
			
			$('#html_font_size').remove();
			$('html').append(
				'<style id="html_font_size">' +
					'@media screen and (min-width: 992px) {' + 
						'html { font-size:' + to + 'px  }' +
					'}' +
				'</style>'
				);
				
		} );
	} );
	
} )( jQuery );
