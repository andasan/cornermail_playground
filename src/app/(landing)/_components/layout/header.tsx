import Image from 'next/image';

import Container from '@/app/(landing)/_components/sectionwrapper/container';
import Brand from '@/components/logo';
import { ModeToggle } from '@/components/theme/color-scheme';
import AuthButton from './auth-button';

export default function Header() {
	return (
		<header>
			<nav className="z-10 w-full absolute">
				<Container isNav>
					<div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
						<input
							type="checkbox"
							name="toggle_nav"
							id="toggle_nav"
							className="hidden peer"
						/>
						<div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
							<a
								href="/"
								aria-label="logo"
								className="flex space-x-2 items-center"
							>
								<span className="text-2xl font-bold text-[#141D4F] dark:text-white">
									CornerMail
								</span>
								<div aria-hidden="true" className="flex space-x-1">
									<div className="w-full">
										<Brand />
									</div>
								</div>
							</a>

							<div className="relative flex items-center lg:hidden max-h-10">
								<label
									htmlFor="toggle_nav"
									aria-label="humburger"
									id="hamburger"
									className="relative  p-6 -mr-6"
								>
									<div
										aria-hidden="true"
										id="line"
										className="m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
									/>
									<div
										aria-hidden="true"
										id="line2"
										className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"
									/>
								</label>
							</div>
						</div>
						<div
							aria-hidden="true"
							className="fixed z-10 inset-0 h-screen w-screen bg-white/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"
						/>
						<div
							className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top
                            lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                            peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none
                            dark:shadow-none dark:border-gray-700"
						>
							<div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
								<ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
									<HomeNav />
								</ul>
							</div>
							<div className="lg:px-3">
								<ModeToggle />
							</div>

							<div className="relative mt-12 lg:mt-0">
								<AuthButton />
								<Image
									src="/images/arrow.svg"
									alt="hero"
									width="200"
									height="200"
									className="absolute top-0 right-0 hidden lg:block rotate-[270deg] bg-light-50 -translate-x-1/2 translate-y-10 scale-y-[-1]"
								/>
								<span className="absolute w-20 top-28 right-32 font-mono dark:text-dark-900 opacity-30">
									Dummy Sign In
								</span>
							</div>
						</div>
					</div>
				</Container>
			</nav>
		</header>
	);
}

function HomeNav() {
	const navItems = [
		{
			id: crypto.randomUUID(),
			name: 'Features',
			href: '#features',
		},
		// {
		// 	id: crypto.randomUUID(),
		// 	name: "Solution",
		// 	href: "#solution",
		// },
		// {
		// 	id: crypto.randomUUID(),
		// 	name: "Testimonials",
		// 	href: "#testimonials",
		// },
		// {
		// 	id: crypto.randomUUID(),
		// 	name: "Blog",
		// 	href: "#blog",
		// },
	];
	return (
		<>
			{navItems.map((item) => (
				<li key={item.id}>
					<a
						href={item.href}
						className="block md:px-4 transition hover:text-primary"
					>
						<span>{item.name}</span>
					</a>
				</li>
			))}
		</>
	);
}
