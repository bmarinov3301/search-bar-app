import Link from 'next/link';
import styles from './page.module.css';
import { FaArrowLeft } from 'react-icons/fa6';
import { dataStore } from '../../data/dataStore';
import SearchInput from '../components/search-input';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Search({ searchParams }: SearchPageProps) {
	const queryParams = await searchParams;
	const searchTerm = queryParams.searchTerm as string;

	if (searchTerm) {
		dataStore.searchHistory.push(searchTerm);
	}

	return (
		<div>
			<Link href='/'>
				<FaArrowLeft className={styles.backIcon} />
			</Link>
			<main>
				<SearchInput searchTerm={searchTerm} />
			</main>
		</div>
	)
}
