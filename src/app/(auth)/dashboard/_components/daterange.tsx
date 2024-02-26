import { DateRangePicker, DateRangePickerValue } from '@tremor/react';
import { Dispatch, SetStateAction } from 'react';

export type DateRangeProps = {
	dateRange: DateRangePickerValue;
	setDateRange: Dispatch<SetStateAction<DateRangePickerValue>>;
};

export default function DateRange({ dateRange, setDateRange }: DateRangeProps) {
	return (
		<div className="mx-auto max-w-md space-y-3">
			<p className="pt-6 text-center font-mono text-sm text-slate-500">
				Filter by date(s)
			</p>
			<DateRangePicker
				className="mx-auto max-w-md"
				value={dateRange}
				onValueChange={setDateRange}
			/>
		</div>
	);
}
