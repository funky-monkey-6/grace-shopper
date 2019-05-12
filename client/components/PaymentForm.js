import React from 'react';
import SquarePaymentForm from './sqpaymentform';

class PaymentForm extends React.Component {
  requestCardNonce = event => {
    event.preventDefault();
    SquarePaymentForm.requestCardNonce();
  };

  render() {
    return (
      <div>
        <div id="sq-ccbox">
          <form id="nonce-form" noValidate action="path/to/payment/processing/page" method="post">
            Pay with a Credit Card
            <table>
              <tbody>
                <tr>
                  <td>Card Number:</td>
                  <td>
                    <div id="sq-card-number" />
                  </td>
                </tr>
                <tr>
                  <td>CVV:</td>
                  <td>
                    <div id="sq-cvv" />
                  </td>
                </tr>
                <tr>
                  <td>Expiration Date: </td>
                  <td>
                    <div id="sq-expiration-date" />
                  </td>
                </tr>
                <tr>
                  <td>Postal Code:</td>
                  <td>
                    <div id="sq-postal-code" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <button
                      type="submit"
                      id="sq-creditcard"
                      className="button-credit-card"
                      onClick={this.requestCardNonce}
                    >
                      Pay with card
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="hidden" id="card-nonce" name="nonce" />
          </form>
        </div>
      </div>
    );
  }
}

export default PaymentForm;
