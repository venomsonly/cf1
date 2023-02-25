export default function InputField({label, type, placeholder, onChange, className}) {
  return (
    <div className="w-full">
      <p>{label}</p>
      <input
        className={`loginFormField mb-4 ${className}`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
