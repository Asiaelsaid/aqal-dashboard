import Logo from "../../assets/images/Logo.png";
import ImageBackground from "../../assets/images/bgImage.svg";


const FixedSection = () => {
  return (
    <div
      className={`lg:w-1/2 w-full text-white flex flex-col justify-center px-8 py-10 lg:py-0`}
      style={{
        backgroundImage: `url(${ImageBackground})`,
        backgroundSize: "cover",
      }}
    >
      <div className="lg:h-3/4 lg:w-3/4 w-full m-auto ">
        <div className="flex items-center mb-8">
          <img src={Logo} alt="Logo" className="h-7 mr-2" />
          <h1 className="text-sm font-medium">AQAL MANAGEMENT SOLUTIONS</h1>
        </div>
        <h1
          className="text-3xl lg:text-5xl font-semibold"
          style={{ lineHeight: "1.2" }}
        >
          Streamline Your Property Management Experience.
        </h1>
        <p className="mt-4 text-sm lg:text-lg font-light">
          From rent tracking to maintenance requests, manage everything with
          ease and efficiency, tailored to meet the needs of property owners,
          tenants, and managers alike.
        </p>
      </div>
      {/* <div className="mt-6 flex items-center">
    <div className="flex -space-x-4">
      <img
        src="/user1.jpg"
        alt="User 1"
        className="w-10 h-10 rounded-full border-2 border-purple-600"
      />
      <img
        src="/user2.jpg"
        alt="User 2"
        className="w-10 h-10 rounded-full border-2 border-purple-600"
      />
      <img
        src="/user3.jpg"
        alt="User 3"
        className="w-10 h-10 rounded-full border-2 border-purple-600"
      />
    </div>
    <div className="ml-4 text-sm">
      <p>
        <span className="font-bold">5.0</span> from 200+ reviews
      </p>
    </div>
  </div> */}
    </div>
  );
};

export default FixedSection;
