import { PayPalScriptProvider, PayPalButtons, BraintreePayPalButtons } from "@paypal/react-paypal-js";

export default function PayPal({price, numOfParticipants, handleSubmit, setPaymentMehtod, orderEmail}) {

    const initialOptions = {
        "client-id": "test",
        currency: "USD",
        intent: "capture",
        "data-client-token": "abc123xyz==",
    };

    const createOrder =(data, actions) => {
        // return actions.order.create({
        //     purchase_units: [
        //         {
        //             amount: {
        //                 value: (price),
        //             },
        //         },
        //     ],
        // });
        return fetch("/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                price: price
                // cart: [
                //     {
                //         // id: "YOUR_PRODUCT_ID",
                //         // quantity: "YOUR_PRODUCT_QUANTITY",
                //         purchase_units: [
                //                     {
                //                         amount: {
                //                             value: (price),
                //                         },
                //                     },
                //                 ],
                //     },
                // ],
            }),
        })
            .then((response) => response.json())
            .then((order) => {
                return order.id
            });
    }


    const onApprove=(data, actions) => {
        // return actions.order.capture().then((details) => {
        //     const name = details.payer.name.given_name;
        //     alert(`Transaction completed by ${name}`);
        //     handleSubmit("PayPal", orderEmail)
        // });
        return fetch("/capture-paypal-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
          .then((response) => response.json())
          .then((orderData) => {
                const name = orderData.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
          });
    }

    const onError=()=>{

    }

    const onCancel=()=>{

    }

    return (
        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_CLIENT_ID}}>
            <PayPalButtons style={{ layout: "horizontal" }} forceReRender={[numOfParticipants, orderEmail]}
            fundingSource={"paypal"}
            // fundingSource={["paypal", "card"]}
            // change action.order.create and action order capture to backend nodejs
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={onCancel}
                onError={onError}
            />
            {/* */}
        </PayPalScriptProvider>
    );
}