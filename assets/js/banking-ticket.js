/* global wcPagarmeParams, PagarMe */
(function( $ ) {
	'use strict';

	$( function() {

		/**
		 * Process the banking ticket subscription data when submit the checkout form.
		 */
		$( 'body' ).on( 'click', '#place_order', function() {
			if ( ! $( '#payment_method_pagarme-banking-ticket' ).is( ':checked' ) ) {
				return true;
			}

			var form              = $( 'form.checkout, form#order_review' ),
				submitButton      = $( '#place_order' );

			submitButton.attr('disabled','disabled');

			setTimeout(function(){
				if( $( '.checkout.woocommerce-checkout.processing' ).length === 0 ) {
					submitButton.removeAttr( 'disabled' );
				}
			}, 5000);

			// Submit the form.
			form.submit();

			return false;
		});
	});

}( jQuery ));
