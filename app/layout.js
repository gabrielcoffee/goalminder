import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export const metadata = {
	title: "Goalminder",
	description: "Goalminder helps you stay focused by sending reminders to keep you on track with your goals.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-background text-foreground">

				<Header/>
					{children}
				<Footer/>

			</body>
		</html>
	);
}
