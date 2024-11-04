import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400', '700', '900']
});


export const metadata = {
	title: "Goalminder",
	description: "Goalminder helps you stay focused by sending reminders to keep you on track with your goals.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={"bg-white text-foreground " + merriweather.className}>
					<Header/>
					{children}
				</body>
			</AuthProvider>
		</html>
	);
}
