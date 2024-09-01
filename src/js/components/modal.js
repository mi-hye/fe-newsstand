const template = (pressTitle) => `
						<div class="modal--subscribe">
							<span>내가 구독한 언론사에</span>
							<span>추가 되었습니다</span>
						</div>
						<div class="modal--unsubscribe">
							<span>${pressTitle}을(를)</span>
							<span>구독해지하시겠습니다</span>
							<div class="modal__btn">
								<button id="yes">예</button><button id="no">아니오</button>
							</div>
						</div>
`;

function renderModal(pressTitle, subscribeFlag) {
	const $pressDesc = document.querySelector(".press__desc");
	const $modal = document.createElement("div");
	$modal.classList.add("modal", "active");
	$pressDesc.appendChild($modal);
	$modal.innerHTML = template(pressTitle);
	if (subscribeFlag) {
		$modal.querySelector(".modal--subscribe").classList.add("active");
		return;
	}
	$modal.querySelector(".modal--unsubscribe").classList.add("active");
}

function deleteModal() {
	const $modal = document.querySelector(".modal");
	$modal.remove();
}

let eventBinding;

function clickYesNo(unsubscribe, dispatch) {
	const $modal = document.querySelector(".modal");

	const callback = async ({ target }) => {
		if (target.id === "yes") {
			await unsubscribe();
			dispatch();
		}
		deleteModal();
	};
	$modal.removeEventListener("click", eventBinding);
	eventBinding = callback;
	$modal.addEventListener("click", eventBinding);
}

export { renderModal, deleteModal, clickYesNo };
