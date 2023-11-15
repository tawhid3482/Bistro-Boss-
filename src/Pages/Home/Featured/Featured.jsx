import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-5 my-20">
            <SectionTitle heading='Featured Items' subHeading='check it out' ></SectionTitle>
            <div className="md:flex justify-center items-center md:gap-10 gap-5 pb-20 pt-12 px-36 bg-slate-500 bg-opacity-40">
                <div className="">
                    <img src={featuredImg} alt="" />
                </div>
                <div className="">
                    <p>aug 20, 2022</p>
                    <p className="uppercase">where can i get it?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque laudantium fuga minus ipsa harum et sequi voluptas nihil beatae nemo!</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;