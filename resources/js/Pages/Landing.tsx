import AuthenticatedLayout from "@/Layouts/Authenticated";
import { type PageProps } from "@/types";
import { TabOverviewCard } from "@/Components/TabOverviewCard";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";

export interface TransactionShort {
	id: string;
	date: string;
	description: string;
	amount: number;
	user: string;
}

export interface TabOverview {
	id: string;
	name: string;
	description: string;
	lastTransactions: TransactionShort[];
}

export default function Landing({ auth }: PageProps) {
	const tabs: TabOverview[] = [
		{
			id: "1",
			name: "Some Title",
			description: "Some description",
			lastTransactions: [
				{
					id: "1",
					date: "21.01.2024",
					description: "Some description",
					amount: 33.23,
					user: "Andrey",
				},
				{
					id: "2",
					date: "23.01.2024",
					description: "Some description",
					amount: 21.18,
					user: "Sonya",
				},
				{
					id: "3",
					date: "24.01.2024",
					description: "Some description",
					amount: 7.23,
					user: "Andrey",
				},
			],
		},
	];
	return (
		<AuthenticatedLayout user={auth.user}>
			<div className="pl-6 pt-6">
				{/* TODO: link */}
				<Button variant="outline">
					<Plus className="mr-2 h-4 w-4" /> Create new Tab
				</Button>
			</div>
			<div className="flex items-center justify-center gap-3 p-6">
				{tabs.map((tab) => (
					<TabOverviewCard key={tab.id} tab={tab} />
				))}
			</div>
		</AuthenticatedLayout>
	);
}
