import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";

const UseAdmin = () => {
  const { user ,loading} = UseAuth();
  const AxiosSecure = UseAxios();
  const { data: isAdmin, isPending:isAdminPanding} = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosSecure.get(`/users/admin/${user.email}`)
    //   console.log(res.data)
      return res.data?.admin
    },
  });
  return [isAdmin,isAdminPanding]
};

export default UseAdmin;
