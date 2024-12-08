export interface ILoginInput {
  placeholder: string;
  type: "email" | "password";
  name: "email" | "password";
  validation: {
    required: boolean;
    pattern?: RegExp;
    minLength?: number;
  };
}
export interface IErrorrEsponse {
  error :{
    data:{
      details?:[string]
    },
  },
  message?: string
} 
