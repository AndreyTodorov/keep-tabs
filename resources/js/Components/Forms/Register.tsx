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
import { cn } from "@/lib/utils";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "../ui/card";

const userRegisterSchema = z
	.object({
		name: z.string().min(2).max(50),
		email: z.string().email(),
		password: z.string().min(4),
		confirmPassword: z.string().min(4),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
type CardProps = React.ComponentProps<typeof Card>;

export function RegisterForm({ className, ...props }: CardProps) {
	// 1. Define your form.
	const form = useForm<z.infer<typeof userRegisterSchema>>({
		resolver: zodResolver(userRegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof userRegisterSchema>) {
		router.post(route("register"), { values });
	}

	return (
		<Card
			className={cn("w-xl shadow-md dark:border-primary-foreground", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle>Create Account</CardTitle>
				{/* <CardDescription>{tab.description}</CardDescription> */}
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input className="max-w-xl" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<PasswordInput className="max-w-xl" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<CardFooter className="flex items-center justify-between">
							<Link
								href={route("login")}
								className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
							>
								Already registered?
							</Link>
							<Button type="submit">Create</Button>
						</CardFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
