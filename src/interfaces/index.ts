import { ReactNode } from "react";

export interface PropertyData {
  name: string;
  property_type: number;
  description: string;
  conditions: number;
  location: string;
  total_units: string;
  vacant_units: string;
  sold_units: string;
  unit_types: string;
  property_level: string;
  property_manager: number;
  user: number; // property owner
  amenities: number[];
  common_areas: number[];
}
export interface ITenantData {
  tenant: number;
  property: number;
  unit_number: string;
  outstanding_payment: string;
  tims_report: string;
  lease_contract: string;
}
export interface ILoginInput {
  placeholder: string;
  type: string;
  name: "email" | "password";
  validation: {
    required: boolean;
    minLength?: number;
    pattern: RegExp;
  };
}
export interface IErrorrEsponse {
  status: number; 
  message: string;
  errors?: Record<string, string[]>; 
}
export interface IContactCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref?: string;
}
export interface IExpenseData {
  property: number;
  date: string; 
  expense_type: "maintenance" | "utilities" | "management_fees" | "other" |""; 
  amount: number; 
  description: string; 
}
export interface IContactTableProps {
  id: number,
  name: string,
  type: string,
  email: string,
  phone_number: string,
  address: string
}
// export interface Request {
//   req_code: string;
//   category: string;
//   description: string;
//   status: string;
//   urgency: string;
//   preferred_service_date: string;
// }
// export interface Tenant {
//   id: number;
//   name: string;
//   email: string;
// }
// export interface Unit {
//   id: number;
//   unit_number: string;
//   unit_level: number;
//   status: string;
//   tenant: Tenant | null;
//   requests: Request[];
// }

// export interface Property {
//   property_name: string;
//   location: string;
//   total_units: number;
//   units: Unit[];
// }
export interface Tenant {
  id: number;
  name: string;
  email: string;
}

export interface Request {
  id:number
  req_code: string;
  category: string;
  description: string;
  status: string;
  urgency: string;
  preferred_service_date: string;
}

export interface Unit {
  id: number;
  unit_number: string;
  unit_level: number;
  status: string;
  tenant: Tenant | null;
  requests: Request[];
}

export interface Property {
  property_name: string;
  location: string;
  total_units: number;
  units: Unit[];
}