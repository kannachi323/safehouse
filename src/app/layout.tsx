import "./globals.css";
import { AuthProvider } from "@contexts/AuthContext"
import AuthLoading from "@components/AuthLoading"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <AuthProvider>
            <AuthLoading>
              <main>{children}</main>
            </AuthLoading>
          </AuthProvider>
        </body>
    </html>
  );
}