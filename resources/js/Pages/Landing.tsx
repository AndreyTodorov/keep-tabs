import AuthenticatedLayout from "@/Layouts/Authenticated";
import { type PageProps } from "@/types";
import { TabOverviewCard } from "@/Components/TabOverviewCard";
import { TabCreateDialog } from "@/Components/Forms/TabCreate";
import { Head } from "@inertiajs/react";

// TODO: move to types
interface UserShort {
	id: number;
	name: string;
}
export interface TransactionShort {
	id: string;
	date: string;
	comment: string;
	amount: string;
	user: UserShort;
}

export interface CurrentBalance {
	user: { id: number; name: string };
	transactionsSum: number;
	summaryBalance: number;
	total: number;
}

export interface TabOverview {
	id: string;
	name: string;
	description: string;
	creator_id: number;
	transactions: TransactionShort[];
	currentBalances: CurrentBalance[];
	users: UserShort[];
}

interface LandingProps extends PageProps {
	tabs: TabOverview[];
}

export default function Landing({ auth, tabs }: LandingProps) {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Welcome" />

			<div className="pl-6 pt-6">
				<TabCreateDialog />
			</div>
			<div
				className={
					"xs:flex-col items-center justify-center gap-3 space-y-3 p-6 sm:flex"
				}
			>
				{tabs.map((tab) => (
					<TabOverviewCard key={tab.id} tab={tab} />
				))}
			</div>
		</AuthenticatedLayout>
	);
}
