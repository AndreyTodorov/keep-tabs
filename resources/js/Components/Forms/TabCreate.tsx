import { Minus, Plus } from "lucide-react";
import { router } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";

const tabCreateSchema = z.object({
	name: z.string().max(50),
	description: z.string().max(200).optional(),
	users: z.array(z.object({ email: z.string().email() })),
});

export function TabCreateDialog() {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof tabCreateSchema>>({
		resolver: zodResolver(tabCreateSchema),
		defaultValues: {
			name: "",
			description: "",
			users: [{ email: "" }],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "users",
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof tabCreateSchema>) {
		router.post(
			route("tab.store"),
			{ ...values },
			{
				onSuccess: () => {
					toast.success("Tab has been created.");
					setOpen(false);
					form.reset();
				},
				onError: (err) => {
					toast.error("An error occured!", {
						description: (
							<div className="flex flex-col gap-2">
								{Object.values(err).map((val, index) => (
									<span key={index}>{val}</span>
								))}
							</div>
						),
					});
				},
			},
		);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Plus className="mr-2 h-4 w-4" /> Create new Tab
				</Button>
			</DialogTrigger>
			<DialogContent className="text-primary sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Create new Tab</DialogTitle>
					<DialogDescription>
						Fill out the information for your new tab
					</DialogDescription>
				</DialogHeader>
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

						{fields.map((item, index) => {
							// TODO: add dropdown with emails search
							return (
								<div
									key={item.id}
									className="flex w-full items-center justify-between gap-2"
								>
									<FormField
										control={form.control}
										name={`users.${index}.email`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{`User ${index + 1}`}</FormLabel>
												<FormControl>
													<Input className="w-[300px]" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="flex gap-1">
										<Button variant="outline">
											<Minus
												className="h-4 w-4 text-red-600"
												onClick={() => remove(index)}
											/>
										</Button>
										<Button
											variant="outline"
											onClick={() => append({ email: "" })}
										>
											<Plus className="h-4 w-4 text-green-600" />
										</Button>
									</div>
								</div>
							);
						})}

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Optional description"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="secondary">
									Close
								</Button>
							</DialogClose>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
