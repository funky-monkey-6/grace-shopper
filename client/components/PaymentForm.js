import React, { Component } from 'react';
// const sqstyle = require('../../public/square/sqpaymentform.css');

export default class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardBrand: '',
      nonce: undefined,
      // googlePay: false,
      // applePay: false,
      // masterpass: false,
    };
    this.requestCardNonce = this.requestCardNonce.bind(this);
  }

  componentDidMount() {
    const config = {
      applicationId: 'sandbox-sq0idp-YfSxeUZQFH4SAOVucCDsgA',
      locationId: 'CBASEExneP465Uh22ddavOX_1y8gAQ',
      inputClass: 'sq-input',
      autoBuild: false,
      inputStyles: [
        {
          fontSize: '16px',
          fontFamily: 'Helvetica Neue',
          padding: '16px',
          color: '#373F4A',
          backgroundColor: 'transparent',
          lineHeight: '1.15em',
          placeholderColor: '#555',
          _webkitFontSmoothing: 'antialiased',
          _mozOsxFontSmoothing: 'grayscale',
        },
      ],
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '• • • •  • • • •  • • • •  • • • •',
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV',
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY',
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Zip',
      },
      callbacks: {
        createPaymentRequest: () => {
          return {
            requestShippingAddress: false,
            requestBillingInfo: true,
            currencyCode: 'USD',
            countryCode: 'US',
            total: {
              label: 'LOVIN TODAY',
              amount: '1',
              pending: false,
            },
            lineItems: [
              {
                label: 'Subtotal',
                amount: '1',
                pending: false,
              },
            ],
          };
        },
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            console.log('Encountered errors:');
            errors.forEach(function(error) {
              console.log('  ' + error.message);
            });

            return;
          }

          alert('Nonce received: ' + nonce); /* FOR TESTING ONLY */
          this.setState({
            nonce,
          });
        },
        unsupportedBrowserDetected: () => {
          alert('Your browser does not support Square payments.');
        },
        inputEventReceived: inputEvent => {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              break;
            case 'focusClassRemoved':
              break;
            case 'errorClassAdded':
              document.getElementById('error').innerHTML =
                'Please fix card information errors before continuing.';
              break;
            case 'errorClassRemoved':
              document.getElementById('error').style.display = 'none';
              break;
            case 'cardBrandChanged':
              if (inputEvent.cardBrand !== 'unknown') {
                this.setState({
                  cardBrand: inputEvent.cardBrand,
                });
              } else {
                this.setState({
                  cardBrand: '',
                });
              }
              break;
            case 'postalCodeChanged':
              break;
            default:
              break;
          }
        },
        // paymentFormLoaded() {
        //   document.getElementById('name').style.display = 'inline-flex';
        // },
      },
    };
    this.paymentForm = new this.props.paymentForm(config);
    this.paymentForm.build();
  }

  requestCardNonce() {
    this.paymentForm.requestCardNonce();
  }

  render() {
    return (
      <div id="form-container">
        <h5 style={{ textAlign: 'center' }}> Payment Information </h5>
        <br />
        <div id="sq-ccbox">
          <fieldset>
            <span className="label">Card Number</span>
            <div id="sq-card-number" />

            <div className="third">
              <span className="label">Expiration</span>
              <div id="sq-expiration-date" />
            </div>

            <div className="third">
              <span className="label">CVV</span>
              <div id="sq-cvv" />
            </div>

            <div className="third">
              <span className="label">Postal</span>
              <div id="sq-postal-code" />
            </div>
          </fieldset>

          <button
            type="submit"
            id="sq-creditcard"
            className="button-credit-card"
            onClick={this.requestCardNonce}
          >
            Pay with card
          </button>
        </div>
        <p style={{ textAlign: 'center' }} id="error" />
      </div>
    );
  }
}
