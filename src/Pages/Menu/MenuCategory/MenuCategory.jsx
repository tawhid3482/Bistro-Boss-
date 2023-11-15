import { Link } from "react-router-dom";
import Cover from "../../../Shayed/Cover/Cover";
import MenuItem from "../../../Shayed/MenuItem/MenuItem";

const MenuCategory = ({ items,title,coverImg }) => {
  return (
    <div className="pt-8">
   {  title && <Cover img={coverImg} title={title}></Cover>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center">
      <Link to={`/order/${title}`}> 
      <button className="btn btn-outline border-0 border-b-4 mt-4">order now</button>
      </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
