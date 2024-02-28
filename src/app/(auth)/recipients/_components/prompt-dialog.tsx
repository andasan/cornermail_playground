'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FormSchema = z.object({
	type: z.enum(['100', '200', '300', '500'], {
		required_error: 'You need to select a batch amount.',
	}),
});

type PromptDialogProps = {
	openPrompt: boolean;
	setOpenPrompt: (open: boolean) => void;
	setBatchAmount: (amount: number) => void;
};

export function PromptDialog({
	openPrompt,
	setOpenPrompt,
	setBatchAmount,
}: PromptDialogProps) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setOpenPrompt(false);
		setBatchAmount(parseInt(data.type));
	}

	return (
		<Dialog open={openPrompt} onOpenChange={setOpenPrompt}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Batch Email</DialogTitle>
					<DialogDescription>Select amount to batch per hour</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-2/3 space-y-6"
						>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col space-y-1"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="100" />
													</FormControl>
													<FormLabel className="font-normal">
														100 recipients
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="200" />
													</FormControl>
													<FormLabel className="font-normal">
														200 recipients
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="300" />
													</FormControl>
													<FormLabel className="font-normal">
														300 recipients
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="500" />
													</FormControl>
													<FormLabel className="font-normal">
														500 recipients
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
