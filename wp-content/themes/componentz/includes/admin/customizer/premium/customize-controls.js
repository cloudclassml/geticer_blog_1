/**
 * componentz Premium
 */
( function( api ) {

	// Extends our custom "componentz-premium" section.
	api.sectionConstructor['componentz-premium'] = api.Section.extend( {

		// No events for this type of section.
		attachEvents: function () {},

		// Always make the section active.
		isContextuallyActive: function () {
			return true;
		}
	} );

} )( wp.customize );
