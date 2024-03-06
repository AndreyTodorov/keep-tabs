import GuestLayout from "@/Layouts/Guest";
import { Head } from "@inertiajs/react";
import { RegisterForm } from "@/Components/Forms/Register";

export default function Register() {
	return (
		<GuestLayout>
			<Head title="Register" />
			<RegisterForm className="min-w-[400px]" />
		</GuestLayout>
	);
}
