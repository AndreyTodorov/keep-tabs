import { type PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background text-foreground">
			<main>{children}</main>
		</div>
	);
}
