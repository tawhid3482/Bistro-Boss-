import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shayed/Footer/Footer";
import Navbar from "../Shayed/Navbar/Navbar";

const MainLayOut = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes('login') ||  location.pathname.includes('register')
    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayOut;