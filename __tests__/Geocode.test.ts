import { POST } from '@api/geocode/route'; 
import { getCoordinates } from '@/utils/helper';
import { NextResponse } from 'next/server';

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

describe('Coordinates API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return coordinates for a valid address', async () => {
    const mockCoordinates = { latitude: 37.7749, longitude: -122.4194 };
    const mockRequestBody = { place: '123 Market St, San Francisco, CA' };

    (getCoordinates as jest.Mock).mockResolvedValueOnce(mockCoordinates);

    const request = new Request('http://localhost/api/coordinates', {
      method: 'POST',
      body: JSON.stringify(mockRequestBody),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockCoordinates);
    expect(getCoordinates).toHaveBeenCalledWith('123 Market St, San Francisco, CA');
  });

  it('should return a 400 error if the address is missing', async () => {
    const mockRequestBody = {}; 

    const request = new Request('http://localhost/api/coordinates', {
      method: 'POST',
      body: JSON.stringify(mockRequestBody),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Address is required');
    expect(getCoordinates).not.toHaveBeenCalled();
  });

  it('should handle unexpected errors gracefully', async () => {
    const mockRequestBody = { place: '123 Market St, San Francisco, CA' };

    (getCoordinates as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));

    const request = new Request('http://localhost/api/coordinates', {
      method: 'POST',
      body: JSON.stringify(mockRequestBody),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeTruthy();
    expect(getCoordinates).toHaveBeenCalledWith('123 Market St, San Francisco, CA');
  });
});
