import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxios from "../../../Hooks/UseAxios";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxios();
  const { data: payments =[] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <p className="text-3xl ">Total Payment:{payments.length}</p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Transaction Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment,index) =>  <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>$ {payment.price}</td>
              <td>{payment.transactionId}</td>
              <td>{payment.status}</td>
            </tr> )}
          
         
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
