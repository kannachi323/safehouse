import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogIn from "@/app/login/page";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/firebase/auth";

// Mock dependencies
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/firebase/auth", () => ({
    signInWithGoogle: jest.fn(),
}));

jest.mock("@/containers/auth-page/ChooseUserContainer", () => ({
    __esModule: true,
    default: ({ showPage, setShowPage, setIsLandlord }: any) => (
        <div>
            <button onClick={() => setShowPage(1)}>Go to Sign In</button>
        </div>
    ),
}));

jest.mock("@/components/Buttons/Buttons", () => ({
    GoogleButton: ({ onClick }: any) => (
        <button data-testid="google-signin" onClick={onClick}>
            Sign in with Google
        </button>
    ),
}));

describe("LogIn Component", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (signInWithGoogle as jest.Mock).mockResolvedValue(true); // Mock signInWithGoogle
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the ChooseUser component initially", () => {
        render(<LogIn />);
        expect(screen.getByText("Go to Sign In")).toBeInTheDocument();
    });

    it("navigates to Sign In page when 'Go to Sign In' is clicked", () => {
        render(<LogIn />);
        fireEvent.click(screen.getByText("Go to Sign In"));
        expect(screen.queryByText("Go to Sign In")).not.toBeInTheDocument();
        expect(screen.getByTestId("google-signin")).toBeInTheDocument();
    });

    it("calls signInWithGoogle and redirects on successful Google sign-in", async () => {
        render(<LogIn />);
        fireEvent.click(screen.getByText("Go to Sign In"));
        fireEvent.click(screen.getByTestId("google-signin"));

        expect(signInWithGoogle).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/"));
    });
});
