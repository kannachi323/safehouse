import { render, screen, fireEvent, act } from '@testing-library/react';
import ChatsPage from '@/app/user/messages/page';
import { useAuth } from '@/contexts/AuthContext';
import { listenToUserChatsAndMessages } from '@/firebase/db';
import { cleanup } from "@testing-library/react";

afterEach(() => {
    cleanup();
  });

  jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/firebase/db', () => ({
  listenToUserChatsAndMessages: jest.fn(),
}));

jest.mock('@/components/Inputs', () => ({
  ChatInput: jest.fn(() => <div data-testid="chat-input">Chat Input</div>),
}));

jest.mock('@/containers/user-page/UserManagerContainer', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('ChatsPage', () => {
  const mockUser = { uid: 'user123', displayName: 'John Doe' };
  const mockChats = [
    {
      chatId: 'chat1',
      title: 'Chat 1',
      messages: [{ senderId: 'user123', text: 'Hello!' }],
    },
    {
      chatId: 'chat2',
      title: 'Chat 2',
      messages: [{ senderId: 'user456', text: 'Hi there!' }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (listenToUserChatsAndMessages as jest.Mock).mockImplementation((uid, userFullName, setChats) => {
      setChats(mockChats);
      return {
        unsubscribeUserChats: jest.fn(),
        messageListeners: [jest.fn()],
      };
    });
  });

  test('renders chat list and selects a chat', async () => {
    await act(async () => render(<ChatsPage />));

    // Check that chat titles are rendered
    expect(screen.getByText('Chat 1')).toBeInTheDocument();
    expect(screen.getByText('Chat 2')).toBeInTheDocument();

    // Simulate clicking on the second chat
    fireEvent.click(screen.getByText('Chat 2'));

    // Check that the selected chat is displayed
    expect(screen.getByText('Chat 2')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  test('calls listenToUserChatsAndMessages on mount', async () => {
    await act(async () => render(<ChatsPage />));

    expect(listenToUserChatsAndMessages).toHaveBeenCalledWith(
      mockUser.uid,
      mockUser.displayName,
      expect.any(Function)
    );
  });

  test('displays "No messages to display..." when no chat is selected', async () => {
    await act(async () => render(<ChatsPage />));

    // Ensure the placeholder text is displayed
    expect(screen.getByText('No messages to display...')).toBeInTheDocument();
  });

  test('scrolls to the bottom when messages are updated', async () => {
    const scrollToMock = jest.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
      set: scrollToMock,
    });

    await act(async () => render(<ChatsPage />));

    // Simulate selecting a chat
    fireEvent.click(screen.getByText('Chat 1'));

    // Check that scroll behavior is triggered
    expect(scrollToMock).toHaveBeenCalled();
  });

  test('renders ChatInput component', async () => {
    await act(async () => render(<ChatsPage />));

    // Simulate selecting a chat
    fireEvent.click(screen.getByText('Chat 1'));

    // Check that ChatInput is rendered
    expect(screen.getByTestId('chat-input')).toBeInTheDocument();
  });
});
