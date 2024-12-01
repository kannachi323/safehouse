import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogIn from "@/app/login/page";
import { signInWithGoogle } from "@/firebase/auth";
import { useRouter } from "next/navigation";

// Mock the external dependencies
jest.mock("@/firebase/auth", () => ({
  signInWithGoogle: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LogIn Component", () => {
  it("should call signInWithGoogle and redirect to home on GoogleButton click", async () => {
    const signInMock = signInWithGoogle as jest.Mock;
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<LogIn />);

    const googleButton = screen.getByRole("button", { name: /Sign In with Google/i });
    expect(googleButton).toBeInTheDocument();

    signInMock.mockResolvedValue(true); // Simulate successful login

    await userEvent.click(googleButton);

    expect(signInMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("should not redirect if signInWithGoogle fails", async () => {
    const signInMock = signInWithGoogle as jest.Mock;
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<LogIn />);

    const googleButton = screen.getByRole("button", { name: /Sign In with Google/i });
    signInMock.mockResolvedValue(false); // Simulate failed login

    await userEvent.click(googleButton);

    expect(signInMock).toHaveBeenCalledTimes(1);
    expect(pushMock).not.toHaveBeenCalled();
  });
});
