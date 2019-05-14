import React from 'react';
import SquarePaymentForm from '../../public/square/sqpaymentform';
// import '../../public/square/sqpaymentform.css';

class PaymentForm extends React.Component {
  // componentWillMount() {
  //   let sqPaymentScript = document.createElement('script');
  //   sqPaymentScript.src = 'https://js.squareup.com/v2/paymentform';
  //   sqPaymentScript.type = 'text/javascript';
  //   sqPaymentScript.defer = true;
  //   document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
  // }
  requestCardNonce = event => {
    event.preventDefault();
    SquarePaymentForm.requestCardNonce();
  };

  render() {
    return (
      <div className="App">
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
                    <td colspan="2">
                      <button
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
          <button className="button-credit-card" onClick={this.requestCardNonce}>
            Pay
          </button>
        </div>
        <p id="error" />
      </div>
    );
  }
}

export default PaymentForm;
