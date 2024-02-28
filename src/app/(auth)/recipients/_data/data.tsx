import {
	CheckCircledIcon,
	CrossCircledIcon,
	QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';

export const selections = [
	{
		label: 'Send Selected',
		value: 'selected',
	},
	{
		label: 'Send All',
		value: 'all',
	},
];

export const statuses = [
	{
		value: 'idle',
		label: 'Idle',
		icon: QuestionMarkCircledIcon,
	},
	{
		value: 'sent',
		label: 'Sent',
		icon: CheckCircledIcon,
	},
	{
		value: 'bounced',
		label: 'Bounced',
		icon: CrossCircledIcon,
	},
];
