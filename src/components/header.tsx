import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
export interface HeaderProps {
	title: string;
}
export default function Header({ title }: HeaderProps) {
	return (
		<div className="w-full">
			<Box
				bgColor={"green.900"}
				className={
					"flex flex-row justify-between align-center px-8 py-2 w-full"
				}>
				<div className="flex flex-row items-center justify-start">
					<Link href={"/"} className="p-4">
						<Image src={logo} alt={"logo"} width={24} height={24} />
					</Link>
					<Text textStyle={"subTitle"} color={"green.200"}>
						{title}
					</Text>
				</div>
				<nav className={"flex flex-row gap-2 align-bottom"}>
					<Link href="/" className="flex flex-col justify-end">
						<Text textStyle={"link"} fontSize={"xl"}>
							Home
						</Text>
					</Link>
					<Link href="/events" className="flex flex-col justify-end">
						<Text textStyle={"link"} fontSize={"xl"}>
							Events
						</Text>
					</Link>
				</nav>
			</Box>
		</div>
	);
}
