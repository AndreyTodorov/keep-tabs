import { type PropsWithChildren } from "react";
import { type User } from "@/types";
import { NavMenu } from "@/Components/Navigation";

export default function AuthenticatedLayout({
	user,
	children,
}: PropsWithChildren<{ user: User }>) {
	return (
		<div className="min-w-screen min-h-screen bg-background text-foreground">
			<NavMenu user={user} />
			<main>{children}</main>
		</div>
	);
}
