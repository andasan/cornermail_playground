import Container from '@/app/(landing)/_components/sectionwrapper/container';

export default function Hero() {
	return (
		<div className="relative" id="home">
			<div
				aria-hidden="true"
				className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
			>
				<div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
				<div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
			</div>
			<Container>
				<div className="relative pt-36 ml-auto">
					<div className="lg:w-2/3 text-center mx-auto">
						<h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
							Unleash the Power of Bulk Emailing,{' '}
							<span className="text-primary dark:text-white">
								Effortlessly.
							</span>
						</h1>
						<p className="mt-8 text-gray-700 dark:text-gray-300">
							Welcome to CornerMail, your ultimate destination for elevating
							your bulk email campaigns. Designed for simplicity and power,
							CornerMail lets you effortlessly send personalized emails in bulk
							and import email lists directly from your Excel sheets.
						</p>
						<div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
							<a
								href="/"
								className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
							>
								<span className="relative text-base font-semibold text-white">
									Get started
								</span>
							</a>
							<a
								href="/"
								className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
							>
								<span className="relative text-base font-semibold text-primary dark:text-white">
									Learn more
								</span>
							</a>
						</div>
						<div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
							<div className="text-left">
								<h6 className="text-lg font-semibold text-gray-700 dark:text-white text-center">
									Effortless Bulk Emailing
								</h6>
							</div>
							<div className="text-left">
								<h6 className="text-lg font-semibold text-gray-700 dark:text-white text-center">
									Excel Sheet Integration
								</h6>
							</div>
							<div className="text-left">
								<h6 className="text-lg font-semibold text-gray-700 dark:text-white text-center">
									Customizable Email Templates
								</h6>
							</div>
						</div>
					</div>
					<div className="mt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
						{/* <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6"> */}
						<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
							<img
								src="./images/clients/ciccc.svg"
								className="h-12 w-auto mx-auto"
								loading="lazy"
								alt="ciccc logo"
								width=""
								height=""
							/>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}
