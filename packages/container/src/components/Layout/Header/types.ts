export interface NavLink {
	to: string;
	name: string;
	exact?: boolean;
	subMenuList?: NavLink[];
}

export interface HeaderProps {
	navLinks: NavLink[];
}
