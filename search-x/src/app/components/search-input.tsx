'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './search-input.module.css';
import { RxCross1 } from 'react-icons/rx';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { SearchHistoryResponse } from '../types/Types';

interface SearchInputProps {
	searchTerm?: string;
}

export default function SearchInput({ searchTerm: initialSearchTerm = '' }: SearchInputProps) {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);

	useEffect(() => {
		const fetchSearchHistory = async () => {
			const response = await fetch('/api/search/history');
			const data: SearchHistoryResponse = await response.json();
			console.log('Search history response', data.searchHistory);

			setSearchHistory(data.searchHistory);
		};

		fetchSearchHistory();
	}, [])

	const handleSearch = () => {
		router.push(`/search?searchTerm=${searchTerm}`);
	}

	return (
		<div className={styles.inputWrapper}>
			<PiMagnifyingGlass className={`${styles.icon} ${styles.searchIcon}`}
				onClick={handleSearch} />
			<input className={styles.searchInput}
				type="text"
				placeholder="Search..."
				value={searchTerm}
				onFocus={() => {
					setSearchDropdownVisible(true);
				}}
				onBlur={() => {
					setSearchDropdownVisible(false);
				}}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setSearchTerm(e.target.value);
				}}
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (e.key === 'Enter') {
    			  handleSearch();
    			}
				}} />
			<RxCross1 className={`${styles.icon} ${styles.clearSearchIcon}`}
				onClick={() => {
					setSearchTerm('');
				}} />
			{searchDropdownVisible && !!searchHistory.length && (
				<div className={styles.searchDropdownWrapper}>
					{searchHistory.map((item, index) => {
						return (
							<div key={index}>
								{item}
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
