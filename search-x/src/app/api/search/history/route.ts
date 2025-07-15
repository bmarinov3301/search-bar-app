
import { NextRequest, NextResponse } from 'next/server';

const searchHistory: string[] = [];

export async function GET(req: NextRequest) {
	console.log(req);
	
	return NextResponse.json({
		searchHistory
	});
}
