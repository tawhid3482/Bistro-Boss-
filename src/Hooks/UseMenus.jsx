// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import UserAxiosPublic from "./UserAxiosPublic";

const UseMenus = () => {
  const axiosPublic = UserAxiosPublic()
  // const [menu, setMenu] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   fetch("https://final-project-server-henna.vercel.app/menu")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenu(data);
  //       setLoading(false);
  //     });
  // }, []);

  const {data: menu = [], isPending: loading, refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: async()=>{
      const res = await axiosPublic.get('/menu')
      return res.data
    }
  })

     return [menu, loading,refetch];

};

export default UseMenus;
