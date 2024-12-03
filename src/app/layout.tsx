'use client';
import "./globals.css";
import { AuthProvider } from "@contexts/AuthContext"
import { GoogleMapsProvider } from "@/contexts/GoogleMapsContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <AuthProvider>
            <GoogleMapsProvider>
              <main>{children}</main>
            </GoogleMapsProvider>
          
          </AuthProvider>
        </body>
    </html>
  );
}