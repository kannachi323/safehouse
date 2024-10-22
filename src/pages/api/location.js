//api/location.js

import db from '../../../lib/db';

export default async function handler(req, res) {
      if (req.method == "GET") {
            //const locations = ["Santa Cruz", "Riverside", "Davis", "Berkeley", "Los Angeles", "San Diego", "Santa Barbara"];
            const { loc } = req.query;
            //console.log("Searching for location:", loc);
            
            if (!loc) {
                  return res.status(400).json({ error: "Missing query parameter 'name'" });
            }

            try {
                  // Create a SQL query to search for addresses
                  const { rows } = await db.query(
                        'SELECT * FROM listings WHERE address ILIKE $1',
                        [`%${loc}%`]
                  );
                  
                  return res.status(200).json({ location: rows });
            } catch (error) {
                  console.error('Database query failed:', error);
                  res.status(500).json({ error: 'Internal Server Error' });
            }
      } else {
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}
