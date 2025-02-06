import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import bg from "@/public/My project.png";
import Image from "next/image";
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Lauchpool Project",
	description: "Hackathon",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang="en">
			<body
				className={inter.className}
				style={{ position: "relative", minHeight: "100vh" }}
			>
				<ThirdwebProvider>
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: -1,
						}}
					>
						<Image
							src={bg}
							alt="background"
							fill
							style={{ objectFit: "cover" }}
							quality={100}
						/>
					</div>
					<Navbar />
					{children}
					<Footer />
				</ThirdwebProvider>
			</body>
		</html>
	);
}