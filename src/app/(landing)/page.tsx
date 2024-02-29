import { Features, HeroSection } from '@/app/(landing)/_components';

export default async function IndexPage() {
	return (
		<main className="bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
				<HeroSection />
				<Features />
			</div>
		</main>
	);
}
