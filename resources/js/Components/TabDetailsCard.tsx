import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";

const notifications = [
	{
		title: "Соня: 35.44 лв (препарати)",
		description: "1 hour ago",
	},
	{
		title: "Андрей: 12.34 лв (Миа тоалетна)",
		description: "1 hour ago",
	},
	{
		title: "Соня: 25.40 лв (Веро)",
		description: "2 hours ago",
	},
];

type CardProps = React.ComponentProps<typeof Card>;

// TODO: implement
export function TabOverviewCard({ className, ...props }: CardProps) {
	return (
		<Card
			className={cn("w-[500px] dark:border-primary-foreground", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle>Tab name</CardTitle>
				<CardDescription>Tab short description</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div>
					{notifications.map((notification, index) => (
						<div
							key={index}
							className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
						>
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">
									{notification.title}
								</p>
								<p className="text-sm text-muted-foreground">
									{notification.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter className="flex gap-1">
				<Button className="w-full">
					<Plus className="mr-2 h-4 w-4" /> Add
				</Button>
				<Button className="w-full">Details</Button>
			</CardFooter>
		</Card>
	);
}
