import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/Components/ui/menubar";
import { type User } from "@/types";
import { Link } from "@inertiajs/react";
import { ModeToggle } from "./Theme/mode-toggle";

export function NavMenu({ user }: { user: User }) {
	return (
		<Menubar className="flex w-full justify-between dark:border-primary-foreground">
			<Link className="p-3" href={route("home")}>
				Tabs
			</Link>
			<div className="flex">
				<MenubarMenu>
					<MenubarTrigger>{user.name}</MenubarTrigger>
					<MenubarContent>
						<Link href={route("profile.edit")}>
							<MenubarItem>
								Profile <MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
						</Link>
						<MenubarSeparator />
						<Link method="post" href={route("logout")} as="div">
							<MenubarItem>
								Log out <MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
						</Link>
					</MenubarContent>
				</MenubarMenu>
				<ModeToggle />
			</div>
		</Menubar>
	);
}
