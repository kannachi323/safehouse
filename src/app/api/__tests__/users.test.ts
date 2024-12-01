import { POST } from '../users/route';
import { getUserByID } from '@/db/users/select';
import { createUser } from '@/db/users/insert';
import { NextResponse } from 'next/server';

jest.mock('@/db/users/select', () => ({
  getUserByID: jest.fn(),
}));

jest.mock('@/db/users/insert', () => ({
  createUser: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init.status,
    })),
  },
}));

describe('Users API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle existing user', async () => {
    const mockUser = { uid: '123', name: 'Test User' };
    (getUserByID as jest.Mock).mockResolvedValue(mockUser);

    const request = new Request('http://localhost:3000/api/users?uid=123', {
      method: 'POST',
      body: JSON.stringify({ user: mockUser }),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBe(`user already exists...logging in user: ${mockUser.uid}`);
  });

  it('should create new user', async () => {
    const mockUser = { uid: '123', name: 'Test User' };
    (getUserByID as jest.Mock).mockResolvedValue(null);
    (createUser as jest.Mock).mockResolvedValue({ ok: true, status: 201 });

    const request = new Request('http://localhost:3000/api/users?uid=123', {
      method: 'POST',
      body: JSON.stringify({ user: mockUser }),
    });

    const response = await POST(request);
    if (!response) throw new Error('No response received');
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toBe(`user created...logging in user: 123`);
  });
}); 