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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/Components/ui/popover";
import { DATE_FORMATS } from "@/lib/dateFormats";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";
import AmountInput from "../ui/amount-input";
import { router } from "@inertiajs/react";

const transactionSchema = z.object({
	date: z.date(),
	amount: z.string(),
	comment: z.string().max(200),
});

// TODO: move to types
type TransactionDialogProps = React.ComponentProps<typeof Dialog> & {
	transaction?: z.infer<typeof transactionSchema>;
	tabID?: string;
};

export function TransactionDialogForm({
	transaction,
	tabID,
}: TransactionDialogProps) {
	const isEditing = !!transaction;
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	// 1. Define your form.
	const form = useForm<z.infer<typeof transactionSchema>>({
		resolver: zodResolver(transactionSchema),
		defaultValues: transaction ?? {
			date: dayjs().toDate(),
			amount: "",
			comment: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof transactionSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		router.post(
			route("transaction.store", { tab: tabID }),
			{ ...values, date: dayjs(values.date).endOf("day").toDate() },
			{
				onSuccess: () => setIsDialogOpen(false),
				onError: (err) => console.log(err),
			},
		);
	}

	console.log(form.watch("date"), form.watch("amount"));

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={(open) => {
				form.reset();
				setIsDialogOpen(open);
			}}
		>
			<DialogTrigger asChild>
				<Button className="w-full">
					<Plus className="mr-2 h-4 w-4" /> Add
				</Button>
			</DialogTrigger>
			<DialogContent className="text-primary sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Add new transaction</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<AmountInput
											required
											className="w-48"
											precision={2}
											{...field}
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
													date > new Date() || date < new Date("2024-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="comment"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Comment</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Some description"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>Here will live upload button for fotos</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="secondary">
									Close
								</Button>
							</DialogClose>
							<Button type="submit">{isEditing ? "Edit" : "Add"}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
