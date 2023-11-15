import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../../Shayed/MenuItem/MenuItem";
import UseMenus from "../../../Hooks/UseMenus";

const Populer = () => {
  const [menu]=UseMenus()
  const popular = menu.filter(item => item.category === 'popular' )
  // const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //   fetch("menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const populerItem = data?.filter((item) => item.category === "popular");
  //       setMenu(populerItem);
  //     });
  // }, []);
  return (
    <section className="mb-8">
      <SectionTitle
        heading="From Our Menu"
        subHeading="Populer Item"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {
        popular.map((item) => (
          <MenuItem key={item._id}
           item={item}>

           </MenuItem>
        ))
        
        }
      </div>
     <div className="text-center">
     <button className="btn btn-outline border-0 border-b-4 mt-4 ">
        views full now
      </button>
     </div>
    </section>
  );
};

export default Populer;
