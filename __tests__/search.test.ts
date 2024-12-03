import { POST } from '@api/search/route';
import { getListings } from '@/db/listings/select';
import { NextResponse } from 'next/server';

jest.mock('@/db/listings/select', () => ({
  getListings: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init.status,
    })),
  },
}));

describe('Search API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return listings with filters', async () => {
    const mockResponse = [{ id: 1, price: 100000 }];
    (getListings as jest.Mock).mockResolvedValue(mockResponse);

    const request = new Request('http://localhost:3000/api/search?uid=123', {
      method: 'POST',
      body: JSON.stringify({ price: 100000 }),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockResponse);
  });

  it('should handle errors', async () => {
    (getListings as jest.Mock).mockRejectedValue(new Error('Database error'));

    const request = new Request('http://localhost:3000/api/search', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to fetch listings' });
  });
}); 