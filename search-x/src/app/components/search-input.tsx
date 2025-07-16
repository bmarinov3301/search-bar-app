'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './search-input.module.css';
import { RxCross1 } from 'react-icons/rx';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { CiClock2 } from 'react-icons/ci';
import { DropdownItem, SearchHistoryResponse } from '../types/Types';

interface SearchInputProps {
	searchTerm?: string;
}

export default function SearchInput({ searchTerm: initialSearchTerm = '' }: SearchInputProps) {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [searchData, setSearchData] = useState<DropdownItem[]>([]);
  const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([]);
	const [searchDropdownVisible, setSearchDropdownVisible] = useState<boolean>(false);

	useEffect(() => {
		const fetchSearchHistory = async () => {
			const response = await fetch('/api/search');
			const responseJson: SearchHistoryResponse = await response.json();
			console.log('Search history response', responseJson.data);

			setDropdownItems(responseJson.data.slice(0, 10));
      setSearchData(responseJson.data);
		};

		fetchSearchHistory();
	}, [])
  // todo: react-hooks/exhaustive-deps

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDropdownItems(searchData
      .filter(item => item.value.startsWith(e.target.value))
      .slice(0, 10)
    );
  }

	const handleSearch = () => {
		router.push(`/search?searchTerm=${searchTerm}`);
	}

  const isHistoryItem = (item: DropdownItem) => item.type === 'history';

	return (
		<div className={styles.inputWrapper}>
			<PiMagnifyingGlass className={`${styles.icon} ${styles.searchIcon}`}
				onClick={handleSearch} />
			<input className={`${styles.searchInput} ${styles.padded}`}
				type="text"
				placeholder="Search..."
				value={searchTerm}
				onFocus={() => {
					setSearchDropdownVisible(true);
				}}
				onBlur={() => {
					setSearchDropdownVisible(false);
				}}
				onChange={handleInputChange}
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (e.key === 'Enter') {
    			  handleSearch();
    			}
				}} />
			<RxCross1 className={`${styles.icon} ${styles.clearSearchIcon}`}
				onClick={() => {
					setSearchTerm('');
				}} />
			{searchDropdownVisible && !!dropdownItems.length && (
				<div className={styles.searchDropdownWrapper}>
					{dropdownItems.map((item, index) => {
						return (
							<div key={`history-${index}`}
                className={`${styles.dropdownItem} ${isHistoryItem(item) ? styles.historyItem : ''}`}>
                  {item.type === 'history' && (
                    <CiClock2 className={styles.historyIcon} />
                  )}
								  {item.value}
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
