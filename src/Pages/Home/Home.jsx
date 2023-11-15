import { Helmet } from "react-helmet-async";
import Baner from "./Baner";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import Populer from "./PopularMenu/Populer";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet className="">
        <title>Bistro | Home</title>
      </Helmet>
      <Baner></Baner>
      <Category></Category>
      <Populer></Populer>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
