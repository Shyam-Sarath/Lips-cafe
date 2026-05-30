export default function LipsIcon({ className = "w-6 h-6", strokeWidth = 1.5, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    >
      {/* Top Lip and Bottom Lip Outline */}
      <path
        d="M2.5 12C4.5 9.5 7 8.5 9.5 9C10.5 9.2 11.5 10.5 12 11C12.5 10.5 13.5 9.2 14.5 9C17 8.5 19.5 9.5 21.5 12C19.5 14.8 16 17 12 17C8 17 4.5 14.8 2.5 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner mouth separation line (crease) */}
      <path
        d="M5.5 11.8C7.5 12.8 9.5 13.2 12 13.2C14.5 13.2 16.5 12.8 18.5 11.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
