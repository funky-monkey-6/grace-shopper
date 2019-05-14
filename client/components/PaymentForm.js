import React, { Component } from 'react';
// const sqstyle = require('../../public/square/sqpaymentform.css');

const styles = {
  name: {
    verticalAlign: 'top',
    display: 'none',
    margin: 0,
    border: 'none',
    fontSize: '16px',
    fontFamily: 'Helvetica Neue',
    padding: '16px',
    color: '#373F4A',
    backgroundColor: 'transparent',
    lineHeight: '1.15em',
    placeholderColor: '#000',
    _webkitFontSmoothing: 'antialiased',
    _mozOsxFontSmoothing: 'grayscale',
  },
  leftCenter: {
    float: 'left',
    textAlign: 'center',
  },
  blockRight: {
    display: 'block',
    float: 'right',
  },
  center: {
    textAlign: 'center',
  },
  form_container: {
    position: 'relative',
    width: '380px',
    margin: '0 auto',
    top: '50%',
    // transform: 'translateY(-50%)',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px',
    letterSpacing: '0.5',
    textTransform: 'uppercase',
  },
  sqInput: {
    boxSizing: 'border-box',
    border: '1px solid #e0e2e3',
    borderRadius: '4px',
    outlineOffset: '-2px',
    display: 'inline-block',
    webkitTransition: 'border-color 0.2s ease-in-out, background 0.2s ease-in-out',
    mozTransition: 'border-color 0.2s ease-in-out, background 0.2s ease-in-out',
    msTransition: 'border-color 0.2s ease-in-out, background 0.2s ease-in-out',
    transition: 'border-color 0.2s ease-in-out, background 0.2s ease-in-out',
  },
};

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
              amount: '100',
              pending: false,
            },
            lineItems: [
              {
                label: 'Subtotal',
                amount: '100',
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
        paymentFormLoaded() {
          document.getElementById('name').style.display = 'inline-flex';
        },
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
      // <div id="form-container" style={styles.form_container}>
      //   <h5 style={styles.leftCenter}>Payment Information </h5>
      //   <br />
      //   <div id="sq-ccbox">
      //     {/* <p>
      //       <span style={styles.blockLeft}>{this.state.cardBrand.toUpperCase()}</span>
      //     </p> */}
      //     <br />
      //     <table>
      //       <tbody>
      //         <tr>
      //           <td>Card Number:</td>
      //           <td>
      //             <div id="sq-card-number" />
      //           </td>
      //           <td>
      //             <span>{this.state.cardBrand.toUpperCase()}</span>
      //           </td>
      //         </tr>
      //         <tr>
      //           <td>CVV:</td>
      //           <td>
      //             <div id="sq-cvv" />
      //           </td>
      //         </tr>
      //         <tr>
      //           <td>Expiration Date: </td>
      //           <td>
      //             <div id="sq-expiration-date" />
      //           </td>
      //         </tr>
      //         <tr>
      //           <td>Postal Code:</td>
      //           <td>
      //             <div id="sq-postal-code" />
      //           </td>
      //         </tr>
      //         <tr>
      //           <td colspan="2">
      //             <button
      //               id="sq-creditcard"
      //               className="button-credit-card"
      //               onClick={this.requestCardNonce}
      //             >
      //               Pay with card
      //             </button>
      //           </td>
      //         </tr>
      //       </tbody>
      //     </table>
      //   </div>
      //   <p style={styles.center} id="error" />
      // </div>

      // ***Version 2***
      <div id="form-container">
        <div id="sq-ccbox">
          <form id="nonce-form" novalidate action="#" method="post">
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
              onClick="requestCardNonce(event)"
            >
              Submit Payment
            </button>

            <div id="error" />

            <input type="hidden" id="card-nonce" name="nonce" />
          </form>
        </div>
      </div>
    );
  }
}
