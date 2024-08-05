import { renderModal, deleteModal, clickYesNo } from "./modal.js";
import { MODAL } from "../utils/Constants.js";
import { dispatch } from "../view/ViewStore.js";
import listDispatch from "../view/press/list/ListStore.js";

async function handleSubscribe(target, display) {
	if (target.tagName === "BUTTON") {
		const isGrid = display === "Grid";
		const id = target.className;
		const targetPress = await fetch(`http://localhost:3000/total${display}/${id}`);
		const targePressJson = await targetPress.json();
		const title = isGrid ? targePressJson.alt : targePressJson.header.pressTitle;

		if (target.innerText === "+ 구독하기") {
			renderModal(title, true);
			await subscribe(targePressJson, id, display);
			isGrid ? dispatch(display.toLowerCase()) : listDispatch("sub");
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
