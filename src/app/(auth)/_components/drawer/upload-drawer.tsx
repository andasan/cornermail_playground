import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';

export default function UploadDrawer() {
	return (
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Are you absolutely sure?</DrawerTitle>
				<DrawerDescription>This action cannot be undone.</DrawerDescription>
			</DrawerHeader>
			<div className="p-4 pb-0">
				{/* <Dropzone
          onDrop={(files) => setFileState(files[0])}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={MS_EXCEL_MIME_TYPE}
          {...form.getInputProps('file')}
          //   {...props}
        >
          <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconFileSpreadsheet
                size={50}
                stroke={1.5}
                color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={50}
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={50} stroke={1.5} />
            </Dropzone.Idle>

            <div>
              {fileState ? (
                <>
                  <Text size="xl" inline>
                    Filename: {fileState?.name}
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Size: {formatBytes(fileState?.size)}
                  </Text>
                </>
              ) : (
                <>
                  <Text size="xl" inline>
                    Drag spreadsheet here or click to select files
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    File should not exceed 5mb
                  </Text>
                </>
              )}
            </div>
          </Group>
        </Dropzone> */}
			</div>
			<DrawerFooter>
				<Button>Submit</Button>
				<DrawerClose>
					<Button variant="outline">Cancel</Button>
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	);
}
