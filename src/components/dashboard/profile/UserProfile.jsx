import { useSelector } from "react-redux";

function UserProfile() {
  const { user } = useSelector((state) => state?.user);

  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-medium">Profile</h2>
      <div className="flex gap-2 mt-4 text-lg">
        <span>Photo : </span>
        <img src={user?.image} alt="" className="h-16 w-16 rounded mt-2" />
      </div>
      <div className="mt-2 text-lg">
        <p>
          Name : <span className="text-gray-500">{user?.name}</span>
        </p>
        <p>
          Email : <span className="text-gray-500">{user?.email}</span>
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
