import cloudinaryApi from '@/actions/checkAttachment';
import { getBounced } from '@/actions/getBounced';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DrawerTrigger } from '@/components/ui/drawer';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRecipientStore } from '@/store/recipientStore';
import { config } from '@/utils/config';

export function UserNav({
	src,
	userName,
	email,
}: {
	src: string;
	userName: string;
	email: string;
}) {
	const { recipients, editAttachmentById, editStatusByEmail } =
		useRecipientStore();

	const handleCheckAttachment = async () => {
		const result = await cloudinaryApi(
			recipients,
			config.cloudinary.folder_name_public,
		);

		for (const id of result) {
			editAttachmentById(id, true);
		}
	};

	const handleCheckBounces = async () => {
		const result = await getBounced();

		for (const recipient of result[0]) {
			editStatusByEmail(recipient.email, 'bounced');
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={src}
							className="h-8 w-8"
							referrerPolicy="no-referrer"
						/>
						<AvatarFallback>
							{userName.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{userName}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem disabled>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleCheckAttachment}>
						Check for Attachments
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleCheckBounces}>
						Check for Bounces
					</DropdownMenuItem>
					<DrawerTrigger asChild>
						<DropdownMenuItem>Upload Students</DropdownMenuItem>
					</DrawerTrigger>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
