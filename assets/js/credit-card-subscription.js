/* global wcPagarmeParams, PagarMe */
(function( $ ) {
	'use strict';

	$( function() {

		/**
		 * Process the credit card subscription data when submit the checkout form.
		 */
		$( 'body' ).on( 'click', '#place_order', function() {
			if ( ! $( '#payment_method_pagarme-credit-card-subscription' ).is( ':checked' ) ) {
				return true;
			}

			PagarMe.encryption_key = wcPagarmeParams.encryptionKey;

			var form           = $( 'form.checkout, form#order_review' ),
				submitButton   = $( '#place_order' ),
				creditCard     = new PagarMe.creditCard(),
				creditCardForm = $( '#pagarme-credit-cart-subscription-form', form ),
				installments   = null,
				errors         = null,
				errorHtml      = '';

			// Lock the checkout form.
			form.addClass( 'processing' );

			// Set the Credit card data.
			creditCard.cardHolderName      = $( '#pagarme-card-subscription-holder-name', form ).val();
			creditCard.cardExpirationMonth = $( '#pagarme-card-subscription-expiry', form ).val().replace( /[^\d]/g, '' ).substr( 0, 2 );
			creditCard.cardExpirationYear  = $( '#pagarme-card-subscription-expiry', form ).val().replace( /[^\d]/g, '' ).substr( 2 );
			creditCard.cardNumber          = $( '#pagarme-card-subscription-number', form ).val().replace( /[^\d]/g, '' );
			creditCard.cardCVV             = $( '#pagarme-card-subscription-cvc', form ).val();

			// Check installments
			installments = $( '#pagarme-credit-card-subscription-installments', form ).val();

			// Get the errors.
			errors = creditCard.fieldErrors();

			// Display the errors in credit card form.
			if ( ! $.isEmptyObject( errors ) || installments === "0" ) {
				form.removeClass( 'processing' );
				$( '.woocommerce-error', creditCardForm ).remove();

				errorHtml += '<ul>';
				$.each( errors, function ( key, value ) {
					errorHtml += '<li>' + value + '</li>';
				});

				if( installments === "0" )
					errorHtml += '<li>' + 'Número de Parcelas Inválido' + '</li>';
				errorHtml += '</ul>';

				creditCardForm.prepend( '<div class="woocommerce-error">' + errorHtml + '</div>' );
			} else {
				form.removeClass( 'processing' );
				$( '.woocommerce-error', creditCardForm ).remove();

				// Generate the hash.
				creditCard.generateHash( function ( cardHash ) {
					// Remove any old hash input.
					$( 'input[name=pagarme_card_hash]', form ).remove();

					// Add the hash input.
					form.append( $( '<input name="pagarme_card_hash" type="hidden" />' ).val( cardHash ) );

					submitButton.attr( 'disabled','disabled' );

					setTimeout(function(){
						if( $( '.checkout.woocommerce-checkout.processing' ).length === 0 ) {
							submitButton.removeAttr( 'disabled' );
						}
					}, 5000);

					// Submit the form.
					form.submit();
				});
			}

			return false;
		});
	});

}( jQuery ));
