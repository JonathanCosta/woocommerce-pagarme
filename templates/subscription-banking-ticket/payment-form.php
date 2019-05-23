<?php
/**
 * Subscription Banking Ticket - Checkout form.
 *
 * @author  Pagar.me
 * @package WooCommerce_Pagarme/Templates
 * @version 2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<fieldset id="pagarme-subscription-banking-ticket-form">
	<?php if ( apply_filters( 'wc_pagarme_allow_subscription_banking_ticket_installments', 1 < $max_installment ) ) : ?>
		<p class="form-row form-row-wide">
			<label for="pagarme-ticket-installments"><?php esc_html_e( 'Installments', 'woocommerce-pagarme' ); ?> <span class="required">*</span></label>
			<select name="pagarme_ticket_installments" id="pagarme-ticket-installments" style="font-size: 1.5em; padding: 8px; width: 100%;">
				<option value="0"><?php printf( esc_html__( 'Please, select the number of installments', 'woocommerce-pagarme' ) ); ?></option>
				<?php
				foreach ( $installments as $number => $installment ) :
					if ( 1 !== $number && $smallest_installment > $installment['installment_amount'] ) {
						break;
					}

					$interest           = ( ( $cart_total * 100 ) < $installment['amount'] ) ? sprintf( __( '(total of %s)', 'woocommerce-pagarme' ), strip_tags( wc_price( $installment['amount'] / 100 ) ) ) : __( '(interest-free)', 'woocommerce-pagarme' );
					$installment_amount = strip_tags( wc_price( $installment['installment_amount'] / 100 ) );
					?>
				<option value="<?php echo absint( $installment['installment'] ); ?>"><?php printf( esc_html__( '%1$dx of %2$s %3$s', 'woocommerce-pagarme' ), absint( $installment['installment'] ), esc_html( $installment_amount ), esc_html( $interest ) ); ?></option>
				<?php endforeach; ?>
			</select>
		</p>
	<?php endif; ?>
</fieldset>
