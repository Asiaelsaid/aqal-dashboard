import { IContactCardProps } from "@interfaces";

const ContactCard: React.FC<IContactCardProps> = ({
  icon,
  title,
  description,
  linkText,
  linkHref,
}) => {
  return (
    <div className="flex flex-col items-start p-6 bg-gray-100 rounded-xl shadow-md">
      <div className="flex items-center justify-center w-11 h-11 mb-12 text-white bg-hoverColor rounded-md">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mb-2 text-gray-600">{description}</p>
      <a
        href={linkHref}
        className="text-purple-700 font-semibold  hover:text-purple-800"
        target={linkHref?.startsWith("http") ? "_blank" : undefined}
        rel={linkHref?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {linkText}
      </a>
    </div>
  );
};

export default ContactCard;
