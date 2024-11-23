import { NextResponse } from 'next/server';
import { addBookmark, removeBookmark } from '@/db/bookmarks/insert';
import { getBookmarksByUser } from '@/db/bookmarks/select';

export async function POST(request: Request) {
  try {
    const { uid, listingId } = await request.json();

    if (!uid || !listingId) {
      return NextResponse.json({ error: 'User ID and Listing ID are required' }, { status: 400 });
    }

    await addBookmark(uid, listingId);

    return NextResponse.json({ message: 'Bookmark added successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return NextResponse.json({ error: 'Failed to add bookmark' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const bookmarks = await getBookmarksByUser(uid);

    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { uid, listingId } = await request.json();

    if (!uid || !listingId) {
      return NextResponse.json({ error: 'User ID and Listing ID are required' }, { status: 400 });
    }

    await removeBookmark(uid, listingId);

    return NextResponse.json({ message: 'Bookmark removed successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 });
  }
}
