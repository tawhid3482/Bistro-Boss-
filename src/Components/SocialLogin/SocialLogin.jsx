import { FaGoogle } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import UserAxiosPublic from "../../Hooks/UserAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const axiosPublic = UserAxiosPublic()
    const {loginbyGoogle}=UseAuth()
    const navigate = useNavigate()
    const handleGoogleLogin = ()=>{
        loginbyGoogle()
        .then(result =>{
            console.log(result)
            const userInfo = {
              email:result.user?.email,
              name: result.user?.displayName
            }
            axiosPublic.post('/users',userInfo)
            .then(res => {
              console.log(res.data)
              navigate('/')
            })
        })
    }
  return (
    <div>
      <div className="">
        <div className="divider"></div>
        <button onClick={handleGoogleLogin} className="btn ">
          <FaGoogle className="text-2xl text-orange-400"></FaGoogle> Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
