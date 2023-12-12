import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Providers, { SessionProvider } from "./Providers";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className=" h-full overflow-hidden relative">
      <body
        className={`${
          inter.className
        } ${"h-full overflow-auto relative bg-light text-dark dark:text-light dark:bg-dark"}`}
      >
        <SessionProvider session={session}>
          <Providers>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </Providers>
        </SessionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
