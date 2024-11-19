import { db} from '../index';
import { users } from '../schema';
import { eq } from 'drizzle-orm/expressions';

export async function getUserByID(uid: string) {
    const rows = await db
        .select()
        .from(users)
        .where(eq(users.uid, uid));

    return rows[0];
}