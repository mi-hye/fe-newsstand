async function getJson(display) {
	try {
		const response = await fetch(`http://localhost:3000/${display}`);
		const text = await response.json();
		return text;
	} catch (error) {
		console.log("존재하지 않는 파일입니다");
	}
}

export { getJson };
