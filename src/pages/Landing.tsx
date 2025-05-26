import { FaCheckCircle } from "react-icons/fa";
import { Link, Element } from "react-scroll";

const Landing = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <Element name="home">
        <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('./src/assets/images/property_home.jpg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Find your perfect Home</h1>
              <p className="mb-6 text-lg">Your dream house is just a click away</p>
              <button className="bg-white text-black px-6 py-3 font-semibold rounded shadow hover:bg-gray-200 transition">
                Get Started
              </button>
            </div>
          </div>

          <div className="absolute top-6 left-20 right-20 flex justify-between items-center">
            {/* Company Name */}
            <div className="text-white text-2xl font-bold">
              Aqal
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6 items-center">
              <Link to="home" smooth={true} duration={500} className="text-white hover:underline cursor-pointer">Home</Link>
              <Link to="about" smooth={true} duration={500} className="text-white hover:underline cursor-pointer">About Us</Link>
              <Link to="services" smooth={true} duration={500} className="text-white hover:underline cursor-pointer">Services</Link>
              <a href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
                Login
              </a>
            </div>
          </div>
        </div>
      </Element>

      {/* Search Bar Section */}
      <div className="bg-white shadow-lg rounded-lg -mt-20 mx-auto max-w-5xl p-6 relative z-10">
        <div className="grid grid-cols-4 gap-4">
          <input className="border px-4 py-2 rounded" placeholder="Location" />
          <select className="border px-4 py-2 rounded">
            <option>Type</option>
            <option>House</option>
            <option>Apartment</option>
          </select>
          <select className="border px-4 py-2 rounded">
            <option>Price Range</option>
            <option>$500 - $1000</option>
            <option>$1000 - $5000</option>
          </select>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Search</button>
        </div>
      </div>

      {/* Info Section */}
      <Element name="about">
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
          <img
            src="./src/assets/images/property_side.jpg"
            alt="modern house"
            className="w-full rounded-lg shadow-lg object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6">Who We Are and What You Get From Us</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Best prices on the market</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Over 20 experienced agents</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Trusted property</li>
            </ul>
          </div>
        </div>
      </Element>

      {/* Features Section */}
      <Element name="services">
        <div className="bg-gray-50 py-16 px-6 mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to Simplify Your Property Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
            <div>
              <img src="./src/assets/icons/rent-collection.png" alt="Automated Rent Collection" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Automated Rent Collection</h3>
              <p className="text-gray-600">Simplify payments with automated rent collection and reminders. Reduce late payments and manage finances effortlessly.</p>
            </div>
            <div>
              <img src="./src/assets/icons/tenant-communication.png" alt="Tenant Communication" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Tenant Communication</h3>
              <p className="text-gray-600">Stay connected with your tenants through integrated messaging. Easily handle inquiries, send reminders, and more.</p>
            </div>
            <div>
              <img src="./src/assets/icons/maintenance-tracking.png" alt="Maintenance Tracking" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Maintenance Tracking</h3>
              <p className="text-gray-600">Manage and track maintenance requests seamlessly. Keep your property in top condition with organized and timely repairs.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center mt-12">
            <div>
              <img src="./src/assets/icons/multi-property.png" alt="Multi-Property Management" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Multi-Property Management</h3>
              <p className="text-gray-600">Whether you own one property or many, manage them all from a single platform. Scale your operations without adding complexity.</p>
            </div>
            <div>
              <img src="./src/assets/icons/reporting.png" alt="Detailed Reporting" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Detailed Reporting</h3>
              <p className="text-gray-600">Generate comprehensive reports on your properties’ performance. Make informed decisions with data-driven insights.</p>
            </div>
            <div>
              <img src="./src/assets/icons/dashboard.png" alt="Centralized Dashboard" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Centralized Dashboard</h3>
              <p className="text-gray-600">Get an overview of all your properties, tenants, and tasks in one place. Quickly access the tools you need to manage efficiently.</p>
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
};

export default Landing;
