export interface SearchHistoryResponse {
	data: DropdownItem[];
}

export interface DropdownItem {
  value: string;
  type: 'history' | 'suggestion'
}
