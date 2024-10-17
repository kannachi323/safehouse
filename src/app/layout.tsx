import "./globals.css";
import NavBar from "../components/NavBar";
import { UserProvider } from '@auth0/nextjs-auth0/client';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <NavBar/>
          <main>{children}</main>
        </body>
      </UserProvider>
      
    </html>
  );
}
