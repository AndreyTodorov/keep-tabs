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
import { type TabOverview } from "@/Pages/Landing";

type CardProps = React.ComponentProps<typeof Card> & {
	tab: TabOverview;
};

export function TabOverviewCard({ tab, className, ...props }: CardProps) {
	return (
		<Card
			className={cn("w-[380px] dark:border-primary-foreground", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle>{tab.name}</CardTitle>
				<CardDescription>{tab.description}</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div>
					{tab.lastTransactions.map((transaction, index) => (
						<div
							key={index}
							className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
						>
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">
									{transaction.user}: {transaction.amount} лв
								</p>
								<p className="text-sm text-muted-foreground">
									{transaction.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter className="flex gap-1">
				{/* TODO: buttons links */}
				<Button className="w-full">
					<Plus className="mr-2 h-4 w-4" /> Add
				</Button>
				<Button className="w-full">Details</Button>
			</CardFooter>
		</Card>
	);
}
