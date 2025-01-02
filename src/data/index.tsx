import { IContactCardProps, ILoginInput } from "@interfaces";
import { FaRegComments } from "react-icons/fa6";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { TfiCommentsSmiley } from "react-icons/tfi";
export const LoginFormData: ILoginInput[] = [
  {
    placeholder: "Enter your email",
    type: "email",
    name: "email",
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    placeholder: "Enter your password",
    type: "password",
    name: "password",
    validation: {
      required: true,
      minLength: 8,
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
  },
];
export const ContactDetails: IContactCardProps[] = [
  {
    icon: <TfiCommentsSmiley className="text-2xl font-extrabold "/>,
    title: "Chat to sales",
    description: "Speak to our friendly team.",
    linkText: "Sales@aqal.com",
    linkHref: "mailto:Sales@aqal.com",
  },
  {
    icon: <FaRegComments className="text-2xl font-extrabold"/>,
    title: "Chat to support",
    description: "We’re here to help.",
    linkText: "support@aqal.com",
    linkHref: "mailto:support@aqal.com",
  },
  {
    icon: <FiMapPin className="text-2xl font-extrabold"/>,
    title: "Visit us",
    description: "Visit our office HQ.",
    linkText: "100 Smith Street, Collingwood VIC 3066 KE",
  },
  {
    icon: <FiPhone className="text-2xl font-extrabold"/>,
    title: "Call us",
    description: "Mon-Fri from 8am to 5pm.",
    linkText: "+255 (555) 000-0000",
    linkHref: "tel:+255555000000",
  },
];
