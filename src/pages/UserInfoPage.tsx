import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../types/User";
import { IPost } from "../types/Post";

const UserInfoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!userResponse.ok) throw new Error("Error fetching the user!");

        const userData: IUser = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        );
        if (!postsResponse.ok) throw new Error("Error fetching the posts!");

        const postsData: IPost[] = await postsResponse.json();

        setPosts(postsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [id]);

  if (loading)
    return (
      <p className="text-3xl text-center text-[#077A7D] uppercase animate-pulse">
        Loading...
      </p>
    );
  if (!user)
    return (
      <p className="text-3xl text-center text-[#077A7D] uppercase">
        User not found
      </p>
    );

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="px-5 py-3 text-[#077A7D] cursor-pointer hover:scale-110 transition-transform duration-200 absolute left-0"
      >
        <i className="fa-solid fa-backward text-3xl"></i>
      </button>

      <h1 className="text-center text-5xl text-[#077A7D] uppercase font-medium pb-8 sm:pt-12 pt-16 md:pt-0 ">
        {user.name}
      </h1>
      <div className="flex items-center text-center flex-col gap-2 pb-6">
        <p className="text-lg">
          <span className="text-[#077A7D]">Email: </span>
          {user.email}
        </p>
        <p className="text-lg">
          <span className="text-[#077A7D]">Phone: </span>
          {user.phone}
        </p>
        <p className="text-lg">
          <span className="text-[#077A7D]">Address: </span>
          {user.address.suite}, {user.address.street}, {user.address.city},{" "}
          {user.address.zipcode}
        </p>
        <p className="text-lg">
          <span className="text-[#077A7D]">Company: </span>
          {user.company.name}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-sm shadow-sm p-3 hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            <h1 className="text-3xl text-[#077A7D] pb-2">{post.title}</h1>
            <p className="text-lg text-[#06202B]">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfoPage;
