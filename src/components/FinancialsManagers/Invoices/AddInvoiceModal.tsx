import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "@components/UI/Modal";
import Button from "@components/UI/Button";
import useCustomMutation from "@hooks/useCustomMutation";
import useCustomQuery from "@hooks/useCustomQuery";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { Fragment } from "react/jsx-runtime";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

interface IProperty {
  id: number;
  name: string;
}

interface FormData {
  invoice_type: 'rent' | 'service' | 'maintenance' | 'utility' | 'other';
  property: number;
  bill_to_name: string;
  bill_to_email: string;
  bill_to_phone: string;
  bill_to_address: string;
  title: string;
  description: string;
  notes: string;
  subtotal: string;
  tax_rate: string;
  issue_date: string;
  due_date: string;
  attachment?: File | null;
}

const AddInvoiceModal: React.FC<IProps> = ({ isOpen, setIsOpen, refetch }) => {
  const [formData, setFormData] = useState<FormData>({
    invoice_type: "other",
    property: 0,
    bill_to_name: "",
    bill_to_email: "",
    bill_to_phone: "",
    bill_to_address: "",
    title: "",
    description: "",
    notes: "",
    subtotal: "",
    tax_rate: "16", // Default VAT rate in Kenya
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    attachment: null,
  });

  const { data: propertiesResponse } = useCustomQuery({
    queryKey: ["properties"],
    url: "/owners/properties",
  });

  const properties = propertiesResponse?.data || [];

  const { mutate: createInvoice, isPending } = useCustomMutation({
    url: "tenants/invoices/",
    method: "POST",
    onSuccess: () => {
      toast.success("Invoice created successfully!");
      setIsOpen(false);
      refetch();
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create invoice");
    },
  });

  const resetForm = () => {
    setFormData({
      invoice_type: "other",
      property: 0,
      bill_to_name: "",
      bill_to_email: "",
      bill_to_phone: "",
      bill_to_address: "",
      title: "",
      description: "",
      notes: "",
      subtotal: "",
      tax_rate: "16",
      issue_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      attachment: null,
    });
  };

  const handleInputChange = (field: keyof FormData, value: string | number | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Calculate due date automatically when issue date changes
    if (field === 'issue_date' && typeof value === 'string') {
      const issueDate = new Date(value);
      const dueDate = new Date(issueDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days later
      setFormData(prev => ({
        ...prev,
        due_date: dueDate.toISOString().split('T')[0]
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      attachment: file
    }));
  };

  const calculateTotals = () => {
    const subtotal = parseFloat(formData.subtotal) || 0;
    const taxRate = parseFloat(formData.tax_rate) || 0;
    const taxAmount = (subtotal * taxRate / 100);
    const totalAmount = subtotal + taxAmount;
    
    return {
      subtotal,
      taxRate,
      taxAmount,
      totalAmount
    };
  };

  const { subtotal, taxRate, taxAmount, totalAmount } = calculateTotals();

  const handleSubmit = () => {
    // Basic validation
    if (!formData.property || !formData.bill_to_name || !formData.title || !formData.subtotal) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.bill_to_address) {
      toast.error("Bill To Address is required");
      return;
    }

    if (parseFloat(formData.subtotal) <= 0) {
      toast.error("Subtotal must be greater than 0");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();
    
    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'attachment' && value instanceof File) {
        submitData.append(key, value);
      } else if (key !== 'attachment' && value !== null && value !== undefined) {
        submitData.append(key, value.toString());
      }
    });

    createInvoice(submitData);
  };

  const invoiceTypes = [
    { value: "rent", label: "Rent Invoice" },
    { value: "service", label: "Service Invoice" },
    { value: "maintenance", label: "Maintenance Invoice" },
    { value: "utility", label: "Utility Invoice" },
    { value: "other", label: "Other" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create New Invoice">
      <div className="space-y-4 max-h-[80vh] overflow-y-auto">
        {/* Basic Information */}


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Type *
            </label>
            <select
              value={formData.invoice_type}
              onChange={(e) => handleInputChange("invoice_type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {invoiceTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property *
            </label>
            <Listbox
              as="div"
              value={formData.property}
              onChange={(value) => setFormData({ ...formData, property: value })}
            >
              {({ open }) => (
                <div className="relative">
                  <ListboxButton className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span>
                      {properties.find((property: IProperty) => property.id === formData.property)?.name || "Select Property"}
                    </span>
                    <HiChevronDown
                      className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </ListboxButton>
                  <ListboxOptions
                    static
                    className={`absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-md max-h-60 overflow-auto transform transition-all duration-300 ${
                      open
                        ? "opacity-100 scale-y-100 translate-y-0"
                        : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                    } origin-top`}
                  >
                    {properties.map((property: IProperty) => (
                      <ListboxOption
                        key={property.id}
                        value={property.id}
                        as={Fragment}
                        disabled={false}
                      >
                        {({ selected, disabled }) => (
                          <li
                            className={`cursor-pointer select-none p-2 list-none transition-colors hover:bg-blue-50 ${
                              selected ? "bg-blue-500 text-white" : "text-gray-700"
                            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            {property.name}
                          </li>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              )}
            </Listbox>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date *
            </label>
            <input
              type="date"
              value={formData.issue_date}
              onChange={(e) => handleInputChange("issue_date", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => handleInputChange("due_date", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Bill To Information */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Bill To Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                value={formData.bill_to_name}
                onChange={(e) => handleInputChange("bill_to_name", e.target.value)}
                placeholder="Enter client name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.bill_to_email}
                onChange={(e) => handleInputChange("bill_to_email", e.target.value)}
                placeholder="client@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.bill_to_phone}
                onChange={(e) => handleInputChange("bill_to_phone", e.target.value)}
                placeholder="+254 700 000 000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                value={formData.bill_to_address}
                onChange={(e) => handleInputChange("bill_to_address", e.target.value)}
                placeholder="Enter client address"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Invoice Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., 'Monthly Rent - January 2025'"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Detailed description of services/products"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Additional notes for the client"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Financial Details */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Financial Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtotal (KSh) *
              </label>
              <input
                type="number"
                value={formData.subtotal}
                onChange={(e) => handleInputChange("subtotal", e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                value={formData.tax_rate}
                onChange={(e) => handleInputChange("tax_rate", e.target.value)}
                placeholder="16"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Calculated Totals */}
          {subtotal > 0 && (
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Calculated Totals</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>KSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({taxRate}%):</span>
                  <span>KSh {taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-1">
                  <span>Total Amount:</span>
                  <span>KSh {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Attachment */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Attachment (Optional)</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Document
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: PDF, Images, Word documents (Max 5MB)
            </p>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            label="Cancel"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          />
          <Button
            label={isPending ? "Creating..." : "Create Invoice"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddInvoiceModal;
