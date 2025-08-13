import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "@components/UI/Modal";
import useCustomMutation from "@hooks/useCustomMutation";

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInvoiceIds: number[];
  onSuccess: () => void;
}

interface FormData {
  collection_name: string;
  description: string;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
  selectedInvoiceIds,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    collection_name: "",
    description: "",
  });

  const { mutate: createCollection, isPending } = useCustomMutation({
    url: "tenants/invoice-collections/",
    method: "POST",
    onSuccess: () => {
      toast.success("Invoice collection created and PDF generated successfully!");
      onSuccess();
      onClose();
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create collection");
    },
  });

  const resetForm = () => {
    setFormData({
      collection_name: "",
      description: "",
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.collection_name.trim()) {
      toast.error("Please enter a collection name");
      return;
    }

    if (selectedInvoiceIds.length === 0) {
      toast.error("No invoices selected");
      return;
    }

    const submitData = {
      collection_name: formData.collection_name.trim(),
      description: formData.description.trim(),
      invoice_ids: selectedInvoiceIds,
    };

    createCollection(submitData);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Invoice Collection">
      <div className="space-y-6">
        {/* Collection Info */}
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-blue-800">
            You are creating a collection with <strong>{selectedInvoiceIds.length}</strong> selected invoice{selectedInvoiceIds.length !== 1 ? 's' : ''}.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Name *
            </label>
            <input
              type="text"
              value={formData.collection_name}
              onChange={(e) => handleInputChange("collection_name", e.target.value)}
              placeholder="e.g., Monthly Invoices - January 2025"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={255}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of this collection..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={handleClose}
            disabled={isPending}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending || !formData.collection_name.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating..." : "Create Collection"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCollectionModal;
