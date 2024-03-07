function User({ user }) {
  return (
    <div className="2xl:w-[370px] lg:w-[282px] md:w-[344px] h-[254px] w-[328px] bg-white rounded-[10px] m-[10px] text-center font-[16px] leading-[26px] overflow-hidden">
      <div className="flex flex-col justify-center items-center pt-[20px]">
        <img
          src={user.photo}
          alt="user_photo"
          className="h-[70px] w-[70px] rounded-full"
        />
        <p className="pt-[20px]">{user.name}</p>
      </div>
      <div className="pt-[20px]">
        <p>{user.position}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
    </div>
  );
}

export default User;
