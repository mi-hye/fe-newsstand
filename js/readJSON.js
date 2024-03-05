async function readJSON(file) {
	try {
		const response = await fetch(`../nodejs/${file}.JSON`);
		const text = await response.text();
		return JSON.parse(text);
	} catch (error) {
		console.log("존재하지 않는 파일입니다");
	}
}
