const Button: React.FC<{ label: string; variant?: "primary" | "secondary"; onClick?: () => void }> = ({
    label,
    variant = "primary",
    onClick,
  }) => {
    const baseStyle = "py-2 px-4 text-sm font-medium rounded-md focus:outline-none";
    const variantStyles =
      variant === "primary"
        ? "bg-purple-600 text-white hover:bg-purple-700"
        : "bg-whit text-gray-700 hover:bg-gray-100 border";
    return (
      <button className={`${baseStyle} ${variantStyles}`} onClick={onClick}>
        {label}
      </button>
    );
  };
export default Button  