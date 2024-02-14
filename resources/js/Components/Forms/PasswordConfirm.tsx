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
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { PasswordInput } from "../ui/password-input";

const PasswordConfirmSchema = z.object({
	password: z.string().min(4),
});

type CardProps = React.ComponentProps<typeof Card>;

export function PasswordConfirmForm({ className, ...props }: CardProps) {
	// 1. Define your form.
	const form = useForm<z.infer<typeof PasswordConfirmSchema>>({
		resolver: zodResolver(PasswordConfirmSchema),
		defaultValues: {
			password: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof PasswordConfirmSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		// route("password.confirm")
		console.log(values);
	}

	return (
		<Card
			className={cn("w-xl shadow-md dark:border-primary-foreground", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle>Confirm Password</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
						<CardFooter className="flex items-center justify-end">
							<Button type="submit"> Confirm</Button>
						</CardFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
