import { FaCheckCircle } from "react-icons/fa";
import { Link, Element } from "react-scroll";
import ImageBackground from "../assets/images/property_home.jpg";

import ImageSide from "../assets/images/property_side.jpg";

import Icon from "../assets/icons/property.png";

const Landing = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <Element name="home">
        <div className="relative h-screen bg-cover bg-center" style={{ 
          backgroundImage: `url(${ImageBackground})`, }}
          
          >


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
  <Link to="contact" smooth={true} duration={500} className="text-white hover:underline cursor-pointer">Contact</Link>
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
            src={ImageSide}
            alt="modern house"
            className="w-full rounded-lg shadow-lg object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6">Who We Are and What You Get From Us</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Property Maintenance and Reporting</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Tenant Management</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Financial Management</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Technology Management</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Marketing, Leasing and Letting Services</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Vendor and Service Provider Management</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-600 mr-2" /> Detailed Reporting and Record-keeping</li>
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
              <img src={Icon} alt="Automated Rent Collection" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Automated Rent Collection</h3>
              <p className="text-gray-600">Simplify payments with automated rent collection and reminders. Reduce late payments and manage finances effortlessly.</p>
            </div>
            <div>
              <img src={Icon} alt="Tenant Communication" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Tenant Communication</h3>
              <p className="text-gray-600">Stay connected with your tenants through integrated messaging. Easily handle inquiries, send reminders, and more.</p>
            </div>
            <div>
              <img src={Icon} alt="Maintenance Tracking" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Maintenance Tracking</h3>
              <p className="text-gray-600">Manage and track maintenance requests seamlessly. Keep your property in top condition with organized and timely repairs.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center mt-12">
            <div>
              <img src={Icon} alt="Multi-Property Management" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Multi-Property Management</h3>
              <p className="text-gray-600">Whether you own one property or many, manage them all from a single platform. Scale your operations without adding complexity.</p>
            </div>
            <div>
              <img src={Icon} alt="Detailed Reporting" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Detailed Reporting</h3>
              <p className="text-gray-600">Generate comprehensive reports on your properties’ performance. Make informed decisions with data-driven insights.</p>
            </div>
            <div>
              <img src={Icon} alt="Centralized Dashboard" className="mx-auto mb-4 h-12" />
              <h3 className="text-xl font-semibold mb-2">Centralized Dashboard</h3>
              <p className="text-gray-600">Get an overview of all your properties, tenants, and tasks in one place. Quickly access the tools you need to manage efficiently.</p>
            </div>
          </div>
        </div>
      </Element>

      {/* About Us/Contact Section */}
      <Element name="contact">
        <div className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Offices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Kenya Office */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3">KENYA</h3>
                <p className="text-gray-700 mb-2">1st Floor, Zahid Business Park,</p>
                <p className="text-gray-700 mb-4">Nairobi, Kenya</p>
                <p className="font-medium">+254 790 413 766</p>
              </div>
              
              {/* Tanzania Office */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3">TANZANIA</h3>
                <p className="text-gray-700 mb-2">8th Floor, Millennium Towers 1,</p>
                <p className="text-gray-700 mb-4">Dar Es Salaam, Tanzania</p>
                <p className="font-medium">+255 752 141 831</p>
              </div>
              
              {/* Rwanda Office */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3">RWANDA</h3>
                <p className="text-gray-700 mb-2">Ground Floor, KK 188 Street,</p>
                <p className="text-gray-700 mb-2">Kicukiro, Kigali, Rwanda</p>
                <p className="font-medium">+250 786 870 674</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Have questions about our property management services? Our team is ready to assist you.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </Element>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Aqal</h3>
              <p className="text-gray-400 mb-4">Simplifying property management across East Africa.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="home" smooth={true} duration={500} className="text-gray-400 hover:text-white cursor-pointer">Home</Link></li>
                <li><Link to="about" smooth={true} duration={500} className="text-gray-400 hover:text-white cursor-pointer">About Us</Link></li>
                <li><Link to="services" smooth={true} duration={500} className="text-gray-400 hover:text-white cursor-pointer">Services</Link></li>
                <li><Link to="contact" smooth={true} duration={500} className="text-gray-400 hover:text-white cursor-pointer">Contact</Link></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-400 hover:text-white cursor-pointer">Property Management</span></li>
                <li><span className="text-gray-400 hover:text-white cursor-pointer">Tenant Screening</span></li>
                <li><span className="text-gray-400 hover:text-white cursor-pointer">Rent Collection</span></li>
                <li><span className="text-gray-400 hover:text-white cursor-pointer">Maintenance</span></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-gray-400">info@aqal.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-gray-400">+254 790 413 766</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Aqal. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
