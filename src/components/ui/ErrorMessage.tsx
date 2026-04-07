interface Props { message: string; }
const ErrorMessage = ({ message }: Props) => (
  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
    {message}
  </div>
);
export default ErrorMessage;