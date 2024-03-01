export async function getData() {
	const data = [
		{
			id: 1,
			header: 'Certificate',
			body: `
			<p>Hello Customer,</p>
			<br/>
			<p>Hope you're doing amazing! 🌟 We have something exciting to share with you at CornerMail. Get ready to elevate your experience to a whole new level!</p>
			<br/>
			<p>Here's a sneak peek of what's coming your way:</p>
			<ul>
				<li>🚀 A brand new look and feel</li>
				<li>📈 More powerful features</li>
				<li>🎨 Customizable templates</li>
				<li>🔒 Enhanced security</li>
			</ul>
			<br/>
			<p>Got questions or just can't contain your excitement? Hit reply, and our team will be right there with you on this journey.</p>
			<br/>
			<p>Here's to unlocking new horizons together! 🚀</p>
			`,
			footer: '© 2023 CornerMail',
		},
	];

	return await Promise.resolve(data);
}
