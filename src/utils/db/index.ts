interface Listing {
    id: number;
    name: string;
    price: number;
  }
  

export async function getCity(city: string): Promise<Listing[] | void> {
  
    const url: string = `http://localhost:3000/api/db/listings?city=${city}`;
    
    try {
      const response: Response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json: Listing[] = await response.json();
      console.log(json);
      return json;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }
