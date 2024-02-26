'use client';

import { Dropzone, FileWithPath, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import {
	IconCloudUpload,
	IconFileSpreadsheet,
	IconX,
} from '@tabler/icons-react';
import { useState } from 'react';

import {
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';

export default function UploadDrawer() {
	const [fileState, setFileState] = useState<FileWithPath>();

	return (
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle> Upload a CSV file</DrawerTitle>
				<DrawerDescription>
					Upload a CSV file to import your contacts
				</DrawerDescription>
			</DrawerHeader>
			<div className="p-4 pb-0">
				<Dropzone
					onDrop={(files) => setFileState(files[0])}
					onReject={(files) => console.log('rejected files', files)}
					maxSize={3 * 1024 ** 2}
					accept={MS_EXCEL_MIME_TYPE}
					className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-tremor-brand focus:ring-opacity-50 hover:border-tremor-brand hover:ring-tremor-brand hover:ring-opacity hover:bg-gray-500 hover:bg-opacity-10 transition-all"
					// {...form.getInputProps("file")}
				>
					<Dropzone.Accept>
						<IconFileSpreadsheet
							size={50}
							stroke={1.5}
							// color={
							// 	theme.colors[theme.primaryColor][
							// 		theme.colorScheme === "dark" ? 4 : 6
							// 	]
							// }
						/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<IconX
							size={50}
							stroke={1.5}
							// color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
						/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconCloudUpload size={50} stroke={1.5} />
					</Dropzone.Idle>

					<div>
						{fileState ? (
							<>
								<p className="text-2xl">Filename: {fileState?.name}</p>
								<p className="text-tremor-brand-muted text-sm mt-7">
									{/* Size: {formatBytes(fileState?.size)} */}
									File should not exceed 5mb
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
	);
}
