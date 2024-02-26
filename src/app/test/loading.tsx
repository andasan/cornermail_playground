export default function Loading() {
	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<div className="animate-pulse space-x-4">
				<div className="flex space-x-4">
					<div className="flex-1 space-y-6 py-1">
						{/* title/subtitle skeleton */}
						<div className="space-y-3">
							<div className="h-3 bg-slate-300 rounded w-10 " />
							<div className="h-2 bg-slate-300 rounded max-w-xs " />
						</div>

						{/* input skeleton */}
						<div className="flex items-center border border-slate-300 shadow rounded-md p-4 max-w-md w-full">
							<div className="rounded-full bg-slate-300 h-3 w-3 mr-3" />
							<div className="h-2 w-1/3 bg-slate-300 rounded" />
						</div>

						{/* table skeleton */}
						<div className="border border-slate-300 shadow rounded-md p-8 w-full mx-auto">
							<div className="flex space-x-4">
								<div className="flex-1 space-y-3 py-1">
									<div className="space-y-3">
										<div className="grid grid-cols-3 gap-4">
											<div className="h-2 w-10 bg-slate-300 rounded col-span-1" />
											<div className="h-2 w-10 bg-slate-300 rounded col-span-1" />
											<div className="h-2 w-10 bg-slate-300 rounded col-span-1" />
										</div>
										<div className="grid grid-cols-3 gap-4">
											<div className="h-2 bg-slate-300 rounded col-span-1" />
											<div className="h-2 bg-slate-300 rounded col-span-1" />
											<div className="h-2 bg-slate-300 rounded col-span-1" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
