import { Helmet } from "react-helmet-async";
import Cover from "../../../Shayed/Cover/Cover";
import MenuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import UseMenus from "../../../Hooks/UseMenus";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu]=UseMenus()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet className="">
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={MenuImg} title={'Our menu'}></Cover>
            <SectionTitle 
            subHeading={"Don't Miss"}
            heading={'today offer'}
            ></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
          {/* dessert menu items */}
          <MenuCategory items={dessert} title={'dessert'} coverImg={dessertImg}> </MenuCategory>
          {/* pizza menu items */}
          <MenuCategory items={pizza} title={'pizza'} coverImg={pizzaImg}> </MenuCategory>
          {/* salad menu items */}
          <MenuCategory items={salad} title={'salad'} coverImg={saladImg}> </MenuCategory>
          {/* soup menu items */}
          <MenuCategory items={soup} title={'soup'} coverImg={soupImg}> </MenuCategory>
        </div>
    );
};

export default Menu;