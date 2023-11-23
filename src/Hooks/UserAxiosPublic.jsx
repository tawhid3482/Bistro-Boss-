import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://final-project-server-henna.vercel.app",
})
const UserAxiosPublic = () => {
    return axiosPublic
};

export default UserAxiosPublic;