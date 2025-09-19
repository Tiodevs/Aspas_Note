import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";


const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Aspas Note",
  description: "Aspas Note um aplicativo para gestão de frases marcantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${barlow.variable} ${barlow.className}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
