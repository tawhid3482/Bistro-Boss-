import { Link } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import { FaShoppingCart } from 'react-icons/fa';
import UseCart from "../../Hooks/UseCart";
import UseAdmin from "../../Hooks/UseAdmin";


const Navbar = () => {
  const { user, logout } = UseAuth();
  const [isAdmin]=UseAdmin()
  const [cart]=UseCart()
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our menu</Link>
      </li>

      <li>
        <Link to="/order/salad">Order</Link>
      </li>
      {
        user && isAdmin && <li>
        <Link to="/dashboard/adminHome">Dashboard</Link>
      </li>
      }
      {
        user && !isAdmin && <li>
        <Link to="/dashboard/userHome">Dashboard</Link>
      </li>
      }
      <li>
        <Link to="/dashboard/cart">
          <button className="btn btn-sm">
         <FaShoppingCart className="ml-2"></FaShoppingCart>
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li>

      {user ? (
        <>
          <button onClick={logout} className="btn btn-sm">
            logout
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-30 text-white bg-black ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bristo Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
