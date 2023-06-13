import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import AppContextProvider from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Post Jamb SMS Notification",
  description:
    "Stay informed with latest update from your choosen universities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <Navbar />

          {children}
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
