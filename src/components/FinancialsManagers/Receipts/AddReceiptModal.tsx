import { useState, useEffect } from "react";
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

interface IUnit {
  id: number;
  unit_number: string;
  property: number;
}

interface IPayment {
  id: number;
  month: string;
  amount_due: number;
  amount_paid: number;
  remaining_amount: number;
  status: string;
  due_date: string;
  payment_reference: string;
  tenant_name: string;
  display_name: string;
}

interface FormData {
  receipt_type: 'IBD' | 'OBD';
  property: number;
  unit: string;
  payment_id?: number;
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

const AddReceiptModal: React.FC<IProps> = ({ isOpen, setIsOpen, refetch }) => {
  const [formData, setFormData] = useState<FormData>({
    receipt_type: "IBD",
    property: 0,
    unit: "",
    payment_id: undefined,
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

  const { data: propertiesResponse } = useCustomQuery({
    queryKey: ["properties"],
    url: "/owners/properties",
  });

  const { data: unitsResponse } = useCustomQuery({
    queryKey: ["units", formData?.property?.toString() || "0"],
    url: `/owners/properties/${formData?.property || 0}/units/`,
    enabled: formData?.property !== null && formData?.property !== undefined && formData?.property > 0,
  });

  // Query to get unit details (includes tenant and outstanding payment)
  const { data: unitDetailResponse } = useCustomQuery({
    queryKey: ["unit-detail", formData?.unit || "0"],
    url: `/owners/units/${formData?.unit || 0}/details/`,
    enabled: formData?.unit !== "" && formData?.unit !== null && parseInt(formData?.unit) > 0,
  });

  // Query to get payments for the selected unit (for payment selection)
  const { data: paymentsResponse } = useCustomQuery({
    queryKey: ["unit-payments", formData?.unit || "0"],
    url: `/tenants/units/${formData?.unit || 0}/payments/?status=unpaid`,
    enabled: formData?.unit !== "" && formData?.unit !== null && parseInt(formData?.unit) > 0 && formData.receipt_type === 'IBD',
  });

  const properties = propertiesResponse?.data || [];
  const units = unitsResponse?.data || [];
  const unitDetail = unitDetailResponse?.data || null;
  const payments: IPayment[] = paymentsResponse?.data || [];

  // Auto-fill form when unit is selected
  useEffect(() => {
    console.log('AddReceiptModal - useEffect triggered:', {
      unit: formData.unit,
      unitDetail: unitDetail,
      receiptType: formData.receipt_type,
      unitDetailResponse: unitDetailResponse
    });
    
    if (formData.unit && unitDetail && formData.receipt_type === 'IBD') {
      console.log('AddReceiptModal - Auto-filling from unit detail:', unitDetail);
      
      // Get tenant name from tenant_details
      let tenantName = '';
      if (unitDetail.tenant_details) {
        if (unitDetail.tenant_details.full_name) {
          tenantName = unitDetail.tenant_details.full_name;
        } else if (unitDetail.tenant_details.first_name) {
          tenantName = `${unitDetail.tenant_details.first_name} ${unitDetail.tenant_details.last_name || ''}`.trim();
        }
      }
      
      // Get rent / service charge / outstanding payment
      let rent = '';
      let serviceCharge = '';
      let outstandingAmount = '';
      if (unitDetail.rent !== undefined && unitDetail.rent !== null) {
        rent = unitDetail.rent.toString();
      }
      if (unitDetail.service_charge !== undefined && unitDetail.service_charge !== null) {
        serviceCharge = unitDetail.service_charge.toString();
      }
      if (unitDetail.outstanding_payment) {
        outstandingAmount = unitDetail.outstanding_payment.toString();
      } else if (rent || serviceCharge) {
        // Fallback compute if outstanding_payment is not present in response
        const r = parseFloat(rent || '0');
        const s = parseFloat(serviceCharge || '0');
        outstandingAmount = (r + s).toFixed(2);
      }
      
      console.log('AddReceiptModal - Extracted data:', { tenantName, outstandingAmount });
      
      // Auto-fill received_from, amount from unit data
      setFormData(prev => ({
        ...prev,
        received_from: tenantName || prev.received_from,
        amount: outstandingAmount || prev.amount,
        purpose: "Rent Payment", // Default purpose for IBD receipts
      }));

      if (tenantName || outstandingAmount) {
        toast.info("Auto-filled receipt details from unit information");
      }
    }
  }, [formData.unit, unitDetail, formData.receipt_type, unitDetailResponse]);

  const { mutate: createReceipt, isPending } = useCustomMutation({
    url: "tenants/receipts/",
    method: "POST",
    onSuccess: () => {
      toast.success("Receipt created successfully!");
      setIsOpen(false);
      refetch();
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create receipt");
    },
  });

  const resetForm = () => {
    setFormData({
      receipt_type: "IBD",
      property: 0,
      unit: "",
      payment_id: undefined,
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
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear unit, payment, and auto-filled fields when property changes
    if (field === 'property') {
      setFormData(prev => ({
        ...prev,
        property: value as number,
        unit: "", // Clear unit when property changes
        payment_id: undefined, // Clear payment selection
        received_from: "", // Clear auto-filled fields
        amount: "",
        payment_reference: "",
        purpose: "",
      }));
    }

    // Clear payment and auto-filled fields when unit changes (they will be re-filled by useEffect)
    if (field === 'unit') {
      setFormData(prev => ({
        ...prev,
        unit: value as string,
        payment_id: undefined, // Clear payment selection
        received_from: "", // Clear auto-filled fields
        amount: "",
        payment_reference: "",
        purpose: "",
      }));
    }

    // Auto-fill from selected payment
    if (field === 'payment_id' && value && formData.receipt_type === 'IBD') {
      const selectedPayment = payments.find(p => p.id === value);
      if (selectedPayment) {
        setFormData(prev => ({
          ...prev,
          payment_id: value as number,
          received_from: selectedPayment.tenant_name,
          amount: selectedPayment.remaining_amount.toString(),
          purpose: `${selectedPayment.month} Rent Payment`,
        }));
      }
    }

    // Auto-populate fields when payment_reference is entered (simulated)
    // Note: In a real implementation, you'd make an API call to validate and fetch payment details
    if (field === 'payment_reference' && value && typeof value === 'string') {
      // This is where you could add logic to fetch payment details
      // For now, we'll show a toast that the backend will handle auto-population
      if (value.trim()) {
        toast.info("If this payment reference exists, fields will be auto-populated on submission.");
      }
    }
  };

  const handleSubmit = () => {
    // Basic required fields validation
    if (!formData.amount || !formData.purpose) {
      toast.error("Please fill in all required fields (Amount and Purpose)");
      return;
    }

    // Validation based on receipt type
    if (formData.receipt_type === 'IBD') {
      // For inbound receipts, unit is required UNLESS payment_reference is provided
      if (!formData.payment_reference && !formData.unit) {
        toast.error("Unit is required for inbound receipts (unless payment reference is provided)");
        return;
      }
      // received_from is required UNLESS payment_reference is provided
      if (!formData.payment_reference && !formData.received_from) {
        toast.error("'Received From' is required for inbound receipts (unless payment reference is provided)");
        return;
      }
      // Property is required unless payment_reference is provided
      if (!formData.payment_reference && !formData.property) {
        toast.error("Property is required (unless payment reference is provided)");
        return;
      }
    } 

    if (formData.receipt_type === 'OBD') {
      if (!formData.paid_to) {
        toast.error("'Paid To' is required for outbound receipts");
        return;
      }
      // For outbound receipts, property is always required, but unit is optional
      if (!formData.property) {
        toast.error("Property is required for outbound receipts");
        return;
      }
    }

    createReceipt({
      ...formData,
      amount: parseFloat(formData.amount),
      property: formData.property || undefined, // Let backend handle if payment_reference is used
      unit: formData.unit && formData.unit !== "" ? parseInt(formData.unit) : null,
      payment_id: formData.payment_id || undefined, // Include payment_id for specific payment selection
    });
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

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create New Receipt">
      <div className="space-y-4 max-h-[80vh] overflow-auto pr-2">
        {/* Helpful information */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-800">
            <strong>💡 Quick Tip:</strong> For inbound receipts, selecting a property and unit will automatically fill in tenant name, outstanding amount, and payment reference (if available).
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
              Property {!formData.payment_reference && '*'}
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit {formData.receipt_type === 'IBD' && !formData.payment_reference && '*'}
              {formData.receipt_type === 'OBD' && <span className="text-sm text-gray-500">(Optional for outbound receipts)</span>}
            </label>
            {formData.property && units.length > 0 ? (
              <Listbox
                as="div"
                value={formData.unit}
                onChange={(value) => handleInputChange("unit", value)}
              >
                {({ open }) => (
                  <div className="relative">
                    <ListboxButton className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <span>
                        {units.find((unit: IUnit) => unit.id.toString() === formData.unit)?.unit_number || "Select Unit"}
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
                      {units.map((unit: IUnit) => (
                        <ListboxOption
                          key={unit.id}
                          value={unit.id.toString()}
                          as={Fragment}
                          disabled={false}
                        >
                          {({ selected, disabled }) => (
                            <li
                              className={`cursor-pointer select-none p-2 list-none transition-colors hover:bg-blue-50 ${
                                selected ? "bg-blue-500 text-white" : "text-gray-700"
                              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              {unit.unit_number}
                            </li>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                )}
              </Listbox>
            ) : (
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                placeholder={formData.property ? "Loading units..." : "Select property first or enter unit ID"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={formData.receipt_type === 'IBD' && !formData.payment_reference}
              />
            )}
          </div>
        </div>

        {/* Payment Selection - Only for IBD receipts with multiple payments */}
        {formData.receipt_type === 'IBD' && formData.unit && payments.length > 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Payment *
            </label>
            <Listbox
              as="div"
              value={formData.payment_id || ''}
              onChange={(value) => {
                const paymentId = parseInt(String(value));
                handleInputChange("payment_id", paymentId);
              }}
            >
              {({ open }) => (
                <div className="relative">
                  <ListboxButton className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span>
                      {formData.payment_id 
                        ? payments.find((payment: IPayment) => payment.id === formData.payment_id)?.display_name || "Select Payment"
                        : "Select Payment"}
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
                    {payments.map((payment: IPayment) => (
                      <ListboxOption
                        key={payment.id}
                        value={payment.id.toString()}
                        as={Fragment}
                        disabled={false}
                      >
                        {({ selected, disabled }) => (
                          <li
                            className={`cursor-pointer select-none p-2 list-none transition-colors hover:bg-blue-50 ${
                              selected ? "bg-blue-500 text-white" : "text-gray-700"
                            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <div>
                              <div className="font-medium">{payment.display_name}</div>
                              <div className="text-xs opacity-75">
                                Status: {payment.status} | Due: {payment.due_date}
                              </div>
                            </div>
                          </li>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              )}
            </Listbox>
            <p className="text-xs text-blue-600 mt-1">
              💡 Multiple payments found for this unit. Select which payment this receipt should be applied to.
            </p>
          </div>
        )}

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
            {/* Show rent/service charge breakdown when available */}
            {unitDetail && (unitDetail.rent || unitDetail.service_charge) && (
              <p className="text-xs text-gray-500 mt-1">
                Rent: {unitDetail.rent ?? '0.00'} | Service charge: {unitDetail.service_charge ?? '0.00'}
              </p>
            )}
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
              Payment Reference
            </label>
            <input
              type="text"
              value={formData.payment_reference}
              onChange={(e) => handleInputChange("payment_reference", e.target.value)}
              placeholder="Transaction ID, Cheque No, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.receipt_type === 'IBD' && (
              <p className="text-xs text-gray-500 mt-1">
                💡 Tip: For inbound receipts, enter a payment reference to auto-populate property, unit, and payer details
              </p>
            )}
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
            label={isPending ? "Creating..." : "Create Receipt"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddReceiptModal;