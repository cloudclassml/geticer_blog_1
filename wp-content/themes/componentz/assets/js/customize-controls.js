/**
 * File customize-controls.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

(function($) {

	wp.customize.bind( 'ready', function() {
        
        // If header background isset "color" hide header image control.
        wp.customize( 'componentz_header_background', function( setting ) {
            wp.customize.control( 'header_image', function( control ) {
                var visibility = function() {
                    if( 'color' !== setting.get() ) {
                        control.container.slideDown( 180 );
                    }  else {
                        control.container.slideUp( 180 );
                    }
                };
                
                visibility();
                setting.bind( visibility );
            } );
        } );
        
        // Menu Items Left Side - Hide / Show add new item button when limit reach.
        wp.customize.control( 'componentz_menu_items_left', function( control ) {
            var limit   = control.params.choices.limit,
                button  = $( control.selector + ' button.repeater-add' ),
                note    = $( control.selector + ' p.limit' );
            
            if( limit === control.currentIndex ) {
                note.show();
                button.hide();
            } else {
                note.hide();
                button.show();
            }
            
            // Hide add new item button.
            control.container.on( 'click', 'button.repeater-add', function( e ) {
                e.preventDefault();
                if ( control.currentIndex === limit ) {
                    note.show();
                    button.hide();
                } else {
                    note.hide();
                    button.show();
                }
            } );
            
            // Show add new item button.
            control.container.on( 'click', '.repeater-row-remove', function() {
                if ( limit > control.currentIndex ) {
                    note.hide();
                    button.show();
                }
            } );
        } );
        
        // Menu Items Right Side - Hide / Show add new item button when limit reach.
        wp.customize.control( 'componentz_menu_items_right', function( control ) {
            var limit   = control.params.choices.limit,
                button  = $( control.selector + ' button.repeater-add' ),
                note    = $( control.selector + ' p.limit' );
            
            if( limit === control.currentIndex ) {
                note.show();
                button.hide();
            } else {
                note.hide();
                button.show();
            }
            
            // Hide add new item button.
            control.container.on( 'click', 'button.repeater-add', function( e ) {
                e.preventDefault();
                if ( control.currentIndex === limit ) {
                    note.show();
                    button.hide();
                } else {
                    note.hide();
                    button.show();
                }
            } );
            
            // Show add new item button.
            control.container.on( 'click', '.repeater-row-remove', function() {
                if ( limit > control.currentIndex ) {
                    note.hide();
                    button.show();
                }
            } );
        } );
        
        // Mobile Menu Items - Hide / Show add new item button when limit reach.
        wp.customize.control( 'componentz_mobile_menu_items', function( control ) {
            var limit   = control.params.choices.limit,
                button  = $( control.selector + ' button.repeater-add' ),
                note    = $( control.selector + ' p.limit' );
            
            if( limit === control.currentIndex ) {
                note.show();
                button.hide();
            } else {
                note.hide();
                button.show();
            }
            
            // Hide add new item button.
            control.container.on( 'click', 'button.repeater-add', function( e ) {
                e.preventDefault();
                if ( control.currentIndex === limit ) {
                    note.show();
                    button.hide();
                } else {
                    note.hide();
                    button.show();
                }
            } );
            
            // Show add new item button.
            control.container.on( 'click', '.repeater-row-remove', function() {
                if ( limit > control.currentIndex ) {
                    note.hide();
                    button.show();
                }
            } );
        } );
        
        // Social Icons - Hide / Show add new icon button when limit reach.
        wp.customize.control( 'componentz_social_icons', function( control ) {
            var limit   = control.params.choices.limit,
                button  = $( control.selector + ' button.repeater-add' ),
                note    = $( control.selector + ' p.limit' );
            
            if( limit === control.currentIndex ) {
                note.show();
                button.hide();
            } else {
                note.hide();
                button.show();
            }
            
            // Hide add new item button.
            control.container.on( 'click', 'button.repeater-add', function( e ) {
                e.preventDefault();
                if ( control.currentIndex === limit ) {
                    note.show();
                    button.hide();
                } else {
                    note.hide();
                    button.show();
                }
            } );
            
            // Show add new item button.
            control.container.on( 'click', '.repeater-row-remove', function() {
                if ( limit > control.currentIndex ) {
                    note.hide();
                    button.show();
                }
            } );
        } );
        
    } );

})( jQuery );
