import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import {
	DataTableFacetedFilterProps,
	useBulkFilter,
} from '@/app/(auth)/recipients/_hooks/useBulkFilter';
import { PromptDialog } from '../prompt-dialog';

export function DataTableBulkFilter<TData, TValue>({
	title,
	options,
	someRowsSelected,
	selectedRows,
}: DataTableFacetedFilterProps<TData, TValue>) {
	const {
		selectedOption,
		setSelectedOption,
		open,
		setOpen,
		handleSubmit,
		openPrompt,
		setOpenPrompt,
		setBatchAmount,
	} = useBulkFilter(selectedRows);

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" size="sm" className="h-8 border-dashed">
						<PlusCircledIcon className="mr-2 h-4 w-4" />
						{title}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0" align="start">
					<Command>
						<CommandList>
							<CommandGroup>
								{options.map((option) => {
									return (
										<CommandItem
											key={option.value}
											onSelect={() => {
												if (option.value === 'selected' && !someRowsSelected) {
													return;
												}
												setSelectedOption(option.value);
											}}
											className={cn(
												'flex items-center',
												option.value === 'selected' && !someRowsSelected
													? 'opacity-20 cursor-not-allowed'
													: '',
											)}
										>
											<div
												className={cn(
													'mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary',
													selectedOption === option.value
														? 'bg-primary text-primary-foreground'
														: 'opacity-50 [&_svg]:invisible',
												)}
											>
												<CheckIcon className={cn('h-4 w-4')} />
											</div>
											<span>{option.label}</span>
										</CommandItem>
									);
								})}
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup>
								<CommandItem
									onSelect={handleSubmit}
									className="justify-center text-center hover:bg-primary"
								>
									Submit
								</CommandItem>
								<CommandSeparator />
								<CommandItem
									onSelect={() => setOpen(false)}
									className="justify-center text-center hover:bg-destructive"
								>
									Cancel
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<PromptDialog
				openPrompt={openPrompt}
				setOpenPrompt={setOpenPrompt}
				setBatchAmount={setBatchAmount}
			/>
		</>
	);
}
