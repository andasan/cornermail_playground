import { getData } from '@/actions/getDummyEmailContent';
import EmailTemplatePage from '@/components/emailTemplate';

export const metadata = {
	title: 'Email Template',
	description: 'Preview of the email template for the CornerMail application.',
};

export default async function EmailTemplate() {
	const [template] = await getData();

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<EmailTemplatePage template={template} />
		</main>
	);
}
