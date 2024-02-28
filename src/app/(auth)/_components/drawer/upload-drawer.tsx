'use client';

import { Dropzone, FileWithPath, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import {
	IconCloudUpload,
	IconFileSpreadsheet,
	IconX,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { useToast } from '@/components/ui/use-toast';
import { readFile } from '@/lib/xlsx';
import { formatBytes } from '@/utils/formatBytes';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function addRecipientAPI(data: any) {
	const response = await fetch('/api/recipient/add-recipients', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		console.error(response.json());
		throw new Error('Network response was not ok');
	}

	return response.json();
}

async function readFileAsync(file: FileWithPath) {
	const jsonData = await readFile(file);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const remapRecords = jsonData.slice(1).map((item: any) => {
		const [organizationId, firstName, lastName, identifier, email] = item;
		return {
			firstName,
			lastName,
			email,
			organizationId,
			identifier,
			batch: new Date().getFullYear() - 1,
		};
	});

	if (!remapRecords) return false;

	document.getElementById('drawer-close-button')?.click();
	addRecipientAPI(remapRecords);

	return true;
}

export default function UploadDrawer() {
	const [fileState, setFileState] = useState<FileWithPath>();
	const { toast } = useToast();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (fileState) {
			readFileAsync(fileState).then((res) => {
				if (res) {
					toast({
						title: 'File Upload',
						description: 'File uploaded successfully',
					});
				} else {
					toast({
						title: 'File Upload',
						description: 'File upload failed',
						variant: 'destructive',
					});
				}
			});
		}
	}, [fileState]);

	return (
		<>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle> Upload a CSV file</DrawerTitle>
					<DrawerDescription>
						Upload a CSV file to import your contacts
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-4 pb-4">
					<Dropzone
						onDrop={(files) => setFileState(files[0])}
						onReject={(files) => console.log('rejected files', files)}
						maxSize={3 * 1024 ** 2}
						accept={MS_EXCEL_MIME_TYPE}
						className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-tremor-brand focus:ring-opacity-50 hover:border-tremor-brand hover:ring-tremor-brand hover:ring-opacity hover:bg-gray-500 hover:bg-opacity-10 transition-all"
					>
						<Dropzone.Accept>
							<IconFileSpreadsheet size={50} stroke={1.5} />
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX size={50} stroke={1.5} />
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconCloudUpload size={50} stroke={1.5} />
						</Dropzone.Idle>

						<div>
							{fileState ? (
								<>
									<p className="text-2xl">Filename: {fileState?.name}</p>
									<p className="text-tremor-brand-muted text-sm mt-7">
										Size: {formatBytes(fileState?.size)}
									</p>
								</>
							) : (
								<>
									<p className="text-2xl">
										Drag spreadsheet here or click to select files
									</p>
									<p className="text-tremor-brand-muted text-xl mt-7">
										File should not exceed 5mb
									</p>
								</>
							)}
						</div>
					</Dropzone>
				</div>
			</DrawerContent>
			<DrawerClose id="drawer-close-button" />
		</>
	);
}
