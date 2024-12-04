'use client';
import "./globals.css";
import { AuthProvider } from "@contexts/AuthContext"
import { GoogleMapsProvider } from "@/contexts/GoogleMapsContext";
import { QueryProvider } from "@/contexts/QueryContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <AuthProvider>
            <QueryProvider>
              <GoogleMapsProvider>
                <main>{children}</main>
              </GoogleMapsProvider>
            </QueryProvider>
          </AuthProvider>
        </body>
    </html>
  );
}