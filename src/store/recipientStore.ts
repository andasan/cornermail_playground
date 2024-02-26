import { create } from 'zustand';

import { Recipient } from '@/app/(auth)/recipients/_data/schema';

type Store = {
	recipients: Recipient[];
	addAllRecipients: (recipients: Recipient[]) => void;
	addRecipient: (recipient: Recipient) => void;
	editRecipient: (recipient: Recipient) => void;
};

export const useRecipientStore = create<Store>()((set) => ({
	recipients: [],

	addAllRecipients: (recipients: Recipient[]) => set({ recipients }),
	addRecipient: (recipient: Recipient) =>
		set((state) => ({ recipients: [...state.recipients, recipient] })),
	editRecipient: (recipient: Recipient) =>
		set((state) => ({
			recipients: state.recipients.map((r) =>
				r.organizationId === recipient.organizationId ? recipient : r,
			),
		})),
}));
