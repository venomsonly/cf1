export default function Container({ children, className }) {
  return (
    <div
      className={`container max-w-screen-xl ${className}`}
    >
      {children}
    </div>
  );
}
