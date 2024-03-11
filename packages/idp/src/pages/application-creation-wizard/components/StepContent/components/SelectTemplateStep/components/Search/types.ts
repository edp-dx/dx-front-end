import { Dispatch, SetStateAction } from 'react';

export interface SearchProps {
	setSearch: Dispatch<SetStateAction<string>>;
}
