import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { type PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/Authenticated";
import { TransactionForm } from "@/Components/Forms/Transaction";
import { PasswordUpdateForm } from "@/Components/Forms/PasswordUpdate";

export default function Edit({
	auth,
	mustVerifyEmail,
	status,
}: PageProps<{
	mustVerifyEmail: boolean;
	status?: string;
}>) {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Profile" />

			<div className="py-12">
				<div className="mx-auto max-w-xl space-y-6 sm:px-6 lg:px-8">
					<TransactionForm />
					<PasswordUpdateForm />

					<div className="bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8">
						<UpdateProfileInformationForm
							mustVerifyEmail={mustVerifyEmail}
							status={status}
							className="max-w-xl"
						/>
					</div>

					<div className="bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8">
						<UpdatePasswordForm className="max-w-xl" />
					</div>

					<div className="bg-white p-4 shadow dark:bg-gray-800 sm:rounded-lg sm:p-8">
						<DeleteUserForm className="max-w-xl" />
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
