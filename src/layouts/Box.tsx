import React, { useState } from 'react';

interface BoxProps {
	children: React.ReactNode;
}

const Box = ({ children }: BoxProps) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen((open) => !open)}
			>
				{isOpen ? '–' : '+'}
			</button>

			{isOpen && children}
		</div>
	);
};

export default Box;
