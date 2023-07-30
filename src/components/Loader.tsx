interface LoaderProps {
	children?: React.ReactNode;
}

const Loader = ({ children = 'Loading...' }: LoaderProps) => {
	return <p className="loader">{children}</p>;
};

export default Loader;
