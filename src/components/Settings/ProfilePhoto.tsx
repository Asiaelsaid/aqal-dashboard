const ProfilePhoto: React.FC<{
  src: string;
  onUpdate: (file: File) => void;
  onDelete: () => void;
}> = ({ src, onUpdate, onDelete }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onUpdate(event.target.files[0]);
    }
  };
  return (
    <div className="flex items-center gap-4 mb-6 justify-between">
      <img
        src={src}
        alt="Profile"
        className="w-16 h-16 rounded-full border border-gray-300 object-cover"
      />
      <div>
        <button
          onClick={onDelete}
          className="text-gray-500 hover:text-gray-600 text-sm font-semibold "
        >
          Delete
        </button>
        <label
          htmlFor="file-upload"
          className="text-purple-600 hover:text-purple-700 text-sm font-semibold ml-4 cursor-pointer"
        >
          Update
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
export default ProfilePhoto;
