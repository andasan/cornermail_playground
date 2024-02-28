import { create } from 'zustand';

import { Recipient } from '@/app/(auth)/recipients/_data/schema';

type Store = {
	recipients: Recipient[];
	addAllRecipients: (recipients: Recipient[]) => void;
	addRecipient: (recipient: Recipient) => void;
	editRecipient: (recipient: Recipient) => void;
	editAttachmentById: (id: string, withAttachment: boolean) => void;
	editStatusById: (id: string, status: string) => void;
	getRecipientsInIdle: () => Recipient[];
};

export const useRecipientStore = create<Store>()((set, get) => ({
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
	editAttachmentById: (id: string, withAttachment: boolean) =>
		set((state) => ({
			recipients: state.recipients.map((r) =>
				r.organizationId === id ? { ...r, withAttachment } : r,
			),
		})),
	editStatusById: (id: string, status: string) =>
		set((state) => ({
			recipients: state.recipients.map((r) =>
				r.organizationId === id ? { ...r, status } : r,
			),
		})),
	getRecipientsInIdle: () => {
		return get().recipients.filter((r) => r.status === 'idle');
	},
}));
