import { create } from 'zustand';

import { Recipient } from '@/app/(auth)/recipients/_data/schema';

type Store = {
	recipients: Recipient[];
	addAllRecipients: (recipients: Recipient[]) => void;
	addRecipient: (recipient: Recipient) => void;
	editRecipient: (recipient: Recipient) => void;
	editAttachmentById: (id: string, withAttachment: boolean) => void;
	editStatusByEmail: (email: string, status: string) => void;
	editStatusById: (id: string, status: string) => void;
	getRecipientsInIdle: () => Recipient[];
	deleteRecipient: (id: string) => void;
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
	editStatusByEmail: (email: string, status: string) =>
		set((state) => ({
			recipients: state.recipients.map((r) => {
				console.log(r.email, email, r.email === email, status);
				if (r.email === email) {
					console.log('match');
					return { ...r, status };
				}
				return r;
			}),
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
	deleteRecipient: (id: string) =>
		set((state) => ({
			recipients: state.recipients.filter((r) => r.organizationId !== id),
		})),
}));
