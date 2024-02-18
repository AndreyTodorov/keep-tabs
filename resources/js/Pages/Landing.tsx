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
	description: string;
	amount: string;
	user: UserShort;
}

export interface TabOverview {
	id: string;
	name: string;
	description: string;
	transactions: TransactionShort[];
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
			<div className="flex items-center justify-center gap-3 p-6">
				{tabs.map((tab) => (
					<TabOverviewCard key={tab.id} tab={tab} />
				))}
			</div>
		</AuthenticatedLayout>
	);
}
