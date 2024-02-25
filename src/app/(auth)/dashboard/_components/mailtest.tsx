import { sendEmail, testSend } from '@/actions/brevo';

export default function MailTest() {
	return (
		<>
			<button
				type="button"
				onClick={async () => {
					const message = await sendEmail();
					console.log(message);
				}}
				className="mr-2 px-4 py-2 text-white bg-tremor-brand dark:bg-dark-tremor-brand"
			>
				SEND TEST EMAIL
			</button>
			<button
				type="button"
				onClick={async () => {
					try {
						const message = await testSend({
							email: 'andasan@gmail.com',
							firstName: 'Francois',
							lastName: 'Polo',
							folder: '2023',
						});
						console.log('success: ', message);
					} catch (e) {
						console.error('failed: ', e);
					}
				}}
				className="mr-2 px-4 py-2 text-white bg-tremor-brand dark:bg-dark-tremor-brand"
			>
				SEND TEST EMAIL WITH PDF
			</button>
		</>
	);
}
