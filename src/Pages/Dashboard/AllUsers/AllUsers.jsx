import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../Hooks/UseAxios";
import { FaTrash,  FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const AxiosSecure = UseAxios();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/users");
      return res.data;
    },
  });
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleMakeAdmin = (user) => {
    AxiosSecure.patch(`/users/admin/${user._id}`)
    .then(res =>{
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title:`${user.name} is an Admin Now`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
  };
  return (
    <div className="">
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl font-medium">All Users</h2>
        <h2 className="text-3xl font-medium">Total Users:{users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                {user.role === 'admin' ? 'Admin':  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn bg-orange-400  "
                  >
                    <FaUsers className="text-xl text-white"></FaUsers>
                  </button>}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost "
                  >
                    <FaTrash className="text-xl text-orange-500"></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
