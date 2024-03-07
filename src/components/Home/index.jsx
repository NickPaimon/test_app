import heroImage from "../../assets/pexels-alexandr-podvalny-1227513.jpeg";
import { scrollToSection } from "../../utils";

function Home() {
  return (
    <div
      className="relative h-[650px] bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col text-white md:w-[380px] w-[328px] text-center items-center">
        <h1 className="text-[40px] leading-10">
          Test assignment for front-end developer
        </h1>
        <p className="text-[16px] leading-[26px] mt-[20px]">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <div
          onClick={(e) => {
            scrollToSection(e, "#signUp");
          }}
          className="w-[100px] h-[34px] bg-[#F4E041] hover:bg-[#FFE302] flex justify-center items-center rounded-full mt-[20px] cursor-pointer text-black"
        >
          <p>Sign Up</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
