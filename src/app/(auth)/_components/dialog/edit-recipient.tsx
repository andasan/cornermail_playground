'use client';

import { Button } from '@/components/ui/button';
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import useEditRecipient, {
	EditRecipientProps,
} from './_hooks/useEditRecipient';

export function EditRecipient({ recipient, setOpen }: EditRecipientProps) {
	const { form, onSubmit } = useEditRecipient({ recipient, setOpen });

	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Edit profile</DialogTitle>
				<DialogDescription>
					Make changes to your profile here. Click save when you&apos;re done.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<div className="grid grid-cols-4 items-center gap-4">
										<FormLabel className="text-right">First Name</FormLabel>
										<Input {...field} className="col-span-3" />
										<FormMessage className="col-span-4 text-right" />
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<div className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Last Name</FormLabel>
									<Input {...field} className="col-span-3" />
									<FormMessage className="col-span-4 text-right" />
								</div>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<div className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Email</FormLabel>
									<Input {...field} className="col-span-3" />
									<FormMessage className="col-span-4 text-right" />
								</div>
							)}
						/>

						<FormField
							control={form.control}
							name="batch"
							render={({ field }) => (
								<div className="grid grid-cols-4 items-center gap-4">
									<FormLabel className="text-right">Batch</FormLabel>
									<Input {...field} className="col-span-3" />
									<FormMessage className="col-span-4 text-right" />
								</div>
							)}
						/>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<div className="grid grid-cols-4 items-center gap-4">
										<FormLabel className="text-right">Status</FormLabel>
										<div className="col-span-3">
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a status" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="idle">Idle</SelectItem>
													<SelectItem value="sent">Sent</SelectItem>
													<SelectItem value="bounced">Bounced</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage className="col-span-4 text-right" />
										</div>
									</div>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</Form>
			</div>
		</DialogContent>
	);
}
