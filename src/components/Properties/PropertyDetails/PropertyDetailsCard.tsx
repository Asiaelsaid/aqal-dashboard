interface IProps {
    label: string;
    value: string;
    badgeColor?: 'blue' | 'green' | 'yellow' | 'gray' | 'purple';
}

const PropertyDetailsCard: React.FC<IProps> = ({ label, value, badgeColor }) => {
    const getBadgeClasses = () => {
        switch (badgeColor) {
            case 'blue':
                return 'bg-blue-100 text-blue-800';
            case 'green':
                return 'bg-green-100 text-green-800';
            case 'yellow':
                return 'bg-yellow-100 text-yellow-800';
            case 'gray':
                return 'bg-gray-100 text-gray-800';
            case 'purple':
                return 'bg-purple-100 text-purple-800';
            default:
                return '';
        }
    };

    return (
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            {badgeColor ? (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeClasses()}`}>
                    {value || "N/A"}
                </span>
            ) : (
                <p className="text-gray-700 font-semibold">{value || "N/A"}</p>
            )}
        </div>
    );
};

export default PropertyDetailsCard;