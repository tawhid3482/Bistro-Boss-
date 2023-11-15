import { useEffect,  useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  
  validateCaptcha,
} from "react-simple-captcha";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const navigate =useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
    const {LoginbyEmail}=UseAuth()
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    LoginbyEmail(email,password)
    .then(result => {
        const user = result.user
        console.log(user)

        Swal.fire({
          title: "user login successful",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });

        navigate (from,{replace:true})
    })
  };
  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisable(false);

    } else {
      setDisable(true);
    }
  };
  return (
    <> 
       <Helmet className="">
                <title>Bistro | Login</title>
            </Helmet>
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card 0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
              onBlur={handleValidateCaptcha}
                type="text"
                placeholder="type the captcha"
                name="captcha"
                className="input input-bordered"
              />
             
            </div>
            <div className="form-control mt-6">
              <input
                disabled={false}
                className="btn bg-orange-500"
                type="submit"
                value="login"
              />
            </div>
          </form>
          <div className="text-center p-4">
            <p>New here? <span><Link to='/register'> create an account</Link></span></p>
          </div>
          <div className="text-center p-4">
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
