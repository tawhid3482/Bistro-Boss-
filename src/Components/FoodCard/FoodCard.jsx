import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxios from "../../Hooks/UseAxios";
import UseCart from "../../Hooks/UseCart";


const FoodCard = ({ item }) => {
  const { name, image, recipe, price,_id } = item;
  const axiosSecure = UseAxios()
const navigate = useNavigate()
  const { user } = UseAuth();
  const location = useLocation()
  const [,refetch]= UseCart()
  const handleAdd = () => {
    if (user && user.email) {
      const cartItem = {
        menuId : _id,
        email: user.email,
        name,
        price,
        image
      }
      axiosSecure.post('/carts',cartItem)
      .then(res => {
        console.log(res.data)
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500
          });
          refetch()
        }
      })
      
    } else {
      Swal.fire({
        title: "You are not to login?",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
         navigate('/login',{state:{from:location}})
        }
      });
    }
  };

  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt="img" />
        </figure>
        <p className="absolute right-0 mr-4 mt-4 p-1 text-white bg-slate-900">
          ${price}
        </p>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title ">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button
              onClick={ handleAdd}
              className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-orange-400"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
