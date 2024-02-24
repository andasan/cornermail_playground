import { cn } from "@/utils/classnames";

type ContainerProps = {
	children: React.ReactNode;
	isNav?: boolean;
};

export default function Container({ children, isNav }: ContainerProps) {
	return (
		<div
			className={cn(
				"max-w-7xl mx-auto px-6 md:px-12 xl:px-6",
				isNav ?? "py-24",
			)}
		>
			{children}
		</div>
	);
}
