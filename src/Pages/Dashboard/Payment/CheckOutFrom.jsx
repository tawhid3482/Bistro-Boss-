import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAxios from "../../../Hooks/UseAxios";
import UseCart from "../../../Hooks/UseCart";
import UseAuth from "../../../Hooks/UseAuth";

const CheckOutFrom = () => {
  const [error, setError] = useState("");
  const [clientSecret, setclientSecret] = useState("");
  const [transactionId, settransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth();

  const axiosSecure = UseAxios();
  const [cart] = UseCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setclientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("PaymentMethod hoise", paymentMethod);
      setError("");
    }
    // comfirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirmEroor khau");
    } else {
      console.log("success", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        settransactionId(paymentIntent.id);
        
        // now save to the database 
        const payment={
            email:user.email,
            price: totalPrice,
            transactionId:paymentIntent.id,
            date:new Date(),
            cartIds:cart.map(item => item._id),
            menuItemIds: cart.map(item => item.menuId),
            status:'pending'
        }
       const res = await axiosSecure.post('/payments',payment)
       console.log('payment save',res.data)
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-secondary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-500">Your Transaction Id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutFrom;
