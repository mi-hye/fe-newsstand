import { writeFile } from "node:fs/promises";

async function saveJSON(file, text) {
	try {
		await writeFile(`./${file}.JSON`, JSON.stringify(text));
		console.log("생성");
	} catch (err) {
		console.log(err);
	}
}

export default saveJSON;
