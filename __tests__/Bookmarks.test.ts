import { POST, GET } from '@api/bookmarks/route'; 
import { addBookmark } from '@/db/bookmarks/insert';
import { getBookmarks } from '@/db/bookmarks/select';
import { NextResponse } from 'next/server';

jest.mock('@/db/bookmarks/insert', () => ({
  addBookmark: jest.fn(),
}));

jest.mock('@/db/bookmarks/select', () => ({
  getBookmarks: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init.status,
    })),
  },
}));

describe('Bookmarks API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new bookmark', async () => {
    (addBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    const mockBookmark = { uid: '123', listing_id: '456' };
    const request = new Request('http://localhost/api/bookmarks', {
      method: 'POST',
      body: JSON.stringify(mockBookmark),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Bookmark added successfully');
    expect(addBookmark).toHaveBeenCalledWith('123', '456');
  });

  it('should fetch bookmarks for a user', async () => {
    const mockBookmarks = [{ listing_id: '456' }];
    (getBookmarks as jest.Mock).mockResolvedValueOnce(mockBookmarks);

    const request = new Request('http://localhost/api/bookmarks?uid=123', {
      method: 'GET',
    });

    const response = await GET(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockBookmarks);
    expect(getBookmarks).toHaveBeenCalledWith('123');
  });
});
