import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const requestUrl = request.nextUrl.pathname;
	const response = NextResponse.next();

	if (requestUrl === '/api/search') {
		console.log('Should track request execution time here?');
	}

	return response;
}
