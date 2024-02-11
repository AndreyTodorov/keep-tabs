import { type PropsWithChildren } from "react";

export default function Authenticated({ children }: PropsWithChildren) {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<main>{children}</main>
		</div>
	);
}
