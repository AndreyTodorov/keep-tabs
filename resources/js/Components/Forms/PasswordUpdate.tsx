import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/Components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/Components/ui/form";
import { PasswordInput } from "../ui/password-input";
import { cn } from "@/lib/utils";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
	CardDescription,
} from "../ui/card";
import { router } from "@inertiajs/react";

const PasswordUpdateSchema = z
	.object({
		currentPassword: z.string().min(8),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
type CardProps = React.ComponentProps<typeof Card>;

export function PasswordUpdateForm({ className, ...props }: CardProps) {
	// 1. Define your form.
	const form = useForm<z.infer<typeof PasswordUpdateSchema>>({
		resolver: zodResolver(PasswordUpdateSchema),
		defaultValues: {
			currentPassword: "",
			password: "",
			confirmPassword: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof PasswordUpdateSchema>) {
		router.post(
			route("password.update"),
			{ values },
			{ onSuccess: () => form.reset(), onError: () => form.reset() },
		);
	}

	return (
		<Card
			className={cn("w-xl shadow-md dark:border-primary-foreground", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle>Update Password</CardTitle>
				<CardDescription>
					Ensure your account is using a long, random password to stay secure.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="currentPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current Password</FormLabel>
									<FormControl>
										<PasswordInput className="max-w-xl" {...field} />
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
									<FormLabel>New Password</FormLabel>
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
									<FormLabel>Confirm new password</FormLabel>
									<FormControl>
										<PasswordInput className="max-w-xl" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<CardFooter className="flex items-center justify-end">
							{/* TODO: add loading indicator  */}
							<Button type="submit">Save</Button>
						</CardFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
