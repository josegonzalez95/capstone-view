// import React, { useState } from 'react';
// import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios';
// import styles from "./StripeBtn.module.css"
// import { Button } from 'semantic-ui-react';

// const StripeCheckoutButton = ({ price, numOfParticipants, handleSubmit }) => {
//   const [product] = useState({
//     name: 'Your Product',
//     price: price,
//     description: 'Your product description',
//   });

//   const successPayment = data => {
//     handleSubmit()
//     alert('Payment Successful');
//   };

//   const errorPayment = data => {
//     alert('Payment Error');
//   };

//   const handleToken = (token) => {
//     console.log(token);
//     axios.post(process.env.REACT_APP_API_URL + "/paymentIntent",
//     {
//       description:"'Your product description'",
//       source: token.id,
//       currency: "USD",
//       amount: (product.price * numOfParticipants * 100)
//     })
//     .then(successPayment)
//     .catch(errorPayment);


//     // alert('Payment Successful!');
//   };

//   console.log(price)

//   return (
//     <StripeCheckout
//       stripeKey={"pk_test_51MnAKLIIosIqHVIHSA7dPs7W52y7UwTuOnTUezAnTkPHBC7LASFbxnz4lBeZNlJE2dwO5qTKeGOCGgZeq8mG0BsB00yK87Tu7T"}
//       token={handleToken}
//       name="Your Website Name"
//       amount={product.price * numOfParticipants * 100}
//       currency="USD"
//     //   billingAddress={true}
//       description={product.description}
//     >
//       <Button className={styles.btn}>Pay Now</Button>
//     </StripeCheckout>
//   );
// };

// export default StripeCheckoutButton;