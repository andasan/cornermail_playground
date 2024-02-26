export default async function TestPage() {
	const result = await getSomething();
	return <h1>Dashboard {result}</h1>;
}

async function getSomething(): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('Hello');
		}, 3000);
	});
}
