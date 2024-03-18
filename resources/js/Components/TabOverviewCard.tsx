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

type CardProps = React.ComponentProps<typeof Card> & {
	tab: TabOverview;
};

export function TabOverviewCard({ tab, className, ...props }: CardProps) {
	const sortedBalances = tab.currentBalances
		.sort((a, b) => b.total - a.total)
		.map((summary, index, summaries) => {
			const diff = index === 0 ? 0 : summaries[index - 1].total - summary.total;
			const roundedDiff = Math.round((diff + Number.EPSILON) * 100) / 100;

			return {
				...summary,
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
					{sortedBalances.map((summary) => {
						return !!summary.diff ? (
							<div key={`${summary.user.id}`} className="w-full pt-4">
								{!!summary.diff && (
									<>
										<span>
											{summary.user.name} Owes:{" "}
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
