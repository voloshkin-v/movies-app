interface ErrorMessageProps {
	message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
	return <p className="error">{message}</p>;
};

export default ErrorMessage;
