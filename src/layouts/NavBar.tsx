import React from 'react';

import Logo from '../components/Logo';

interface NavBarProps {
	children: React.ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
	return (
		<nav className="nav-bar">
			<Logo />
			{children}
		</nav>
	);
};

export default NavBar;
