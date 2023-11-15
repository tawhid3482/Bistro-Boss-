import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";
import UseAuth from "./UseAuth";

const UseCart = () => {
  const AxiosSecure = UseAxios();
  const { user } = UseAuth();
  const {refetch, data: cart = [] } = useQuery({
    queryKey: ["cart",user?.email],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    },
  });
  return [cart,refetch];
};

export default UseCart;
