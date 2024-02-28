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
import { Avatar, AvatarFallback } from "./ui/avatar";
import { TransactionDialogForm } from "./Forms/Transaction";
import { type User } from "@/types";

type CardProps = React.ComponentProps<typeof Card> & {
	tab: TabOverview;
	currentUser: User;
};

export function TabOverviewCard({
	tab,
	currentUser,
	className,
	...props
}: CardProps) {
	// TODO: order the guests by current user and then all others
	// TODO: show relative balance 1 -> 2 = -22 red, 2 -> 1 = +22 green

	const sortedSummaries = tab.transaction_summaries
		.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance))
		.map((summary, index, summaries) => {
			const diff =
				index === 0
					? 0
					: parseFloat(summaries[index - 1].balance) -
						parseFloat(summary.balance);
			const rounded = Math.round((diff + Number.EPSILON) * 100) / 100;

			return {
				balance: summary.balance,
				userID: summary.user_id,
				name: summary.user.name,
				diff: rounded,
			};
		});

	console.log(currentUser);

	return (
		<Card
			className={cn(
				"max-w-screen dark:border-primary-foreground md:w-[400px]",
				className,
			)}
			{...props}
		>
			<CardHeader>
				<CardTitle>{tab.name}</CardTitle>
				<CardDescription>{tab.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div>
					{tab.transactions.toReversed().map((transaction, index) => (
						<div
							key={index}
							className="mb-3 flex items-center justify-end gap-2 pb-4 last:mb-0 last:pb-0"
						>
							<div className="flex w-3/4 items-center gap-4">
								<Avatar className="h-8 w-8 rounded-full bg-sky-600">
									<AvatarFallback>
										{transaction.user.name[0].toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<p className="text-sm font-light leading-none text-muted-foreground">
										{transaction.date}
									</p>
									<p className="text-xs text-muted-foreground">
										{transaction.comment}
									</p>
								</div>
							</div>
							<div className="w-1/4 pl-2">{transaction.amount} лв</div>
						</div>
					))}
					<div className="flex w-full items-center justify-between">
						{sortedSummaries.map((summary) => {
							return (
								<div
									key={`${summary.userID}`}
									className="flex w-full flex-col items-center gap-2"
								>
									<span>{summary.name}</span>
									<span>{summary.balance}</span>
									<span>{summary.diff}</span>
								</div>
							);
						})}
						<div></div>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex gap-1">
				{/* TODO: buttons links */}
				<TransactionDialogForm tabID={tab.id} />
				<Button variant="outline" className="w-full">
					Details
				</Button>
			</CardFooter>
		</Card>
	);
}
