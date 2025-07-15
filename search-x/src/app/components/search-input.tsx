'use client'

import { useState, useEffect } from 'react';
import styles from './search-input.module.css';
import { SearchHistoryResponse } from '../types/Types';
import { RxCross1 } from 'react-icons/rx';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function SearchInput() {
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const fetchSearchHistory = async () => {
			const response = await fetch('/api/search/history');
			const data: SearchHistoryResponse = await response.json();
			console.log('Search history response', data)
		};

		fetchSearchHistory();
	}, [])

	return (
		<div className={styles.inputWrapper}>
			<FaMagnifyingGlass className={`${styles.icon} ${styles.searchIcon}`} />
			<input
				type="text"
				placeholder="Search..."
				className={styles.searchInput}
				value={searchTerm}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setSearchTerm(e.target.value);
				}} />
			<RxCross1 className={`${styles.icon} ${styles.clearSearchIcon}`} onClick={() => {
				setSearchTerm('');
			}} />
		</div>
	)
}
