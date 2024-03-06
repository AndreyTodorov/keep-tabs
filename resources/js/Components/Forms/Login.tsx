import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/Components/ui/form";
import { PasswordInput } from "../ui/password-input";
import { Link, router } from "@inertiajs/react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

const userLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
});

type CardProps = React.ComponentProps<typeof Card>;

export function LoginForm({ className, ...props }: CardProps) {
	// 1. Define your form.
	const form = useForm<z.infer<typeof userLoginSchema>>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// TODO: reset password after load

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof userLoginSchema>) {
		router.post(route("login"), { ...values, user_id: 2 });
	}

	return (
		<Card
			className={cn(
				"max-w-xl shadow-md dark:border-primary-foreground",
				className,
			)}
			{...props}
		>
			<CardHeader>
				<CardTitle>Login</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input className="max-w-xl" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput className="max-w-xl" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<CardFooter className="flex justify-between gap-3 p-2">
							{/* // TODO add remember me */}
							<div className="flex items-center gap-1">
								<Link
									href={route("register")}
									className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
								>
									Create account
								</Link>
								<span>or</span>
								<Link
									href={route("password.request")}
									className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
								>
									Forgot password?
								</Link>
							</div>

							<Button type="submit">Log in</Button>
						</CardFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
