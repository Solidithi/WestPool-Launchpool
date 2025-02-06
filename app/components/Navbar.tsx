'use client';

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/Logo/Logo.png";
import polkadotlogo from "@/public/Logo/Polkadot_Token_Pink.png";
import { navItems } from "@/app/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "../utils/helper";
import { client } from "../thirdwebClient";
import { 
	ConnectButton,
	useActiveAccount,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const wallets = [
	createWallet("io.metamask"),
	createWallet("com.coinbase.wallet"),
	createWallet("me.rainbow"),
	createWallet("io.rabby"),
	createWallet("io.zerion.wallet"),
	createWallet("walletConnect"),
	createWallet("com.trustwallet.app"),
];

const Navbar = () => {
	const [toggle, setToggle] = useState(false);
	const toggleNavbar = () => setToggle(!toggle);
	const [NAV_MENU, SET_NAV_MENU] = useState(navItems);
	const account = useActiveAccount();

	const checkProjectOwner = async () => {
		if (!account) return;

		try {
			const response = await axios.post("/api/launchpool/navbar", { userAddress: account.address });

			if (!response.data.success) {
				console.error(response.data.message);
				return;
			}

			SET_NAV_MENU((prevMenu) => {
				if (response.data.isOwner) {
					return !prevMenu.some((item) => item.label === "My project")
						? [{ label: "My project", path: "/launchpool/myProject" }, ...prevMenu]
						: prevMenu;
				} else {
					return prevMenu.filter((item) => item.label !== "My project");
				}
			});
		} catch (error) {
			console.error("Error checking project owner:", error);
		}
	};

	const checkProjectOwnerDebounced = debounce(checkProjectOwner, 300);

	useEffect(() => {
		checkProjectOwnerDebounced();
	}, [account]);


	return (
		<nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b-[1px] border-[#60799e] text-white">
			<div className="container px-4 mx-auto relative text-sm">
				<div className="flex justify-between items-center">
					<div className="flex items-center flex-shrink-0 transition-transform transform hover:-translate-y-1 duration-300">
						<Image src={polkadotlogo} alt="Logo" className="h-10 w-10 " />
						<Image src={logo} alt="Logo" className="h-20 w-20 mr-2 rounded-full" />
						<Link href={"/"}>
							<span className="text-xl tracking-tight">WestPool</span>
						</Link>
					</div>
					<ul className="hidden lg:flex ml-14 space-x-12">
						{NAV_MENU.map((item, index) => (
							<li
								key={index}
								className="transition-transform transform hover:-translate-y-1 duration-300"
							>
								<Link href={item.path}>{item.label}</Link>
							</li>
						))}
					</ul>
					<div className="hidden lg:flex justify-center items-center space-x-4">
						<div className=" py-2 px-3 rounded-3xl text-white w-[180px]">
							<ConnectButton
								client={client}
								wallets={wallets}
								connectModal={{ size: "compact" }}
							/>
						</div>
					</div>
					<div className="lg:hidden md:flex flex-col justify-end">
						<button onClick={toggleNavbar}>
							{toggle ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
				{toggle && (
					<div className="fixed right-0 z-20 bg-[#000626] w-full p-12 flex flex-col justify-center items-center lg:hidden">
						<ul>
							{NAV_MENU.map((item, index) => (
								<li key={index} className="py-4">
									<Link href={item.path}>{item.label}</Link>
								</li>
							))}
						</ul>
						<div className="flex space-x-6">
							<div className=" py-2 px-3 rounded-3xl text-white w-[180px]">
								<ConnectButton
									client={client}
									wallets={wallets}
									connectModal={{ size: "compact" }}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
