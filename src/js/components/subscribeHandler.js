import { renderModal, deleteModal, clickYesNo } from "./modal.js";
import { MODAL } from "../utils/Constants.js";
import { dispatch } from "../view/viewStore.js";

async function handleSubscribe(target, display) {
	if (target.tagName === "BUTTON") {
		const title = target.parentElement.children[0].alt;
		const id = target.id;
		const targetBtn = await fetch(`http://localhost:3000/totalGrid/${id}`);
		const targetBtnJson = await targetBtn.json();

		if (target.innerText === "+ 구독하기") {
			renderModal(title, true);
			await subscribe(targetBtnJson, id, display);
			dispatch(display.toLowerCase());
			setTimeout(deleteModal, MODAL.delay);
		} else {
			renderModal(title, false);
			clickYesNo(
				async () => await unsubscribe(targetBtnJson, id, display),
				() => dispatch(display.toLowerCase())
			);
		}
	}
}

async function subscribe(targetBtnJson, id, display) {
	targetBtnJson.subscription = true;
	updateNews(targetBtnJson, id, display);

	await fetch(`http://localhost:3000/sub${display}`, {
		method: "POST",
		body: JSON.stringify(targetBtnJson),
	});
}
async function unsubscribe(targetBtnJson, id, display) {
	targetBtnJson.subscription = false;
	updateNews(targetBtnJson, id, display);

	await fetch(`http://localhost:3000/sub${display}/${id}`, {
		method: "DELETE",
		body: JSON.stringify(targetBtnJson),
	});
}
function updateNews(targetBtnJson, id, display) {
	fetch(`http://localhost:3000/total${display}/${id}`, {
		method: "PUT",
		body: JSON.stringify(targetBtnJson),
	});
}

export default handleSubscribe;
