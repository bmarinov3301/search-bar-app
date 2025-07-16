import { NextRequest, NextResponse } from 'next/server';
import { dataStore } from '@/data/dataStore';

export async function GET(req: NextRequest) {
	return NextResponse.json({
		searchHistory: dataStore.searchHistory
	});
}
