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
  consumer_key?: string;
  secret_key?: string;
  paybill?: string;
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
  expense_type: string; 
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

// Invoice interface for the invoice system
export interface Invoice {
  id: number;
  invoice_number: string;
  invoice_type: 'rent' | 'service' | 'maintenance' | 'utility' | 'other';
  invoice_type_display: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  status_display: string;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  property: number;
  property_name: string;
  bill_to_name: string;
  bill_to_email?: string;
  bill_to_phone?: string;
  bill_to_address: string;
  title: string;
  description?: string;
  notes?: string;
  attachment?: string;
  created_by: number;
  created_by_name: string;
  created_at: string;
  updated_at: string;
  paid_date?: string;
  payment_method?: string;
  payment_reference?: string;
  is_overdue: boolean;
}

// Invoice Collection interface for managing batches of invoices
export interface InvoiceCollection {
  id: number;
  collection_name: string;
  description?: string;
  status: 'draft' | 'generated' | 'sent';
  invoices: number[];
  invoices_detail?: Invoice[];
  pdf_file?: string;
  created_by: number;
  created_by_name: string;
  created_at: string;
  updated_at: string;
  generated_at?: string;
  total_invoices: number;
  total_amount: number;
  invoice_types_summary?: Array<{
    invoice_type: string;
    count: number;
    total: number;
  }>;
  properties_summary?: Array<{
    property__name: string;
    property_id: number;
    count: number;
    total: number;
  }>;
}