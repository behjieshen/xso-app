export default function OverviewStats({ data, title, subtitle, bgClass }) {
  // Generic component for each overview stat
  return (
    <li className="relative col-span-1 flex shadow-sm rounded-md">
      <div
        className={`flex-shrink-0 flex items-center justify-center w-16 text-white text-base font-medium rounded-l-md ${
          bgClass ? bgClass : "bg-gray-600"
        }`}
      >
        {data}
      </div>
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-base truncate">
          <span className="text-gray-900 font-medium hover:text-gray-600">
            {title}
          </span>
          <p className="text-gray-500 text-xs">{subtitle}</p>
        </div>
      </div>
    </li>
  );
}
