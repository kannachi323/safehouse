import { POST } from '@api/listings/route'; 
import { createListing } from '@/db/listings/insert';
import { getCoordinates } from '@/utils/helper';
import { NextResponse } from 'next/server';

jest.mock('@/db/listings/insert', () => ({
  createListing: jest.fn(),
}));

jest.mock('@/utils/helper', () => ({
  getCoordinates: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init.status,
    })),
  },
}));

describe('Listings API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new listing successfully', async () => {
    const mockCoordinates = { latitude: 37.7749, longitude: -122.4194 };
    const mockRequestBody = {
      address: '123 Market St, San Francisco, CA',
      feature: { bedrooms: 2, bathrooms: 1 },
      media: [{ url: 'image1.jpg' }],
      title: 'Test Listing',
      price: 1200,
    };

    (getCoordinates as jest.Mock).mockResolvedValueOnce(mockCoordinates);
    (createListing as jest.Mock).mockResolvedValueOnce(undefined);

    const request = new Request('http://localhost/api/listings', {
      method: 'POST',
      body: JSON.stringify(mockRequestBody),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe('Listing created successfully');
    expect(getCoordinates).toHaveBeenCalledWith('123 Market St, San Francisco, CA');
    expect(createListing).toHaveBeenCalledWith(
      {
        title: 'Test Listing',
        price: 1200,
        address: '123 Market St, San Francisco, CA',
        latitude: 37.7749,
        longitude: -122.4194,
      },
      { bedrooms: 2, bathrooms: 1 },
      [{ url: 'image1.jpg' }]
    );
  });

  it('should handle coordinate fetching failure', async () => {
    (getCoordinates as jest.Mock).mockResolvedValueOnce({ latitude: null, longitude: null });

    const mockRequestBody = {
      address: '123 Market St, San Francisco, CA',
      feature: { bedrooms: 2, bathrooms: 1 },
      media: [{ url: 'image1.jpg' }],
      title: 'Test Listing',
      price: 1200,
    };

    const request = new Request('http://localhost/api/listings', {
      method: 'POST',
      body: JSON.stringify(mockRequestBody),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to get coordinates');
    expect(getCoordinates).toHaveBeenCalledWith('123 Market St, San Francisco, CA');
    expect(createListing).not.toHaveBeenCalled();
  });

  it('should handle unexpected errors gracefully', async () => {
    (getCoordinates as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));

    const mockRequestBody = {
      address: '123 Market St, San Francisco, CA',
      feature: { bedrooms: 2, bathrooms: 1 },
      media: [{ url: 'image1.jpg' }],
      title: 'Test Listing',
      price: 1200,
    };

    const request = new Request('http://localhost/api/listings', {
      method: 'POST',
      body: JSON.stringify(mockRequestBody),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to create listing');
    expect(getCoordinates).toHaveBeenCalledWith('123 Market St, San Francisco, CA');
    expect(createListing).not.toHaveBeenCalled();
  });
});
