import { addBookmark } from '@/db/bookmarks/insert';
import { removeBookmark } from '@/db/bookmarks/delete';
import { getBookmarks } from '@/db/bookmarks/select';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  const { uid, listing_id } = await request.json();

  if (!uid || !listing_id) {
    return NextResponse.json({ message: 'UID and Listing ID are required' }, { status: 400 });
  }

  try {
    await addBookmark(uid, listing_id);
    return NextResponse.json({ message: 'Bookmark added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  // Extract the data (UID and Listing ID) from the request body
  const { uid, listing_id } = await request.json();

  if (!uid || !listing_id) {
    return NextResponse.json({ message: 'UID and Listing ID are required' }, { status: 400 });
  }

  try {
    // Call the removeBookmark function to remove a bookmark
    await removeBookmark(uid, listing_id);
    return NextResponse.json({ message: 'Bookmark removed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(request: Request) {

  const url = new URL(request.url);


  const uid = url.searchParams.get('uid');

  if (!uid) {
    return NextResponse.json({ message: 'UID is required' }, { status: 400 });
  }

  try {
    // Call the getBookmarks function to fetch the user's bookmarks
    const bookmarks = await getBookmarks(uid);
    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
