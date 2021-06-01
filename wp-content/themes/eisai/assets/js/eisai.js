/*	-------------------------------------------------------------------------
	Eisai theme main js file.
----------------------------------------------------------------------------- */
'use strict';

var eisai = eisai || {};

/**
 * Primary Navigation (offcanvas navigation).
 */
eisai.primaryNavigation = {

    init: function() {
        this.shown();
        this.hidden();
        this.keepFocusInModal();
    },

    shown: function() {

        // When the menu is show.
        UIkit.util.on( '#primary-navigation', 'shown', function () {
            // Focus on the first menu link.
            document.getElementById( 'primary-navigation' ).querySelector( 'ul > li:first-of-type a' ).focus();
        } );

    },

    hidden: function() {

        // When the menu is hidden.
        UIkit.util.on( '#primary-navigation', 'hidden', function () {
            // Focus on the navigation toggle button.
            document.getElementById( 'primary-navigation-toggle' ).focus();
        } );

    },

    keepFocusInModal: function() {

        var primaryNav = document.getElementById( 'primary-navigation' );

        if ( ! primaryNav ) {
            return;
        }

        var _doc = document;

        _doc.addEventListener( 'keydown', function( event ) {
			var closeBtn, firstEl, lastEl, tabKey, shiftKey, enterKey, activeEl = _doc.activeElement;

            // body has .uk-offcanvas-container class when offcanvas menu is open.
			if ( activeEl && _doc.body.classList.contains( 'uk-offcanvas-container' ) ) {

                closeBtn = primaryNav.querySelector( '.uk-offcanvas-close' );
                firstEl  = primaryNav.querySelector( 'ul.primary-navigation > li:first-of-type a' );
                lastEl   = primaryNav.querySelector( 'ul.primary-navigation > li:last-of-type a' );
                tabKey   = event.code === "Tab";
				shiftKey = event.shiftKey;
                enterKey = event.code === "Enter";

                // If 'Enter' key is pressed to open sub menu, then focus on the parent node (by itself it focuses on the first nav item).
                if ( enterKey && activeEl.parentNode.classList.contains( 'uk-parent' ) ) {
                    setTimeout( function() {
                        activeEl.parentNode.querySelector( 'a' ).focus();
                    }, 250 );
                }

                // If 'Tab' key is pressed when last menu item was active, then we should focus on close button.
                if ( ! shiftKey && tabKey && activeEl.isSameNode( lastEl ) ) {
                    event.preventDefault();
                    closeBtn.focus();
                }

                // When 'Shift' + 'Tab' keys are pressed when first element is active, then focus on close button.
                if ( shiftKey && tabKey && activeEl.isSameNode( firstEl ) ) {
                    event.preventDefault();
                    closeBtn.focus();
                }

                // When 'Shift' + 'Tab' keys are pressed when close button is active, on last menu element.
                if ( shiftKey && tabKey && activeEl.isSameNode( closeBtn ) ) {
                    event.preventDefault();
                    lastEl.focus();
                }

			}

		} );

    }

}

/**
 * Navbar Navigation.
 */
eisai.navbarNavigation = {

    init: function() {

        this.handleKeyboardNavigation();

    },

    handleKeyboardNavigation: function() {

        var navbarNav = document.getElementById( 'navbar-navigation' );

        if ( ! navbarNav ) {
            return;
        }

        var _doc = document;

        _doc.addEventListener( 'keydown', function( event ) {
			var tabKey, shiftKey, arrowDownKey, arrowUpKey, enterKey, activeEl = _doc.activeElement;

            // If there is an active element in the document & this element is inside the navbar menu.
			if ( activeEl && navbarNav.contains( activeEl ) ) {

                tabKey          = event.keyCode === 9;
				shiftKey        = event.shiftKey;
                arrowDownKey    = event.code === "ArrowDown";
                arrowUpKey      = event.code === "ArrowUp";
                enterKey        = event.code === "Enter";

                // If 'Tab' key is pressed when focus is on a parent menu item and dropdown is closed.
                if ( ! shiftKey && tabKey && activeEl.parentNode.classList.contains( 'menu-item-has-children' ) && ! activeEl.classList.contains( 'uk-open' ) ) {
                    event.preventDefault();
                    UIkit.dropdown( activeEl.nextElementSibling ).show();
                }

                // If 'Enter' key is pressed when focus is on a parent menu item -> visit parent link.
                if ( enterKey && activeEl.parentNode.classList.contains( 'menu-item-has-children' ) ) {
                    event.preventDefault();
                    window.location.href = activeEl.href;
                }

                // If 'ArrowDown' key is pressed when focus is on a parent menu item and dropdown is closed -> open dropdown and focus on the first link.
                if ( ! shiftKey && arrowDownKey && activeEl.parentNode.classList.contains( 'menu-item-has-children' ) && ! activeEl.classList.contains( 'uk-open' ) ) {
                    event.preventDefault();

                    // When dropdown menu is shown, then focus on the first link.
                    setTimeout( function() {
                        activeEl.nextElementSibling.querySelector( '.uk-nav > li a' ).focus();
                    }, 150 );

                    // Show the dropdown menu.
                    UIkit.dropdown( activeEl.nextElementSibling ).show();
                }

                // If 'Tab' key is pressed when focus is on a parent menu item and dropdown is closed -> open dropdown and focus on the first link.
                if ( ! shiftKey && tabKey && activeEl.parentNode.classList.contains( 'menu-item-has-children' ) && ! activeEl.classList.contains( 'uk-open' ) ) {
                    event.preventDefault();

                    // When dropdown menu is shown, then focus on the first link.
                    setTimeout( function() {
                        activeEl.nextElementSibling.querySelector( '.uk-nav > li a' ).focus();
                    }, 150 );

                    // Show the dropdown menu.
                    UIkit.dropdown( activeEl.nextElementSibling ).show();
                }

                // When 'Tab' key is pressed when focus is on a last link of the dropdown sub menu -> close current sub menu & focus on the next link of the parent menu.
                if ( ! shiftKey && tabKey && (activeEl.parentNode == activeEl.parentNode.parentNode.lastElementChild) && activeEl.parentNode.parentNode.classList.contains('sub-menu') ) {
                    event.preventDefault();

                    // When dropdown is hidden, then focus on the next link of the parent menu.
                    setTimeout( function() {
                        activeEl.parentNode.parentNode.parentNode.parentNode.nextElementSibling.querySelector( 'a' ).focus();
                    }, 150 );

                    // Hide dropdown.
                    UIkit.dropdown( activeEl.parentNode.parentNode.parentNode ).hide(false);
                }

                // If 'ArrowUp' key is pressed when focus is on a first link of the dropdown sub menu -> Close sub menu and focus on the parent link.
                if ( ! shiftKey && arrowUpKey && (activeEl.parentNode == activeEl.parentNode.parentNode.firstElementChild) && activeEl.parentNode.parentNode.classList.contains('sub-menu') ) {
                    event.preventDefault();

                    // When dropdown menu is hidden, focus on the parent menu link.
                    setTimeout( function() {
                        activeEl.parentNode.parentNode.parentNode.parentNode.querySelector( 'a' ).focus();
                    }, 150 );

                    // Hide dropdown.
                    UIkit.dropdown( activeEl.parentNode.parentNode.parentNode ).hide(false);
                }

                // If 'Shift' + 'Tab' keys where pressed when focus is on a first link of the dropdown sub menu -> Close sub menu and focus on the parent link.
                if ( shiftKey && tabKey && (activeEl.parentNode == activeEl.parentNode.parentNode.firstElementChild) && activeEl.parentNode.parentNode.classList.contains('sub-menu') ) {
                    event.preventDefault();

                    // When dropdown menu is hidden, focus on the parent menu link.
                    setTimeout( function() {
                        activeEl.parentNode.parentNode.parentNode.parentNode.querySelector( 'a' ).focus();
                    }, 150 );

                    // Hide dropdown.
                    UIkit.dropdown( activeEl.parentNode.parentNode.parentNode ).hide(false);
                }

			}

		} );

    }

}

/**
 * Focus on input field when search modal is shown.
 */
eisai.searchModal = {

    init: function() {
        this.shown();
        this.hidden();
        this.keepFocusInModal();
    },

    shown: function() {

        // When search modal is shown.
        UIkit.util.on( '#search-modal', 'shown', function () {
            // Focus on input field.
            document.getElementById( 'search-modal' ).querySelector( 'input[type="search"]' ).focus();
        } );

    },

    hidden: function() {

        // When the menu is hidden.
        UIkit.util.on( '#search-modal', 'hidden', function () {
            // Focus on the search modal toggle button.
            document.getElementById( 'search-modal-toggle' ).focus();
        } );

    },

    keepFocusInModal: function() {
        var _doc = document;

        _doc.addEventListener( 'keydown', function( event ) {
			var modal, input, closeBtn, submitBtn, tabKey, shiftKey, activeEl = _doc.activeElement;

            // html element has .uk-modal-page class when modal is shown.
			if ( activeEl && _doc.documentElement.classList.contains( 'uk-modal-page' ) ) {

                modal     = _doc.getElementById( 'search-modal' );
                input     = modal.querySelector( 'input[type="search"]' );
                closeBtn  = modal.querySelector( '.uk-modal-close-full' );
                submitBtn = modal.querySelector( 'input[type="submit"]' );
                tabKey    = event.keyCode === 9;
				shiftKey  = event.shiftKey;

                // If 'Tab' key is pressed when submit button was active, then we should focus on close button.
                if ( ! shiftKey && tabKey && activeEl.isSameNode( submitBtn ) ) {
                    event.preventDefault();
                    closeBtn.focus();
                }

                // If 'Shift' + 'Tab' keys are pressed when search input is active, then focus on close button.
                if ( shiftKey && tabKey && activeEl.isSameNode( input ) ) {
                    event.preventDefault();
                    closeBtn.focus();
                }

                // When 'Shift' + 'Tab' keys are pressed when close button is active, then focus on submit button.
                if ( shiftKey && tabKey && activeEl.isSameNode( closeBtn ) ) {
                    event.preventDefault();
                    submitBtn.focus();
                }

			}

		} );

    }

}

/**
 * Is the DOM ready
 *
 * this implementation is coming from https://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
 *
 * @param {Function} fn Callback function to run.
 */
function eisaiDomReady( fn ) {
    if ( typeof fn !== 'function' ) {
        return;
    }

    if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
        return fn();
    }

    document.addEventListener( 'DOMContentLoaded', fn, false );
}

eisaiDomReady( function() {
    eisai.primaryNavigation.init(); // Handle primary navigation events.
    eisai.navbarNavigation.init();  // Handle navbar navigation events.
    eisai.searchModal.init();       // Handle search modal events.
} );
