import { FaGoogle } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";

const SocialLogin = () => {
    const {loginbyGoogle}=UseAuth()
    const handleGoogleLogin = ()=>{
        loginbyGoogle()
        .then(result =>{
            console.log(result)
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
