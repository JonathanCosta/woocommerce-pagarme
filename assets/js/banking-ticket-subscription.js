/* global wcPagarmeParams, PagarMe */
(function( $ ) {
	'use strict';

	$( function() {

		/**
		 * Process the banking ticket subscription data when submit the checkout form.
		 */
		$( 'body' ).on( 'click', '#place_order', function() {
			if ( ! $( '#payment_method_pagarme-banking-ticket-subscription' ).is( ':checked' ) ) {
				return true;
			}

			var form              = $( 'form.checkout, form#order_review' ),
				submitButton      = $( '#place_order' ),
				bankingTicketForm = $( '#pagarme-banking-ticket-subscription-form', form ),
				installments      = null,
				errorHtml         = '';

			// Lock the checkout form.
			form.addClass( 'processing' );

			// Set the installments data.
			installments = $( '#pagarme-ticket-installments', form ).val();

			// Display the errors in banking ticket form.
			if ( installments === "0" ) {
				form.removeClass( 'processing' );
				$( '.woocommerce-error', bankingTicketForm ).remove();

				errorHtml += '<ul>';
				errorHtml += '<li>' + 'Campo Obrigatório' + '</li>';
				errorHtml += '</ul>';

				bankingTicketForm.prepend( '<div class="woocommerce-error">' + errorHtml + '</div>' );
			} else {
				form.removeClass( 'processing' );
				$( '.woocommerce-error', bankingTicketForm ).remove();

				submitButton.attr('disabled','disabled');

				setTimeout(function(){
					if( $( '.checkout.woocommerce-checkout.processing' ).length === 0 ) {
						submitButton.removeAttr( 'disabled' );
					}
				}, 5000);

				// Submit the form.
				form.submit();
			}

			return false;
		});
	});

}( jQuery ));
