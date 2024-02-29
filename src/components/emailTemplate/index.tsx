'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import CustomTextArea from '../customTextArea/text-area';

export const metadata: Metadata = {
	title: 'Email Template',
	description: 'Preview and modify email message',
};

type FormValues = {
	id: number;
	header: string;
	body: string;
	footer: string;
};

export default function EmailTemplatePage({
	template,
}: { template: FormValues }) {
	const [templateState, setTemplateState] = useState<FormValues>({
		id: +template.id,
		header: template?.header,
		body: template?.body,
		footer: template?.footer,
	});

	return (
		<>
			<div className="hidden h-full flex-col md:flex">
				<div className="container flex flex-col items-start space-y-2 py-4">
					<h2 className="text-lg font-semibold">Email Template</h2>
					<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
						Modify email message
					</p>
				</div>
				<Separator />
				<Tabs defaultValue="complete" className="flex-1">
					<div className="container h-full py-6">
						<div className="grid h-full items-stretch gap-6 md:grid-cols-[400px_1fr]">
							<div className="hidden flex-col space-y-4 sm:flex md:order-2">
								<div className="grid gap-2">
									<HoverCard openDelay={200}>
										<HoverCardTrigger asChild>
											<span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
												Preview
											</span>
										</HoverCardTrigger>
										<HoverCardContent className="w-[320px] text-sm" side="left">
											Modify the email message and see the preview here.
										</HoverCardContent>
									</HoverCard>
								</div>

								<Preview templateState={templateState} />
							</div>
							<div className="md:order-1">
								<TabsContent value="complete" className="mt-0 border-0 p-0">
									<div className="flex h-full flex-col space-y-4">
										<CustomTextArea
											className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
											label={'Message Body'}
											templateState={templateState}
											setTemplateState={setTemplateState}
										/>
									</div>
								</TabsContent>
							</div>
						</div>
					</div>
				</Tabs>
			</div>
		</>
	);
}

function Preview({ templateState }: { templateState: FormValues }) {
	return (
		<div className="flex justify-center h-full bg-white rounded-md p-5 border text-tremor-default">
			<div className="flex flex-col space-y-4 max-w-lg text-tremor-content">
				<div className="w-full border border-gray-200 rounded-md">
					<div className="relative h-28 bg-gradient-to-tr from-blue-900 to-indigo-400 overflow-hidden">
						<Image
							src="/images/logo.svg"
							alt="CornerMail"
							width={60}
							height={60}
							className="absolute -top-1 -left-1"
						/>
					</div>
					<div className="flex flex-col p-9">
						<h2 className="text-lg font-extrabold mb-4">
							Unleash Your Potential
						</h2>
						<div className="flex flex-col space-y-2">
							<div
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{
									__html: `${templateState.body}`,
								}}
							/>
						</div>

						<div className="flex text-center flex-col space-y-2 mt-5">
							<p className="text-tremor-label text-tremor-brand">
								© 2023 CornerMail
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
