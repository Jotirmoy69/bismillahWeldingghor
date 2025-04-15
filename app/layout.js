import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import PageTransitionWrapper from '@/Components/PageTransitionWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bismillah Welding Ghor",
  description: "We give you a freemium service in very affordable price",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="O4Bf6pzJrfFh_9TQ3n67iqihTkoiJzB2SCLbLnJ5p9M" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="false"
      >
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  );
}
