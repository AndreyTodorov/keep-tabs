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
import { type TransactionShort, type TabOverview } from "@/Pages/Landing";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { TransactionDialogForm } from "./Forms/Transaction";
import { useMemo } from "react";

type CardProps = React.ComponentProps<typeof Card> & {
	tab: TabOverview;
};

type UserBalanceMap = { [userID: number]: number };

function calculateUserBalances(
	transactions: TransactionShort[],
): UserBalanceMap {
	const userBalances: UserBalanceMap = {};

	transactions.forEach((transaction) => {
		const {
			user: { id: userID },
			amount,
		} = transaction;

		// If the user is not in the map, initialize their balance to 0
		if (!userBalances[userID]) {
			userBalances[userID] = 0;
		}

		// Update the user's balance with the transaction amount
		userBalances[userID] += parseFloat(amount);
	});

	return userBalances;
}

export function TabOverviewCard({ tab, className, ...props }: CardProps) {
	const currentMonthSummary = useMemo(
		() => calculateUserBalances(tab.transactions),
		[tab],
	);

	const sortedSummaries = tab.transaction_summaries
		.map((summary) => {
			const balanceAndCurrent =
				parseFloat(summary.balance) +
				(currentMonthSummary[summary.user_id] ?? 0);
			const balance =
				Math.round((balanceAndCurrent + Number.EPSILON) * 100) / 100;
			return {
				...summary,
				balance,
			};
		})
		.sort((a, b) => b.balance - a.balance)
		.map((summary, index, summaries) => {
			const diff =
				index === 0 ? 0 : summaries[index - 1].balance - summary.balance;
			const roundedDiff = Math.round((diff + Number.EPSILON) * 100) / 100;

			return {
				balance: summary.balance,
				userID: summary.user_id,
				name: summary.user.name,
				diff: roundedDiff,
			};
		});

	return (
		<Card
			className={cn(
				"max-w-screen flex h-[500px] flex-col justify-between dark:border-primary-foreground md:w-[400px]",
				className,
			)}
			{...props}
		>
			<CardHeader className="dark:border-b-1">
				<CardTitle>{tab.name}</CardTitle>
				<CardDescription>{tab.description}</CardDescription>
			</CardHeader>
			<CardContent>
				{tab.transactions
					.toReversed()
					.slice(-3)
					.map((transaction, index) => (
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
			</CardContent>
			<CardFooter className="flex flex-col gap-2">
				<div className="flex w-full font-semibold">
					{sortedSummaries.map((summary) => {
						return !!summary.diff ? (
							<div key={`${summary.userID}`} className="w-full pt-4">
								{!!summary.diff && (
									<>
										<span>
											{summary.name} Owes:{" "}
											<span className="text-lg text-red-500">
												{summary.diff} лв
											</span>
										</span>
									</>
								)}
							</div>
						) : null;
					})}
				</div>
				{/* TODO: buttons links */}
				<div className="flex w-full gap-2">
					<TransactionDialogForm tabID={tab.id} />
					<Button variant="outline" className="w-full">
						Details
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
