/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

(function( $ ) {

    /**
     * Has Header Image
     *
     * Detect whether a header image is available.
     *
     * @since 1.0.0
     */
	function hasHeaderImage() {
		var image = wp.customize( 'header_image' )();
		return '' !== image && 'remove-header' !== image;
	}
    
    // Site Title
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '#componentz-header #componentz-logo h2 a' ).text( to );
		} );
	} );
    
    // Site Description (Tagline)
    wp.customize( 'blogdescription', function( value ) {
        value.bind( function( to ) {
            $( '#componentz-header .page-header .page-title.tagline').text( to );
        } );
    } );
    
    // Header Background Style
    wp.customize( 'componentz_header_background', function( value ) {
        value.bind( function( header_background ) {
            
            var header_image = wp.customize.get().header_image;
            var color_left   = wp.customize.get().componentz_header_color_left;
            var color_right  = wp.customize.get().componentz_header_color_right;
            
            // Header background == color.
            if( 'color' === header_background ) {
                if( hasHeaderImage() ) {
                    $('#componentz-header .header-image').slideUp();
                }
                $('#componentz-header > .header-background').removeAttr('style').css({
                    'background': 'linear-gradient(50deg, '
                        .concat( color_left ).concat( ' 0, ' )
                        .concat( color_right ).concat( ' 100%)' )
                } );
            }
            else
            if( 'image' == header_background ) {
                if( hasHeaderImage() ) {
                    $('#componentz-header .header-image').slideDown();
                }
                $('#componentz-header > .header-background').css({
                   'background': 'none' 
                });
            }
            else
            if( 'image-overlay' === header_background ) {
                if( hasHeaderImage() ) {
                    $('#componentz-header .header-image').slideDown();
                }
                $('#componentz-header > .header-background').removeAttr('style').css({
                    'background': 'linear-gradient(50deg, '
                        .concat( color_left ).concat( ' 0, ' )
                        .concat( color_right ).concat( ' 100%)' )
                } );
            }
            
        } )
    } );
    
    // Header Color Left
    wp.customize( 'componentz_header_color_left', function( value ) {
        value.bind( function( color_left ) {
            var color_right = wp.customize.get().componentz_header_color_right;
            $( '#componentz-header > .header-background' ).css( {
                'background': 'linear-gradient(50deg, '
                    .concat( color_left ).concat( ' 0, ' )
                    .concat( color_right ).concat( ' 100%)' )
            } );
        } );
    } );
    
    // Header Color Right
    wp.customize( 'componentz_header_color_right', function( value ) {
        value.bind( function( color_right ) {
            var color_left = wp.customize.get().componentz_header_color_left;
            $('#componentz-header > .header-background').css( {
                'background': 'linear-gradient(50deg, '
                    .concat( color_left ).concat( ' 0, ' )
                    .concat( color_right ).concat( ' 100%)' )
            } );
        } );
    } );

    // Header Image Position
    wp.customize( 'componentz_header_background_position', function( value ) {
        value.bind( function( position ) {
            if( 'top' === position ) {
                $('#componentz-header img.header-image').css({
                    '-o-object-position': '50% 0',
                    'object-position': '50% 0'
                });
            }
            if( 'center' === position ) {
                $('#componentz-header img.header-image').css({
                    '-o-object-position': '50% 50%',
                    'object-position': '50% 50%'
                });
            }
            if( 'bottom' === position ) {
                $('#componentz-header img.header-image').css({
                    '-o-object-position': '50% 100%',
                    'object-position': '50% 100%'
                });
            }
        } );
    } );
    
    // Hide sidebar if main layout is set to wide-width.
    if( $('body').hasClass( 'no-sidebar' ) ) {
        $('#secondary').hide();
    }
    
    // Content layout
    wp.customize( 'componentz_content_layout', function( value ) {
        value.bind( function( layout ) {
            if( 'twelve' == layout ) {
                $('body').addClass('no-sidebar');
                $('#secondary').hide();
                $('#primary').removeClass('primary').addClass('cz-col-12');
            } else {
                $('body').removeClass('no-sidebar');
                $('#primary').removeClass('cz-col-12').addClass('primary');
                $('#secondary').show();
            }
        } );
    } );
    
    
})( jQuery );
