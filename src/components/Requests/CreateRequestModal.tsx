// components/Requests/CreateRequestModal.tsx
import {  useState } from "react";
import Modal from "@components/UI/Modal"; // assuming you have a Modal component
import useCustomQuery from "@hooks/useCustomQuery";
import useCustomMutation from "@hooks/useCustomMutation";

const CreateRequestModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({
    tenant: "",
    category: "",
    description: "",
    preferred_service_date: "",
    urgency: "low",
  });

  const { data: tenantsData } = useCustomQuery({
    queryKey: ["manager-tenants"],
    url: "/managers/manager-tenants/", // update to your actual endpoint
    enabled: isOpen,
  });

  const { data: categoriesData } = useCustomQuery({
    queryKey: ["request-categories"],
    url: "/tenants/request-categories/",
    enabled: isOpen,
  });

  const mutation = useCustomMutation({
    method: "POST",
    url: "/managers/manager-create-request/",
    successMessage: "Request created successfully!",
    onSuccess: () => {
     // Delay closing the modal so the toast can appear
  setTimeout(() => {
    onClose();
  }, 100); // 100ms is usually enough
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Maintenance Request">
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="tenant"
          required
          onChange={handleChange}
          className="w-full border rounded p-2"
          value={form.tenant}
        >


          <option value="">Select Tenant</option>
          {tenantsData?.data?.map((tenant: any) => (
            <option key={tenant.id} value={tenant.id}>
              { tenant.name_property_unit }
            </option>
          ))}
        </select>

        <select
          name="category"
          required
          onChange={handleChange}
          className="w-full border rounded p-2"
          value={form.category}
        >
          <option value="">Select Category</option>
          {categoriesData?.data?.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded p-2"
          rows={4}
          required
          onChange={handleChange}
        />

        <input
          type="date"
          name="preferred_service_date"
          value={form.preferred_service_date}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <select
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default CreateRequestModal;
