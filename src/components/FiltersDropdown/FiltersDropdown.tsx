import { useEffect, useRef, useState } from 'react';
import styles from './FiltersDropdown.module.css';
import {
	FaSortAlphaDown,
	FaSortAlphaUp,
	FaSortNumericDown,
	FaSortNumericUp,
} from 'react-icons/fa';

import { FaSortAmountDown } from 'react-icons/fa';
import { useSearchParams } from 'react-router';

export default function FiltersDropdown() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const filterOptions = [
		{ id: 'date-desc', label: 'Newest first', icon: <FaSortNumericUp /> },
		{ id: 'date-asc', label: 'Oldest first', icon: <FaSortNumericDown /> },
		{ id: 'name-asc', label: 'Name A-Z', icon: <FaSortAlphaDown /> },
		{ id: 'name-desc', label: 'Name Z-A', icon: <FaSortAlphaUp /> },
	];

	function handleClick(value: string) {
		const newParams = new URLSearchParams(searchParams);
		newParams.set('sort', value);
		setSearchParams(newParams);
		setIsDropdownOpen(false);
	}

	const filterValue = searchParams.get('sort') || 'date-desc';

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div ref={dropdownRef} className={styles.buttonWrapper}>
			<button
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				className={styles.filterDropdownButton}>
				<FaSortAmountDown />
			</button>

			{isDropdownOpen && (
				<div className={styles.dropdownMenu}>
					{filterOptions.map((option) => (
						<button
							onClick={() => handleClick(option.id)}
							key={option.id}
							className={option.id === filterValue ? `${styles.active}` : ''}>
							{option.label}
							{option.icon}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
