import { useSelector } from "react-redux";

function UserProfile() {
  const { user } = useSelector((state) => state?.user);

  return (
    <div className="bg-[#FAF4E1] p-4 min-h-[calc(100vh-65px)]">
      <div className="p-4 md:p-12 flex items-center justify-center flex-col bg-[#FAF0E6] text-lg w-fit mx-auto shadow-lg">
        <h2 className="text-2xl font-medium text-[#8E0505]">User Profile</h2>
        <div className="flex gap-2 mt-2 mb-2">
          <img src={user.image} className="h-16 w-16 rounded-md mt-2" />
        </div>

        <p className="text-gray-500">{user?.name}</p>
        <p className="text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
