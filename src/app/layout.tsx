import "./globals.css";
import { AuthProvider } from "@contexts/AuthContext"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <AuthProvider>
         
            <main>{children}</main>
          
          </AuthProvider>
        </body>
    </html>
  );
}