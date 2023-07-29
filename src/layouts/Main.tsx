import React, { useState } from 'react';

interface MainProps {
	children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
	return <main className="main">{children}</main>;
};

export default Main;
