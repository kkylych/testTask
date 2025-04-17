import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1 className="text-center text-5xl uppercase font-medium">
        <span className="text-[#077A7D]">Home</span> Page
      </h1>

      <Link
        to={"/users"}
        className="pt-10 block text-3xl text-center text-[#077A7D] cursor-pointer opacity-80 hover:opacity-100 transition-transform duration-200"
      >
        List of Users
      </Link>
    </>
  );
};

export default HomePage;
