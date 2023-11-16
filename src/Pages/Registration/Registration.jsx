import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserAxiosPublic from "../../Hooks/UserAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Registration = () => {
  const axiosPublic = UserAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { CreateUser, updateProfileUser } = UseAuth();

  const onSubmit = (data) => {
    console.log(data);
    CreateUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateProfileUser(data.name, data.photo)
        .then(() => {
          const userInfo = {
            name: data.name,
            email:data.email
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log('user add database')
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Helmet className="">
        <title>Bistro | Registration</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Registration now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card 0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600"> Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photo", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.photo && (
                  <span className="text-red-600"> Photo is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600"> Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
                  })}
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600"> Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    {" "}
                    Password must be 6 character
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">
                    {" "}
                    Password must be less then 20 character
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    {" "}
                    Password must be some specail character
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  // disabled={disable}
                  className="btn btn-primary"
                  type="submit"
                  value="sign up"
                />
              </div>
            </form>
            <div className="text-center p-4">
              <p>
                Already have an account?{" "}
                <span className="text-red-500">
                  <Link to="/login">login </Link>
                </span>
              </p>
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

export default Registration;
