import { ILoginInput } from "@interfaces";

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
