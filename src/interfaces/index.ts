export interface ILoginInput {
  placeholder: string;
  name: "email" | "password";
  validation: {
    required: boolean;
    pattern?: RegExp;
    minLength?: number;
  };
}
