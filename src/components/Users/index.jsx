import User from "./User/Index";

function Users({ users, enabled, setPage }) {
  return (
    <div
      id="#users"
      className="2xl:w-[1170px] lg:w-[1024px] md:w-[768px] w-[360px] bg-[rgb(245,245,245)]"
    >
      <h1 className="text-[40px] leading-10 text-center pt-[60px]">
        Working with Get request
      </h1>
      <div className="flex flex-wrap justify-center pt-[20px]">
        {users.map((user, index) => (
          <User user={user} key={index} />
        ))}
      </div>
      <div
        className={`w-[100px] h-[34px] flex justify-center items-center rounded-full mt-[20px] cursor-pointer text-black mx-auto ${
          enabled ? "bg-[#F4E041] hover:bg-[#FFE302]" : "bg-[#B4B4B4]"
        }`}
      >
        <p
          onClick={() => (enabled ? setPage((prevPage) => prevPage + 1) : null)}
        >
          Show more
        </p>
      </div>
    </div>
  );
}

export default Users;
