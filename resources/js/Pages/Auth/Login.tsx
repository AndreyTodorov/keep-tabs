import { Head } from "@inertiajs/react";
import Guest from "@/Layouts/Guest";
import { LoginForm } from "@/Components/Forms/Login";

export default function Login() {
	return (
		<Guest>
			<Head title="Log in" />
			<LoginForm />
		</Guest>
	);
}
