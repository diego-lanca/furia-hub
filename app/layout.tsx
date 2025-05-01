import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Furia Hub",
  description: "Projeto para processo seletivo da Furia Tech!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = await createClient();
  const { error } = await supabase.auth.getUser();

  const isAuthenticated = !error;

    return (
      <html lang="pt-br">
        <body
          className={`${inter.className} antialiased`}
        >
          {isAuthenticated && <Navbar />}
          {children}
        </body>
      </html>
    );
  
}
