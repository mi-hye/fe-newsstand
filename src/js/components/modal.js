const template = (pressTitle) => `
						<div class="modal--subscribe">
							<span>내가 구독한 언론사에</span>
							<span>추가 되었습니다</span>
						</div>
						<div class="modal--unsubscribe">
							<span>${pressTitle}을(를)</span>
							<span>구독해지하시겠습니다</span>
							<div class="modal__btn">
								<button class="yes">예</button><button class="no">아니오</button>
							</div>
						</div>
`;

function renderModal(pressTitle, subscribeFlag) {
	const $modal = document.querySelector(".modal");
	$modal.innerHTML = template(pressTitle);
	$modal.classList.add("active");
	if (subscribeFlag) {
		$modal.querySelector(".modal--subscribe").classList.add("active");
		return;
	}
	$modal.querySelector(".modal--unsubscribe").classList.add("active");
}

function deleteModal() {
	const $modal = document.querySelector(".modal");
	$modal.innerHTML = "";
	$modal.classList.remove("active");
}

export { renderModal, deleteModal };
