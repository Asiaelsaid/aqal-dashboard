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