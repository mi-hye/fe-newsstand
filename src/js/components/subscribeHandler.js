import { renderModal, deleteModal, clickYesNo } from "./modal.js";
import { MODAL } from "../utils/Constants.js";
import { dispatch } from "../view/viewStore.js";

async function handleSubscribe(target, display) {
	if (target.tagName === "BUTTON") {
		const id = target.className; //TODO ID로 변경
		const targetPress = await fetch(`http://localhost:3000/total${display}/${id}`);
		const targePressJson = await targetPress.json();
		const title = display === "Grid" ? targePressJson.alt : targePressJson.header.pressTitle;

		if (target.innerText === "+ 구독하기") {
			renderModal(title, true);
			await subscribe(targePressJson, id, display);
			dispatch(display.toLowerCase()); // TODO 그리드의 경우 리스트경우 바꿔야함

			setTimeout(deleteModal, MODAL.delay);
		} else {
			renderModal(title, false);
			clickYesNo(
				async () => await unsubscribe(targePressJson, id, display),
				() => dispatch(display.toLowerCase())
			);
		}
	}
}

async function subscribe(targePressJson, id, display) {
	targePressJson.subscription = true;
	updateNews(targePressJson, id, display);

	await fetch(`http://localhost:3000/sub${display}`, {
		method: "POST",
		body: JSON.stringify(targePressJson),
	});
}
async function unsubscribe(targePressJson, id, display) {
	targePressJson.subscription = false;
	updateNews(targePressJson, id, display);

	await fetch(`http://localhost:3000/sub${display}/${id}`, {
		method: "DELETE",
		body: JSON.stringify(targePressJson),
	});
}
function updateNews(targePressJson, id, display) {
	fetch(`http://localhost:3000/total${display}/${id}`, {
		method: "PUT",
		body: JSON.stringify(targePressJson),
	});
}

export default handleSubscribe;
