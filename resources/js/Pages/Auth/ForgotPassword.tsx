import GuestLayout from "@/Layouts/Guest";
import { Head } from "@inertiajs/react";
import { PasswordForgottenForm } from "@/Components/Forms/PasswordForgotten";

export default function ForgotPassword() {
	return (
		<GuestLayout>
			<Head title="Forgot Password" />
			<PasswordForgottenForm />
		</GuestLayout>
	);
}
