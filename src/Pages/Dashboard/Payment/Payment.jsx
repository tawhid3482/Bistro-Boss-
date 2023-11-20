import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutFrom from "./CheckOutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle heading={'Payment'} subHeading={'Please pay to eat'} ></SectionTitle>
            <div className="">
                <Elements stripe={stripePromise}>
                    <CheckOutFrom />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;