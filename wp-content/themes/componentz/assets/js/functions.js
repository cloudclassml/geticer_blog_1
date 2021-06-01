var COMPONENTZ = COMPONENTZ || {};

(function ($) {

    "use strict";

    /**
     * Vars
     *
     * Define the vars.
     *
     * @since 1.0.0
     */
    var $window             = $(window),
        $body               = $('body'),
        $wrapper            = $('#componentz-wrapper'),
        $header             = $('#componentz-header'),
        $headerContainer    = $('#componentz-header .container-header'),
        $headerHeight       = $headerContainer.height(),
        $sideMenuBTN        = $('.cz-side-menu > button'),
        $sideMenuCollapse   = $('.cz-side-menu #componentz-side-menu-collapse'),
        $mobileMenuBTN      = $('.cz-mobile-menu > button'),
        $mobileMenuCollapse = $('.cz-mobile-menu #componentz-mobile-menu-collapse'),
        $userMenuBTN        = $('.cz-menu-right #account-header'),
        $userMenuCollapse   = $('#componentz-account-menu-collapse'),
        $contentOverlay     = $('.content-overlay'),
        $primary            = $('#primary'),
        $sidebar            = $('#secondary'),
        $sidebarToggler     = $('#sidebar-toggler'),
        $siteContentWrapper = $('main.site-content');

    /**
     * Initialize
     *
     * Initialization related group of functions.
     *
     * @since 1.0.0
     */
    COMPONENTZ.initialize = {

        /**
         * Initialize
         *
         * Initialize theme functions.
         *
         * @since 1.0.0
         */
        init: function () {
            
            COMPONENTZ.initialize.responsiveClasses();
            COMPONENTZ.initialize.preloader();
            COMPONENTZ.initialize.overlay();
            COMPONENTZ.initialize.sidebarToggle();
            COMPONENTZ.initialize.aos();
            COMPONENTZ.initialize.ripple();
            
            if ( _ComponentzData.is_child_theme ) {
                console.log('Componentz Child Theme v' + _ComponentzData.version);
            } else {
                console.log('Componentz Theme v' + _ComponentzData.version);   
            }

        },
        
        responsiveClasses: function(){
			var jRes = jRespond([
				{
					label: 'smallest',
					enter: 0,
					exit: 575
				},{
					label: 'handheld',
					enter: 576,
					exit: 767
				},{
					label: 'tablet',
					enter: 768,
					exit: 991
				},{
					label: 'laptop',
					enter: 992,
					exit: 1199
				},{
					label: 'desktop',
					enter: 1200,
					exit: 10000
				}
			]);
			jRes.addFunc([
				{
					breakpoint: 'desktop',
					enter: function() { $body.addClass('device-xl'); },
					exit: function() { $body.removeClass('device-xl'); }
				},{
					breakpoint: 'laptop',
					enter: function() { $body.addClass('device-lg'); },
					exit: function() { $body.removeClass('device-lg'); }
				},{
					breakpoint: 'tablet',
					enter: function() { $body.addClass('device-md'); },
					exit: function() { $body.removeClass('device-md'); }
				},{
					breakpoint: 'handheld',
					enter: function() { $body.addClass('device-sm'); },
					exit: function() { $body.removeClass('device-sm'); }
				},{
					breakpoint: 'smallest',
					enter: function() { $body.addClass('device-xs'); },
					exit: function() { $body.removeClass('device-xs'); }
				}
			]);
		},
        
        /**
         * Preloader
         *
         * The page preloader.
         *
         * @since 1.0.0
         */
        preloader: function() {
            if ( _ComponentzData.preloader ) {
                if ( ! window.AnimationEvent ) {
                    return;
                }
                $('body').addClass('cz-loading');
                $(document).ready(function(){
                    var fader = document.getElementById('fader');
                    $('body').removeClass('cz-loading');
                    fader.classList.add('fade-out');
                });
            }
        },
        
        /**
         * Overlay
         *
         * The content overlay top distance dynamic calculation.
         *
         * @since 1.0.0
         */
        overlay: function() {
            var adminBarLength = $('#wpadminbar').length,
                adminBarHeight = $('#wpadminbar').height(),
                headerHeight   = $headerContainer.height();
            
            if( adminBarHeight ) {
                var top = adminBarHeight + headerHeight;
            } else {
                var top = headerHeight;
            }
            
            if ( $body.hasClass( 'device-sm' ) || $body.hasClass( 'device-xs' ) ) {
                var top = headerHeight;
            }
            
            $contentOverlay.css('top', top - 1);
        },
        
        /**
         * Sidebar Toggle
         *
         * Show / hide the sidebar.
         *
         * @since 1.0.0
         */
        sidebarToggle: function() {
            var timeout;
            $sidebar.hover(
                function(){
                    timeout = setTimeout(function(){
                        $sidebarToggler.addClass('active'); 
                    }, 500);
                },
                function () {
                    clearTimeout(timeout);
                }
            );
            $sidebarToggler.on('click', function(){
                if( ! $sidebar.hasClass( 'closed' ) ) {
                    $body.addClass('no-sidebar');
                    $sidebar.addClass('closed');
                    $primary.removeClass('primary').addClass('cz-col-12');
                    $sidebarToggler.addClass('active');
                } else {
                    $body.removeClass('no-sidebar');
                    $sidebar.removeClass('closed');
                    $primary.removeClass('cz-col-12').addClass('primary');
                }
            });
        },
        
        /**
         * Animate on Scroll
         *
         * Initialize animate on scroll library.
         *
         * @since 1.0.0
         */
        aos: function() {
            AOS.init({
                once: true
            });
        },

        /**
         * Ripple
         *
         * Ripple animation effect.
         *
         * @since 1.0.0
         */
        ripple: function() {
            var buttons = $('button, .button, input[type=submit], .wp-block-button__link, .wp-block-file .wp-block-file__button, .cz-menu .cz-dropdown-item, .cz-side-nav .menu-item a, .cz-menu-right .sub-menu-item, #featured-posts .cz-card > a, .post-tags a, .widget_tag_cloud a');

            Array.prototype.forEach.call(buttons, function(b){
                b.addEventListener('click', COMPONENTZ.helper.createRipple);
            });
        }

    };

    /**
     * Header
     *
     * Header related group of functions.
     *
     * @since 1.0.0
     */
    COMPONENTZ.header = {

        /**
         * Initialize
         *
         * Initialize the header functions.
         *
         * @since 1.0.0
         */
        init: function () {
            
            COMPONENTZ.header.headerImage();
            COMPONENTZ.header.sticky();
            COMPONENTZ.header.menus();
            COMPONENTZ.header.mobileMenu();
            COMPONENTZ.header.sideMenuFocusLoop();
            COMPONENTZ.header.userMenuFocusLoop();
            COMPONENTZ.header.mobileMenuFocusLoop();
            COMPONENTZ.header.focusMenusWithChildren();
            COMPONENTZ.header.menusMaxHeight();
            COMPONENTZ.header_search.init();
            COMPONENTZ.header.headerImageAnimation();

        },
        
        /**
         * Header Image
         *
         * Reload the header image animation on customize partial refresh.
         *
         * @since 1.1.2
         */
        headerImage: function() {
            if ( 'undefined' !== typeof wp && wp.customize && wp.customize.selectiveRefresh ) {
                wp.customize.selectiveRefresh.bind( 'partial-content-rendered', function( placement ) {
                    if( 'header_image' === placement.partial.id ) {
                        COMPONENTZ.header.headerImageAnimation();
                    }
                } );
            }
        },

        /**
         * Sticky Header
         *
         * Add sticky header class when window scroll.
         * Do not run this code in customize preview mode.
         *
         * @since 1.0.0
         */
        sticky: function() {
            if( _ComponentzData.sticky_header ) {
                var height = $headerContainer.height() + 48;
                if( $('#componentz-header .componentz-header-dummy').length ) {
                    $('#componentz-header .componentz-header-dummy').css('height', $headerHeight);
                }
                if( $('#componentz-header .page-header').length ) {
                    $('#componentz-header .page-header').attr('style', 'padding-top:'+ height +'px!important');
                } else {
                    if( ! $('#componentz-header .componentz-header-dummy').length ) {
                        $siteContentWrapper.css('padding-top', $headerHeight);
                    }
                }
                $window.on( 'scroll', function() {
                    var adminBarHeight = $('#wpadminbar').height(),
                        sticky = $header.offset().top;
                    
                    // Fix header jump on mobile devices.
                    if( $body.hasClass('device-xs') ) {
                        if( window.pageYOffset > adminBarHeight ) {
                            $headerContainer.css({
                                'position': 'fixed',
                                'top': '0'
                            });
                        } else {
                            $headerContainer.removeAttr('style');
                        }
                    } 
                    
                    if( window.pageYOffset > sticky ) {
                        $headerContainer.addClass('hover');
                    } else {
                        $headerContainer.removeClass('hover');
                    }
                } );
                $window.on( 'resize', function() {
                    var $headerHeight = $headerContainer.height() + 48,
                        $contentPadding = $headerContainer.height();
                    if( $('#componentz-header .componentz-header-dummy').length ) {
                        $('#componentz-header .componentz-header-dummy').css('height', $headerHeight);
                    }
                    if( $('#componentz-header .page-header').length ) {
                        $('#componentz-header .page-header').attr('style', 'padding-top:'+ $headerHeight +'px!important');
                    } else {
                        if( ! $('#componentz-header .componentz-header-dummy').length ) {
                            $siteContentWrapper.css('padding-top', $contentPadding);
                        }
                    }
                } );
            }
        },

        /**
         * Menus
         *
         * Initialize theme menus.
         *
         * @since 1.0.0
         */
        menus: function () {
            
            /**
             * Prevent page jump to top on "#" menu links click.
             *
             * @since 1.0.1
             */
            $('.cz-menu a[href="#"]').click(function(event){
                event.preventDefault();
            });
            
            /**
             * Prevent sub-menu collapsible links on the primary menu to be focused.
             *
             * @since 1.1.2
             */
            $('.cz-primary-menu').find( '.cz-submenu-collapse' ).attr( 'tabindex', '-1' );

            // Remove "toggle & haspopup" attributes on primary menu links.
            $('#componentz-primary-menu-collapse a').removeAttr('data-toggle aria-haspopup aria-expanded');

            /**
             * Side Menu
             *
             * Side menu open / close functions.
             *
             * @since 1.0.0
             */
            $sideMenuBTN.on('click', function (event) {
                $(this).toggleClass('active');
                $sideMenuCollapse.collapse('toggle');

                // If side menu open, let's add -
                // proper class to body element.
                if( $(this).hasClass('active') ) {
                    $body.addClass('side-nav-open');
                } else {
                    $body.removeClass('side-nav-open');
                }

                $userMenuBTN.removeClass('active');
                $userMenuCollapse.collapse('hide');
                
                // Close side menu on ESC keypress.
                $(this).on( 'keydown', function(evt) {
                    evt = evt || window.event;
                    var isEscape = false;
                    if ("key" in evt) {
                        isEscape = (evt.key === "Escape" || evt.key === "Esc");
                    } else {
                        isEscape = (evt.keyCode === 27);
                    }
                    if (isEscape) {
                        $body.removeClass('side-nav-open');
                        $sideMenuBTN.removeClass('active');
                        $sideMenuCollapse.collapse('hide');
                    }
                } );

                event.preventDefault();
            });

            /**
             * Account Menu
             *
             * If side menu is active and account menu clicked let's deactivate side menu first.
             *
             * @since 1.0.0
             */
            $userMenuBTN.on('click', function (event) {
                $(this).toggleClass('active');
                $userMenuCollapse.collapse('toggle');
                
                // If user menu open, let's add -
                // proper class to body element.
                if( $(this).hasClass('active') ) {
                    $body.addClass('side-nav-open');
                } else {
                    $body.removeClass('side-nav-open');
                }
                
                $sideMenuBTN.removeClass('active');
                $sideMenuCollapse.collapse('hide');
                
                // Close account menu on ESC keypress.
                $(this).on( 'keydown', function(evt) {
                    evt = evt || window.event;
                    var isEscape = false;
                    if ("key" in evt) {
                        isEscape = (evt.key === "Escape" || evt.key === "Esc");
                    } else {
                        isEscape = (evt.keyCode === 27);
                    }
                    if (isEscape) {
                        $body.removeClass('side-nav-open');
                        $userMenuBTN.removeClass('active');
                        $userMenuCollapse.collapse('hide');
                    }
                } );

                event.preventDefault();
            });

            /**
             * Side & Account Menus
             *
             * Toogle overlay switching.
             *
             * @since 1.0.0
             */
            $('.cz-side-nav:not(.cz-mobile-menu) > button, .cz-menu-right #account-header').on('click', function() {
                if( $(this).hasClass('active') ) {
                    $headerContainer.addClass('header-overlay hover');
                    $contentOverlay.addClass('side-nav-open');
                } else {
                    $headerContainer.removeClass('header-overlay');
                    
                    // Do not remove the "hover" class if sticky header is on scroll.
                    if ( window.pageYOffset === 0 ) {
                        $headerContainer.removeClass( 'hover' );
                    }
                    
                    $('#componentz-header:not(.sticky-header) .container-header').removeClass('hover');
                    $contentOverlay.removeClass('side-nav-open');
                }
                // Remove overlay on ESC keypress.
                $(this).on( 'keydown', function(evt) {
                    evt = evt || window.event;
                    var isEscape = false;
                    if ("key" in evt) {
                        isEscape = (evt.key === "Escape" || evt.key === "Esc");
                    } else {
                        isEscape = (evt.keyCode === 27);
                    }
                    if (isEscape) {
                        $headerContainer.removeClass('header-overlay');
                        $('#componentz-header:not(.sticky-header) .container-header').removeClass('hover');
                        $contentOverlay.removeClass('side-nav-open');
                    }
                } );
            });
            
            // Collapse side / mobile - menus children.
            $('.cz-side-nav .cz-submenu-collapse').on('click', function(e){
                $(this).parent('li').toggleClass('show');
                $(this).next('ul.cz-dropdown-menu').slideToggle();
            });

        },

        /**
         * Side Menu Focus Loop
         *
         * Loop through the side menu with keyboard.
         *
         * @since 1.1.2
         */
        sideMenuFocusLoop: function() {
            var _doc = document, button, elements, selector, lastEl, firstEl, activeEl, tabKey, shiftKey,
                menu = $('.cz-side-menu');

            if( ! menu ) {
                return false;
            }

            _doc.addEventListener( 'keydown', function( event ) {
                if( $sideMenuCollapse.hasClass( 'show' ) ) {
                    selector = 'a, button';
                    elements = $(menu).find( selector ).filter( ':visible' );
                    elements = Array.prototype.slice.call( elements );

                    lastEl      = elements[ elements.length - 1 ];
                    firstEl     = elements[0];
                    activeEl    = _doc.activeElement;
                    tabKey      = event.keyCode === 9;
                    shiftKey    = event.shiftKey;

                    if ( ! shiftKey && tabKey && lastEl === activeEl ) {
                        event.preventDefault();
                        firstEl.focus();
                    }

                    if ( shiftKey && tabKey && firstEl === activeEl ) {
                        event.preventDefault();
                        lastEl.focus();
                    }
                }
            } );
        },

        /**
         * User Menu Focus Loop
         *
         * Loop through the user menu with keyboard.
         *
         * @since 1.1.2
         */
        userMenuFocusLoop: function() {
            var _doc = document, elements, selector, lastEl, firstEl, activeEl, tabKey, shiftKey,
                menu = $('#account-header').parent( 'li' );

            if( ! menu ) {
                return false;
            }

            _doc.addEventListener( 'keydown', function( event ) {
                if( $userMenuCollapse.hasClass( 'show' ) ) {

                    selector = 'a';
                    elements = $(menu).find( selector ).filter( ':visible' );
                    elements = Array.prototype.slice.call( elements );

                    lastEl      = elements[ elements.length - 1 ];
                    firstEl     = elements[0];
                    activeEl    = _doc.activeElement;
                    tabKey      = event.keyCode === 9;
                    shiftKey    = event.shiftKey;

                    if ( ! shiftKey && tabKey && lastEl === activeEl ) {
                        event.preventDefault();
                        firstEl.focus();
                    }

                    if ( shiftKey && tabKey && firstEl === activeEl ) {
                        event.preventDefault();
                        lastEl.focus();
                    }
                }
            } );
        },

        /**
         * Mobile Menu
         *
         * Initialization of mobile menu.
         *
         * @since 1.0.0
         */
        mobileMenu: function() {

            // Mobile Menu - Collapse
            $mobileMenuBTN.on('click', function (e) {
                $(this).toggleClass('active');
                $mobileMenuCollapse.collapse('toggle');
                
                // If mobile menu open let's add proper class to body element.
                if( $(this).hasClass('active') ) {
                    $body.addClass('side-nav-open');
                    $contentOverlay.addClass('side-nav-open');
                } else {
                    $body.removeClass('side-nav-open');
                    $contentOverlay.removeClass('side-nav-open');
                }

                $userMenuBTN.removeClass('active');
                $userMenuCollapse.collapse('hide');

                $sideMenuBTN.removeClass('active');
                $sideMenuCollapse.collapse('hide');

                e.preventDefault();
            });
        },

        /**
         * Mobile Menu Focus Loop
         *
         * Loop through the mobile menu with keyboard.
         *
         * @since 1.1.2
         */
        mobileMenuFocusLoop: function() {
            var _doc = document, elements, selector, lastEl, firstEl, activeEl, tabKey, shiftKey,
                menu = $('.cz-mobile-menu');
            
            if( ! menu ) {
                return false;
            }

            _doc.addEventListener( 'keydown', function( event ) {
                if( $mobileMenuCollapse.hasClass( 'show' ) ) {
                    selector = 'a, button';
                    elements = $(menu).find( selector ).filter( ':visible' );
                    elements = Array.prototype.slice.call( elements );

                    lastEl      = elements[ elements.length - 1 ];
                    firstEl     = elements[0];
                    activeEl    = _doc.activeElement;
                    tabKey      = event.keyCode === 9;
                    shiftKey    = event.shiftKey;

                    if ( ! shiftKey && tabKey && lastEl === activeEl ) {
                        event.preventDefault();
                        firstEl.focus();
                    }

                    if ( shiftKey && tabKey && firstEl === activeEl ) {
                        event.preventDefault();
                        lastEl.focus();
                    }
                }
            } );
        },
        
        /**
         * Menus Focus
         *
         * The focusMenusWithChildren() function implements Keyboard Navigation in the Menus
         * by adding the '.focus' class to all 'li.menu-item-has-children' when the focus 
         * is on the 'a' element.
         *
         * @since 1.0.4
         */
        focusMenusWithChildren: function() {
            var links, i, len,
                menus = $('.cz-primary-menu, .cz-menu-right');
            
            if( ! menus ) {
                return false;
            }
            
            links = $(menus).find( 'a' );
            
            // Each time a menu link is focused or blurred, toggle focus.
            for ( i = 0, len = links.length; i < len; i++ ) {
                links[i].addEventListener( 'focus', toggleFocus, true );
                links[i].addEventListener( 'blur', toggleFocus, true );
            }
            
            //Sets or removes the .focus class on an element.
            function toggleFocus() {
                var self = this;
                // Move up through the ancestors of the current link until we hit .cz-row.
                while ( -1 === self.className.indexOf( 'cz-row' ) ) {
                    // On li elements toggle the class .focus.
                    if ( 'li' === self.tagName.toLowerCase() ) {
                        if ( -1 !== self.className.indexOf( 'focus' ) ) {
                            self.className = self.className.replace( ' focus', '' );
                        } else {
                            self.className += ' focus';
                        }
                    }
                    self = self.parentElement;
                }
            }
            
        },
        
        /**
         * Menus Max Height
         *
         * Dynamic calculation of side and mobile menus max-height.
         *
         * @since 1.0.0
         */
        menusMaxHeight: function() {
            var windowHeight   = $(window).height(),
                adminBar       = $('#wpadminbar'),
                adminBarLength = adminBar.length,
                adminBarHeight = adminBar.height(),
                headerHeight   = $headerContainer.height();
            
            if( adminBarLength ) {
                var maxHeight = windowHeight - ( headerHeight + adminBarHeight );
            } else {
                var maxHeight = windowHeight - headerHeight;
            }
            
            $('.cz-side-menu .cz-navbar-collapse, .cz-mobile-menu .cz-navbar-collapse').css('max-height', maxHeight);
        },
        
        /**
         * Header Image Animation
         *
         * Animate header image and content.
         *
         * @since 1.0.0
         */
        headerImageAnimation: function() {
            var image = document.getElementsByClassName('header-image'),
                featured_image = $('.page-header img.post-featured-image');
            
            // Header image parallax.
            if( 'image' === _ComponentzData.header_background || 'image-overlay' === _ComponentzData.header_background ) {
                if( image.length ) {
                    new simpleParallax(image, {
                        delay: 0,
                        orientation: 'up',
                        transition: 'cubic-bezier(0,0,0,1)'
                    });
                }
            }
            
            $window.on('scroll', function() {
                if( $('#componentz-header .post-featured-image').length ) {
                    var num = 0.0015;
                } else {
                    var num = 0.0025;
                }
                $("#componentz-header .page-header .cz-col").css("top", Math.max(1 + 0.30 * window.scrollY, 0) + "px");
                $("#componentz-header .page-header .cz-col").css("opacity", Math.max(1 - num * window.scrollY, 0));
            });
        }

    };

    /**
     * Header Search
     *
     * Header search effect functions.
     *
     * @since 1.0.0
     */
    COMPONENTZ.header_search = {

        /**
         * Initialize
         *
         * Initialize the header search.
         *
         * @since 1.0.0
         */
        init: function () {
            if ( _ComponentzData.header_search ) {
                $('.btn-search').click(function (e) {
                    
                    // Add hover class to header container.
                    $headerContainer.addClass('hover');

                    // Remove side & user menus active class.
                    $('.cz-side-nav > button, .cz-menu-right #account-header').removeClass('active');

                    // Hide collapsed menus.
                    $sideMenuCollapse.collapse('hide');
                    $userMenuCollapse.collapse('hide');
                    $mobileMenuCollapse.collapse('hide');

                    // Remove overlay classes.
                    $headerContainer.removeClass('header-overlay');
                    $contentOverlay.removeClass('side-nav-open');

                    e.preventDefault();
                });
                COMPONENTZ.header_search.initEvents();
                COMPONENTZ.header_search.focusSearch();
            }
        },

        /**
         * Init Events
         *
         * Initialize search events.
         *
         * @since 1.0.0
         */

        initEvents: function () {
            var openCtrl = document.getElementById('search-nav'),
                closeCtrl = document.getElementById('btn-search-close');

            openCtrl.addEventListener('click', COMPONENTZ.header_search.openSearch);
            closeCtrl.addEventListener('click', COMPONENTZ.header_search.closeSearch);

            document.addEventListener('keyup', function (ev) {
                // escape key.
                if (ev.keyCode == 27) {
                    COMPONENTZ.header_search.closeSearch();
                }
            });
        },

        /**
         * Open Search
         *
         * Open the search input overlay.
         *
         * @since 1.0.0
         */
        openSearch: function () {
            var searchContainer = document.querySelector('.search-wrapper'),
                inputSearch = searchContainer.querySelector('.search-wrapper-input'),
                closeSearch = searchContainer.querySelector('.btn-search-close');

            searchContainer.classList.add('search-open');
            inputSearch.focus();
        },

        /**
         * Close Search
         *
         * Close the search input overlay.
         *
         * @since 1.0.0
         */
        closeSearch: function () {
            var searchContainer = document.querySelector('.search-wrapper'),
                inputSearch = searchContainer.querySelector('.search-wrapper-input');

            searchContainer.classList.remove('search-open');
            inputSearch.blur();
            inputSearch.value = '';
            
            // If side or user menu open and clicked straight on search button,
            // Let's be sure that we remove "side-nav-open" class upon search close.
            if( $('body').hasClass('side-nav-open') ) {
                $('body').removeClass('side-nav-open');
            }
            
            $('#search-nav').focus();

            // Remove hover class from header container.
            setTimeout(function(){
                $('#componentz-header:not(.sticky-header) .container-header').removeClass('hover');
            }, 500);
        },
        
        /**
         * Focus Search
         *
         * Adds a keyboard navigation focus support.
         *
         * @since 1.1.2
         */
        focusSearch: function() {
            var _doc = document, elements, selector, lastEl, firstEl, activeEl, tabKey, shiftKey,
                wrapper = $('.search-wrapper');
            
            if( ! wrapper ) {
                return false;
            }

            _doc.addEventListener( 'keydown', function( event ) {
                if( wrapper.hasClass( 'search-open' ) ) {
                    selector = 'a, input';
                    elements = $(wrapper).find( selector );
                    elements = Array.prototype.slice.call( elements );

                    lastEl      = elements[ elements.length - 1 ];
                    firstEl     = elements[0];
                    activeEl    = _doc.activeElement;
                    tabKey      = event.keyCode === 9;
                    shiftKey    = event.shiftKey;
                    
                    if ( ! shiftKey && tabKey && lastEl === activeEl ) {
                        event.preventDefault();
                        firstEl.focus();
                    }

                    if ( shiftKey && tabKey && firstEl === activeEl ) {
                        event.preventDefault();
                        lastEl.focus();
                    }
                }
            } );
        }

    };

    /**
     * Helper
     *
     * Componentz helper functions.
     *
     * @since 1.0.0
     */
    COMPONENTZ.helper = {

        /**
         * Create Ripple
         *
         * Creates ripple effect on element click.
         *
         * @since 1.0.0
         */
        createRipple: function(e) {
            var circle = document.createElement('div');
            this.appendChild(circle);

            var d = Math.max(this.clientWidth, this.clientHeight);

            circle.style.width = circle.style.height = d + 'px';

            var rect = this.getBoundingClientRect();
            circle.style.left = e.clientX - rect.left -d/2 + 'px';
            circle.style.top = e.clientY - rect.top - d/2 + 'px';
            
            circle.classList.add('ripple');
            
            // Remove element after 1 sec.
            setTimeout(function(){
                circle.parentNode.removeChild(circle);
            }, 1000); 
        }

    };

    /**
     * Document on Resize
     *
     * Initializes on document resize.
     *
     * @since 1.0.0
     */
    COMPONENTZ.documentOnResize = {

        init: function () {

            var t = setTimeout(function () {
                
                COMPONENTZ.initialize.overlay();
                COMPONENTZ.header.menusMaxHeight();

            }, 500);
        }

    };

    /**
     * Document on Ready
     *
     * Initializes on document ready.
     *
     * @since 1.0.0
     */
    COMPONENTZ.documentOnReady = {
        
        /**
         * Initialize
         *
         * Initialize functions on document ready.
         *
         * @since 1.0.0
         */
        init: function () {

            COMPONENTZ.initialize.init();
            COMPONENTZ.header.init();
            COMPONENTZ.documentOnReady.windowscroll();

        },
        
        /**
         * Window on Scroll
         *
         * Initialize function on window scroll.
         *
         * @since 1.0.0
         */
        windowscroll: function () {
            $window.on('scroll', function () {
                
                COMPONENTZ.initialize.overlay();

            });
        }

    };

    /**
     * Document on Load
     *
     * Initializes on document load.
     *
     * @since 1.0.0
     */
    COMPONENTZ.documentOnLoad = {

        init: function () {


        }

    };

    // Initialization
    $(document).ready(COMPONENTZ.documentOnReady.init);
    $window.load(COMPONENTZ.documentOnLoad.init);
    $window.on('resize', COMPONENTZ.documentOnResize.init);

})(jQuery);

/**
 * SVG for Everybody
 *
 * @since 1.0.0
 */

!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
        define([], function() {
            return root.svg4everybody = factory();
        }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
                var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""),
                    cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                    xhr._embeds.splice(0).map(function(item) {
                        // get the cached target
                        var target = xhr._cachedTarget[item.id];
                        // ensure the cached target
                        target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
                            // embed the target into the svg
                            embed(item.parent, item.svg, target);
                    });
            }
        }, // test the ready state change immediately
            xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
                var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)),
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(),
                                    xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                    xhr._embeds.push({
                                        parent: parent,
                                        svg: svg,
                                        id: id
                                    }), // prepare the xhr ready state change event
                                    loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});

svg4everybody();
