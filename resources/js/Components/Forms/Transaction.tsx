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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/Components/ui/popover";
import { DATE_FORMATS } from "@/lib/dateFormats";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "../ui/card";

const transactionSchema = z.object({
	date: z.date(),
	amount: z.number(),
	comment: z.string().max(200),
	description: z.string().max(200),
});

// TODO: move to types
type CardProps = React.ComponentProps<typeof Card> & {
	transaction?: z.infer<typeof transactionSchema>;
};

export function TransactionForm({
	transaction,
	className,
	...props
}: CardProps) {
	const isEditing = !!transaction;
	// 1. Define your form.
	const form = useForm<z.infer<typeof transactionSchema>>({
		resolver: zodResolver(transactionSchema),
		defaultValues: transaction ?? {
			date: dayjs().toDate(),
			amount: 0,
			comment: "",
			description: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof transactionSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	return (
		<Card
			className={cn("w-xl shadow-md dark:border-primary-foreground", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle>{isEditing ? "Edit" : "Create"} Transaction</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						{/* <div className="flex items-center gap-3"> */}
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											type="number"
											inputMode="numeric"
											className="w-48"
											{...field}
											onChange={(e) => {
												if (e.target.value === "")
													return field.onChange(undefined);
												field.onChange(Number(e.target.value));
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Date</FormLabel>
									<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className={cn(
														"w-48 text-left font-normal",
														!field.value && "text-muted-foreground",
													)}
												>
													{field.value ? (
														dayjs(field.value).format(DATE_FORMATS.DATE_FORMAT)
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={(date) => {
													field.onChange(date);
													setIsPopoverOpen(false);
												}}
												disabled={(date) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* </div> */}
						<FormField
							control={form.control}
							name="comment"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Comment</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us a little bit about yourself"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex items-center justify-end">
				<Button type="submit">{isEditing ? "Edit" : "Add"}</Button>
			</CardFooter>
		</Card>
	);
}
