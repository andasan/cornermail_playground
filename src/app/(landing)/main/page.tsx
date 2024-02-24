import Header from "@/components/home/header";
import {
	Blog,
	CallToAction,
	Features,
	HeroSection,
	Stats,
	Testimonials,
} from "@/pages/main";

export default async function IndexPage() {
	return (
		<>
			<Header />
			<main className="bg-white dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<HeroSection />
					<Features />
					{/* <Stats /> */}
					{/* <Testimonials /> */}
					{/* <CallToAction /> */}
					{/* <Blog /> */}
				</div>
			</main>
		</>
	);
}
