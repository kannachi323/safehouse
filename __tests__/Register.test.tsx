import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/firebase/auth';
import { createFirestoreUser } from '@/firebase/db';
import Page from '@/app/register/page';
import { cleanup } from "@testing-library/react";

afterEach(() => {
    cleanup();
  });

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/firebase/auth', () => ({
  signInWithGoogle: jest.fn(),
}));

jest.mock('@/firebase/db', () => ({
  createFirestoreUser: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />, // mock image tag
}));

describe('Register Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render the ChooseUser page initially', () => {
    render(<Page />);

    expect(screen.getByText(/I want to find a place to live./i)).toBeInTheDocument(); 
  });

  it('should switch to SignUp page when a user role is selected', () => {
    render(<Page />);

    fireEvent.click(screen.getByText(/I want to lease out my property./i)); // Assuming the ChooseUser component has a landlord button

    // check if SignUp page is displayed
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('should call handleAuth and navigate to home on Google sign-in', async () => {
    (signInWithGoogle as jest.Mock).mockResolvedValueOnce({ uid: '12345', email: 'test@example.com' });
    (createFirestoreUser as jest.Mock).mockResolvedValueOnce(null);

    render(<Page />);

    // Simulate switching to the SignUp page
    fireEvent.click(screen.getByText(/I want to lease out my property./i));

    // Simulate clicking the Google sign-in button
    const googleButton = screen.getByRole('button', { name: /Continue with Google/i }); 
    fireEvent.click(googleButton);

    // await screen.findByText(/create an account/i);

    expect(signInWithGoogle).toHaveBeenCalledWith(true); 
    expect(createFirestoreUser).toHaveBeenCalledWith({ uid: '12345', email: 'test@example.com' });
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should handle errors gracefully during Google sign-in', async () => {
    (signInWithGoogle as jest.Mock).mockRejectedValueOnce(new Error('Google sign-in failed'));

    render(<Page />);

    fireEvent.click(screen.getByText(/I want to lease out my property./i));
    const googleButton = screen.getByRole('button', { name: /Continue with Google/i });
    fireEvent.click(googleButton);

    // await screen.findByText(/create an account/i);

    expect(signInWithGoogle).toHaveBeenCalledWith(true);
    expect(createFirestoreUser).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});

