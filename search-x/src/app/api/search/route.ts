import { NextResponse } from 'next/server';
import { dataStore } from '../../../data/dataStore';

export async function GET() {
  return NextResponse.json({
    data: [
      ...dataStore.searchHistory.map(item => {
        return {
          value: item,
          type: 'history'
        }
      }),
      ...dataStore.suggestions.map(item => {
        return {
          value: item,
          type: 'suggestion'
        }
      })
    ]
  });
}
