import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next.js-ecommere App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  // const pathname = usePathname();
  // const isAuthPage = pathname.startsWith("");
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-black text-light">
        <ProductProvider>
          <NextTopLoader color="#deed3b" height={4} showSpinner={false} />
          <Navbar></Navbar>
          {children}
        </ProductProvider>
      </body>
    </html>
  );
}
