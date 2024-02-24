import Container from "@/app/(landing)/_components/sectionwrapper/container";

export default function Footer() {
	return (
		<footer className="py-20 md:py-40">
			<Container>
				<div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
					<div className="flex flex-wrap items-center justify-between md:flex-nowrap">
						<div className="flex w-full justify-center space-x-12 text-gray-600 dark:text-gray-300 sm:w-7/12 md:justify-start">
							<ul className="space-y-8">
								<li>
									<a
										href="/"
										className="flex items-center space-x-3 transition hover:text-primary"
									>
										{/* <?xml version="1.0" encoding="UTF-8"?> */}
										<svg
											width="24px"
											height="21px"
											viewBox="0 0 74 71"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											xmlnsXlink="http://www.w3.org/1999/xlink"
										>
											<title>Shape</title>
											<g
												id="Desktop"
												stroke="none"
												strokeWidth="1"
												fill="none"
												fillRule="evenodd"
											>
												<g
													id="HOMEPAGE"
													transform="translate(-79.000000, -5295.000000)"
													fill="#FFFFFF"
													fillRule="nonzero"
												>
													<path
														d="M100.11811,5339.27511 C100.11811,5338.01494 101.173228,5336.98528 102.464567,5336.98528 L102.874016,5336.98528 C104.165354,5336.98528 105.220472,5338.01494 105.220472,5339.27511 L105.220472,5356.67165 L107.456693,5358.8539 L107.456693,5338.84481 C107.456693,5337.83052 108.307087,5336.98528 109.362205,5336.98528 L109.692913,5336.98528 C110.748031,5336.98528 111.598425,5337.81515 111.598425,5338.84481 L111.598425,5362.89567 L114.779528,5366 L114.779528,5338.49134 C114.779528,5337.66147 115.472441,5336.96991 116.338583,5336.96991 L116.606299,5336.96991 C117.456693,5336.96991 118.165354,5337.6461 118.165354,5338.49134 L118.165354,5365.07792 L122.543307,5360.80563 L122.543307,5338.09177 C122.543307,5337.47706 123.047244,5336.98528 123.677165,5336.98528 L123.866142,5336.98528 C124.496063,5336.98528 125,5337.47706 125,5338.09177 L125,5358.40823 L128.92126,5354.5816 L128.92126,5337.96883 C128.92126,5337.43095 129.377953,5336.96991 129.944882,5336.96991 L130.11811,5336.96991 C130.669291,5336.96991 131.141732,5337.41558 131.141732,5337.96883 L131.141732,5352.43009 L153,5331.09935 L115.992126,5295 L79,5331.09935 L100.102362,5351.69242 L100.102362,5339.27511 L100.11811,5339.27511 Z M90,5328.5 C90,5327.67826 90.8,5327 91.7692308,5327 L137.230769,5327 C138.2,5327 139,5327.67826 139,5328.5 C139,5329.32174 138.2,5330 137.230769,5330 L91.7692308,5330 C90.8,5330 90,5329.32174 90,5328.5 L90,5328.5 Z M95,5334.5 C95,5333.67742 95.6506584,5333 96.4407436,5333 L133.559256,5333 C134.349342,5333 135,5333.67742 135,5334.5 C135,5335.32258 134.349342,5336 133.559256,5336 L96.4407436,5336 C95.6506584,5336 95,5335.32258 95,5334.5 L95,5334.5 Z"
														id="Shape"
													/>
												</g>
											</g>
										</svg>
										<span>CICCC</span>
									</a>
								</li>
							</ul>
						</div>
						<div className="m-auto mt-16 w-10/12 space-y-6 text-center sm:mt-auto sm:w-5/12 sm:text-left">
							<span className="block text-gray-500 dark:text-gray-400">
								Efficiency Redefined: Bulk Emailing Made Seamless.
							</span>

							<span className="block text-gray-500 dark:text-gray-400">
								CornerMail &copy; <span id="year" />
							</span>

							<span className="flex justify-between text-gray-600 dark:text-white">
								<a href="/" className="font-medium">
									Terms of Use{" "}
								</a>
								<a href="/" className="font-medium">
									{" "}
									Privacy Policy
								</a>
							</span>

							<span className="block text-gray-500 dark:text-gray-400">
								Need help?{" "}
								<a
									href="/"
									className="font-semibold text-gray-600 dark:text-white"
								>
									{" "}
									Contact Us
								</a>
							</span>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	);
}
