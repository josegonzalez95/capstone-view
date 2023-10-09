import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({amount, submitParticipants, orderBodySend}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const options = {
    mode: 'payment',
    amount: 1009,
    currency: 'usd',
    paymentMethodOrder:['paypal'],
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };


  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submit')

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      console.log('this error occured first')
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch(`${process.env.REACT_APP_API_URL}/create-intent`, {
      method: 'POST',
      body:JSON.stringify({
        amount: amount,
        orderBodySend
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res)

    const {client_secret: clientSecret, pi: pi, paymentId} = await res.json();
    // submitParticipants()

    const {error, paymentIntent} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret: clientSecret,
      receipt_email: 'gonzalez.massini@gmail.com',
      confirmParams: {
        return_url: 'http://localhost:3000',
      },
      redirect: "if_required"
    });
    // console.log(paymentIntent)

    // const res2 = await fetch(`${process.env.REACT_APP_API_URL}/confirm-payment`, {
    //   method: 'POST',
    //   body:JSON.stringify({
    //     pi: pi,
    //     paymentId
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const {status} = await res2.json();

    // console.log(status)
    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      console.log("error was here")
      setErrorMessage(error.message);
    } else {
      // const {paymentIntent, error} = await stripe.retrievePaymentIntent(
      //   clientSecret,
      // );
      // const { latest_charge } = paymentIntent

      const res = await fetch(`${process.env.REACT_APP_API_URL}/get-payment-intent`, {
        method: 'POST',
        body:JSON.stringify({
          paymentId: pi
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res)
  
      const {paymentIntent} = await res.json();

      
      // Handle error or paymentIntent
      const charge_id = paymentIntent.latest_charge


      const res2 = await fetch(`${process.env.REACT_APP_API_URL}/get-charge-object`, {
        method: 'POST',
        body:JSON.stringify({
          charge_id
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res)
  
      const {receipt_url} = await res2.json();
      await submitParticipants(pi, receipt_url)

      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={options}/>
      <button onClick={handleSubmit} type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

// const options = {
//   mode: 'payment',
//   amount: 1099,
//   currency: 'usd',
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };

// const App = () => (
//   <Elements stripe={stripePromise} options={options}>
//     <CheckoutForm />
//   </Elements>
// );

export default CheckoutForm