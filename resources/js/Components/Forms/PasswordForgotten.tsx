import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/Components/ui/form";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

const PasswordForgottenSchema = z.object({
	email: z.string().email(),
});

type CardProps = React.ComponentProps<typeof Card>;

export function PasswordForgottenForm({ className, ...props }: CardProps) {
	// 1. Define your form.
	const form = useForm<z.infer<typeof PasswordForgottenSchema>>({
		resolver: zodResolver(PasswordForgottenSchema),
		defaultValues: {
			email: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof PasswordForgottenSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		// route("password.email")
		console.log(values);
	}

	return (
		<Card
			className={cn("w-xl shadow-md dark:border-primary-foreground", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle>Forgotten Password</CardTitle>
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
									<FormDescription>
										Forgot your password? No problem. Just let us know your
										email address and we will email you a password reset link
										that will allow you to choose a new one.
									</FormDescription>

									<FormMessage />
								</FormItem>
							)}
						/>
						<CardFooter className="flex items-center justify-end">
							<Button type="submit"> Email Password Reset Link</Button>
						</CardFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
