import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "@components/UI/Modal";
import Button from "@components/UI/Button";
import useCustomMutation from "@hooks/useCustomMutation";
import useCustomQuery from "@hooks/useCustomQuery";

interface Receipt {
  id: string;
  receipt_number: string;
  receipt_type: 'IBD' | 'OBD';
  receipt_type_display: string;
  date: string;
  amount: number;
  payment_method: string;
  payment_method_display: string;
  payment_reference?: string;
  property: number;
  property_name: string;
  unit?: number;
  unit_number?: string;
  received_from?: string;
  paid_to?: string;
  purpose: string;
  description?: string;
  contact_phone?: string;
  contact_address?: string;
  created_by: number;
  created_by_name: string;
  created_at: string;
  updated_at: string;
}

interface IProperty {
  id: number;
  name: string;
}

interface IUnit {
  id: number;
  unit_number: string;
  property: number;
}

interface FormData {
  receipt_type: 'IBD' | 'OBD';
  property: number;
  unit: string;
  received_from: string;
  paid_to: string;
  amount: string;
  payment_method: string;
  payment_reference: string;
  purpose: string;
  description: string;
  contact_phone: string;
  contact_address: string;
  date: string;
}

interface EditReceiptModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  receipt: Receipt | null;
  refetch: () => void;
}

const EditReceiptModal: React.FC<EditReceiptModalProps> = ({ 
  isOpen, 
  setIsOpen, 
  receipt, 
  refetch 
}) => {
  const [formData, setFormData] = useState<FormData>({
    receipt_type: "IBD",
    property: 0,
    unit: "",
    received_from: "",
    paid_to: "",
    amount: "",
    payment_method: "cash",
    payment_reference: "",
    purpose: "",
    description: "",
    contact_phone: "",
    contact_address: "",
    date: new Date().toISOString().split('T')[0],
  });

  // Track if we're in initialization mode to prevent auto-selection from overriding user changes
  const [isInitializing, setIsInitializing] = useState(false);

  const { data: propertiesResponse } = useCustomQuery({
    queryKey: ["properties"],
    url: "/owners/properties",
  });

  const { data: unitsResponse } = useCustomQuery({
    queryKey: ["units", receipt?.property?.toString() || "0"],
    url: `/owners/properties/${receipt?.property || 0}/units/`,
    enabled: receipt?.property !== null && receipt?.property !== undefined && receipt?.property > 0,
  });

  const properties = propertiesResponse?.data || [];
  const units = unitsResponse?.data || [];

  const { mutate: updateReceipt, isPending } = useCustomMutation({
    url: `tenants/receipts/${receipt?.id || 0}/`,
    method: "PUT",
    onSuccess: () => {
      toast.success("Receipt updated successfully! Payment has been recalculated.");
      setIsOpen(false);
      refetch();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update receipt");
    },
  });

  // Initialize form data when receipt changes
  useEffect(() => {
    if (receipt && isOpen) {
      console.log('EditReceiptModal - Initializing form data with receipt:', {
        property: receipt.property,
        unit: receipt.unit,
        property_name: receipt.property_name,
        unit_number: receipt.unit_number
      });
      
      setIsInitializing(true);
      
      setFormData({
        receipt_type: receipt.receipt_type,
        property: receipt.property || 0,
        unit: receipt.unit ? receipt.unit.toString() : "",
        received_from: receipt.received_from || "",
        paid_to: receipt.paid_to || "",
        amount: receipt.amount ? receipt.amount.toString() : "",
        payment_method: receipt.payment_method,
        payment_reference: receipt.payment_reference || "",
        purpose: receipt.purpose,
        description: receipt.description || "",
        contact_phone: receipt.contact_phone || "",
        contact_address: receipt.contact_address || "",
        date: receipt.date,
      });
      
      // Allow some time for the form to initialize before allowing user changes
      setTimeout(() => setIsInitializing(false), 500);
    }
  }, [receipt, isOpen]);

  // Reset form data when modal closes
  useEffect(() => {
    if (!isOpen) {
      console.log('EditReceiptModal - Modal closed, resetting form');
      setIsInitializing(false);
      setFormData({
        receipt_type: "IBD",
        property: 0,
        unit: "",
        received_from: "",
        paid_to: "",
        amount: "",
        payment_method: "cash",
        payment_reference: "",
        purpose: "",
        description: "",
        contact_phone: "",
        contact_address: "",
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [isOpen]);

  // Debug: Log form data and units availability
  useEffect(() => {
    if (isOpen) {
      console.log('EditReceiptModal - Form data changed:', {
        property: formData?.property,
        unit: formData?.unit,
        unitsLoaded: units.length,
        unitsData: units
      });
    }
  }, [formData?.property, formData?.unit, units, isOpen]);

  // Ensure unit selection is maintained after units are loaded (only during initialization)
  useEffect(() => {
    if (receipt && receipt.unit && units.length > 0 && isOpen && isInitializing) {
      const unitExists = units.find((unit: IUnit) => unit.id === receipt.unit);
      if (unitExists && formData?.unit !== receipt.unit.toString()) {
        console.log('EditReceiptModal - Re-selecting unit after units loaded during initialization:', receipt.unit);
        setFormData(prev => ({
          ...prev,
          unit: receipt.unit!.toString()
        }));
      }
    }
  }, [units, receipt, isOpen, formData?.unit, isInitializing]);

  // Ensure property selection is maintained after properties are loaded (only during initialization)
  useEffect(() => {
    if (receipt && receipt.property && properties.length > 0 && isOpen && isInitializing) {
      const propertyExists = properties.find((property: IProperty) => property.id === receipt.property);
      if (propertyExists && formData?.property !== receipt.property) {
        console.log('EditReceiptModal - Re-selecting property after properties loaded during initialization:', receipt.property);
        setFormData(prev => ({
          ...prev,
          property: receipt.property
        }));
      }
    }
  }, [properties, receipt, isOpen, formData?.property, isInitializing]);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    console.log('EditReceiptModal - Field changed:', field, 'from', formData[field], 'to', value, 'isInitializing:', isInitializing);
    
    // Don't process changes during initialization
    if (isInitializing) {
      console.log('EditReceiptModal - Ignoring change during initialization');
      return;
    }
    
    // Update the field normally (no special handling needed since property/unit are read-only)
    console.log('EditReceiptModal - Updating field', field, 'to', value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!receipt) return;

    // Basic required fields validation
    if (!formData.amount || !formData.purpose) {
      toast.error("Please fill in all required fields (Amount and Purpose)");
      return;
    }

    // Validation based on receipt type (using existing values since property/unit are read-only)
    if (formData.receipt_type === 'IBD' && !formData.received_from) {
      toast.error("'Received From' is required for inbound receipts");
      return;
    }

    if (formData.receipt_type === 'OBD' && !formData.paid_to) {
      toast.error("'Paid To' is required for outbound receipts");
      return;
    }

    // Prepare update data - exclude read-only fields (property, unit, payment_reference)
    const updateData: any = {
      receipt_type: formData.receipt_type,
      received_from: formData.received_from,
      paid_to: formData.paid_to,
      amount: parseFloat(formData.amount),
      payment_method: formData.payment_method,
      purpose: formData.purpose,
      description: formData.description,
      contact_phone: formData.contact_phone,
      contact_address: formData.contact_address,
      date: formData.date,
    };

    // Remove empty optional fields to avoid sending empty strings
    if (!updateData.description) delete updateData.description;
    if (!updateData.contact_phone) delete updateData.contact_phone;
    if (!updateData.contact_address) delete updateData.contact_address;
    if (!updateData.received_from) delete updateData.received_from;
    if (!updateData.paid_to) delete updateData.paid_to;

    // Check if any values have actually changed (excluding read-only fields)
    const hasChanges = (
      formData.receipt_type !== receipt.receipt_type ||
      formData.received_from !== (receipt.received_from || "") ||
      formData.paid_to !== (receipt.paid_to || "") ||
      parseFloat(formData.amount) !== receipt.amount ||
      formData.payment_method !== receipt.payment_method ||
      formData.purpose !== receipt.purpose ||
      formData.description !== (receipt.description || "") ||
      formData.contact_phone !== (receipt.contact_phone || "") ||
      formData.contact_address !== (receipt.contact_address || "") ||
      formData.date !== receipt.date
    );

    if (!hasChanges) {
      toast.info("No changes detected");
      return;
    }

    console.log('EditReceiptModal - Submitting update data:', updateData);
    console.log('EditReceiptModal - Receipt ID:', receipt.id);
    
    updateReceipt(updateData);
  };

  const receiptTypes = [
    { value: "IBD", label: "Inbound (Money In)" },
    { value: "OBD", label: "Outbound (Money Out)" },
  ];

  const paymentMethods = [
    { value: "cash", label: "Cash" },
    { value: "mpesa", label: "M-Pesa" },
    { value: "cheque", label: "Cheque" },
    { value: "card", label: "Card" },
    { value: "bank_transfer", label: "Bank Transfer" },
  ];

  if (!receipt) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
      title={`Edit Receipt ${receipt.receipt_number}`}
    >
      <div className="space-y-4 max-h-[80vh] overflow-auto pr-2">
        {/* Warning about payment updates */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
          <p className="text-sm text-amber-800">
            <strong>⚠️ Note:</strong> Property, Unit, and Payment Reference cannot be changed when editing. Updating this receipt will automatically recalculate any related payment amounts and status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Receipt Type *
            </label>
            <select
              value={formData.receipt_type}
              onChange={(e) => handleInputChange("receipt_type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {receiptTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property (View Only)
            </label>
            <input
              type="text"
              value={properties.find((property: IProperty) => property.id === formData.property)?.name || "No Property Selected"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              disabled
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit (View Only)
            </label>
            <input
              type="text"
              value={units.find((unit: IUnit) => unit.id.toString() === formData.unit)?.unit_number || formData.unit || "No Unit Selected"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              disabled
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.receipt_type === 'IBD' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Received From {!formData.payment_reference && '*'}
              </label>
              <input
                type="text"
                value={formData.received_from}
                onChange={(e) => handleInputChange("received_from", e.target.value)}
                placeholder="Enter payer name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!formData.payment_reference}
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paid To *
              </label>
              <input
                type="text"
                value={formData.paid_to}
                onChange={(e) => handleInputChange("paid_to", e.target.value)}
                placeholder="Enter recipient name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (KSh) *
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method *
            </label>
            <select
              value={formData.payment_method}
              onChange={(e) => handleInputChange("payment_method", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {paymentMethods.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Reference (View Only)
            </label>
            <input
              type="text"
              value={formData.payment_reference || "No Reference"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              disabled
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purpose *
          </label>
          <input
            type="text"
            value={formData.purpose}
            onChange={(e) => handleInputChange("purpose", e.target.value)}
            placeholder="e.g., 'May 2025 Utility', 'Cleaning Services'"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Additional details about the receipt"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              value={formData.contact_phone}
              onChange={(e) => handleInputChange("contact_phone", e.target.value)}
              placeholder="Contact phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Address
            </label>
            <input
              type="text"
              value={formData.contact_address}
              onChange={(e) => handleInputChange("contact_address", e.target.value)}
              placeholder="Contact address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            label="Cancel"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          />
          <Button
            label={isPending ? "Updating..." : "Update Receipt"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditReceiptModal;
