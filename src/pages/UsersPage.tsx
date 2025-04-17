import { useNavigate } from "react-router-dom";
import { IUser } from "../types/User";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const navigate = useNavigate();

  const handleClick = (id: number): void => {
    navigate(`/users/${id}`);
  };

  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(value);
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );

        if (!response.ok) throw new Error("Error fetching users!");

        const data: IUser[] = await response.json();

        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-center text-5xl uppercase font-medium">
          List of <span className="text-[#077A7D]">Users</span>
        </h1>

        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          value={search}
          className="border border-[#06202B] px-3 py-3 rounded-sm shadow-sm w-1/3 my-10 hover:scale-102 transition-transform duration-200"
        />
      </div>
      {loading ? (
        <p className="text-3xl text-center text-[#077A7D] uppercase animate-pulse">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              className="border rounded-sm shadow-sm p-3 hover:scale-105 transition-transform duration-200 cursor-pointer"
              key={user.id}
              onClick={() => handleClick(user.id)}
            >
              <h1 className="text-3xl pb-2 text-[#06202B]">{user.name}</h1>
              <p className="text-lg">
                <span className="text-[#077A7D]">Email: </span>
                {user.email}
              </p>
              <p className="text-lg">
                <span className="text-[#077A7D]">Address: </span>
                {user.address.city}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
