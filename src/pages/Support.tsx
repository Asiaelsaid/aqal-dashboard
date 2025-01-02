import ContactCard from "@components/Support/ContactCard";
import PagesHeading from "@components/UI/PagesHeading";
import { ContactDetails } from "@data/index";

const Support = () => {
  return (
    <div className="flex flex-col p-5 min-h-screen bg-gray-50">
      <PagesHeading heading="Support" />
      <div className="min-w-6xl p-12 bg-white">
        <div className="mb-20 text-left">
          <h2 className=" font-semibold text-mainColor">Contact us</h2>
          <h1 className="mt-4 mb-8 text-5xl font-bold text-gray-900">
            We’d love to hear from you
          </h1>
          <p className="text-gray-600">
            Our friendly team is always here to chat.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ContactDetails.map((contact, index) => (
            <ContactCard key={index} {...contact} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
