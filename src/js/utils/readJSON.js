async function readJSON(file) {
	try {
		const response = await fetch(`../src/nodejs/json/${file}.json`);
		const text = await response.text();
		return JSON.parse(text);
	} catch (error) {
		console.log("존재하지 않는 파일입니다");
	}
}

export default readJSON;
