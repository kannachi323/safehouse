import "./globals.css";
import NavBar from "../components/NavBar";
import { QueryProvider } from "@contexts/QueryContext"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <NavBar/>
          <QueryProvider>
            <main>{children}</main>
          </QueryProvider>
          
        </body>
    </html>
  );
}
