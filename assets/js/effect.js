window.addEventListener("DOMContentLoaded", function (e) {
	function verifyClass(elmt, className) {
		return elmt.classList.contains(className);
	}

	function removeClass(elmt, className) {
		elmt.classList.remove(className);
	}

	function toggleClass(elmt, className) {
		elmt.classList.toggle(className);
	}

	function addClass(elmt, className) {
		elmt.classList.add(className);
	}

	function move(direction = [], element) {
		switch (direction.join()) {
			case ["toRight", "toUp"].join():
				element.classList.remove("toLeft", "toDown");
				break;
			case ["toLeft", "toUp"].join():
				element.classList.remove("toRight", "toDown");
				break;
			case ["toRight", "toDown"].join():
				element.classList.remove("toLeft", "toUp");
				break;
			case ["toLeft", "toDown"].join():
				element.classList.remove("toRight", "toUp");
				break;
			default:
				console.log("Bad direction ....");
				break;
		}
		element.classList.add(direction[0], direction[1]);
	}

	function previousElmt(obj) {
		for (let elmt of obj) {
			if (elmt.classList.contains("is-current")) {
				return elmt;
			}
		}
	}

	function listen(element, event, callback) {
		return element.addEventListener(event, callback);
	}

	//Init variables
	let arrow1 = document.getElementById("arrow-1");
	let arrow2 = document.getElementById("arrow-2");
	let arrow3 = document.getElementById("arrow-3");
	let arrow4 = document.getElementById("arrow-4");
	let wrapper = document.getElementById("wrapper");
	let img2 = document.getElementById("img-2");
	let selector = document.getElementsByClassName("selector");
	let timeOut = 400;

	// selector init
	selector[0].classList.add("is-current");

	for (let elmt of selector) {
		listen(elmt, "click", function (e) {
			let previous = previousElmt(selector);

			if (verifyClass(elmt, "selector__3")) {
				if (verifyClass(img2, "is-scaling")) {
					removeClass(img2, "is-scaling");
				}
				move(["toRight", "toUp"], wrapper);
			}

			if (verifyClass(elmt, "selector__2")) {
				if (!verifyClass(img2, "is-scaling")) {
					addClass(img2, "is-scaling");
				}
				move(["toLeft", "toDown"], wrapper);
			}

			if (verifyClass(elmt, "selector__4")) {
				if (verifyClass(img2, "is-scaling")) {
					removeClass(img2, "is-scaling");
				}
				move(["toLeft", "toUp"], wrapper);
			}
			toggleClass(previous, "is-current");
			toggleClass(elmt, "is-current");
		});
	}

	arrow1.addEventListener("click", function (e) {
		move(["toLeft", "toDown"], wrapper);
		setTimeout(function () {
			img2.classList.add("is-scaling");
			selector[0].classList.remove("is-current");
			selector[1].classList.add("is-current");
		}, timeOut);
	});

	arrow2.addEventListener("click", function (e) {
		move(["toLeft", "toUp"], wrapper);
		setTimeout(function () {
			if (verifyClass(img2)) {
				removeClass(img2, "is-scaling");
			}
			selector[1].classList.remove("is-current");
			selector[3].classList.add("is-current");
		}, timeOut);
	});

	arrow3.addEventListener("click", function (e) {
		move(["toRight", "toDown"], wrapper);
		setTimeout(function () {
			selector[2].classList.remove("is-current");
			selector[0].classList.add("is-current");
		}, timeOut);
	});

	arrow4.addEventListener("click", function (e) {
		move(["toRight", "toUp"], wrapper);
		setTimeout(function () {
			selector[3].classList.remove("is-current");
			selector[2].classList.add("is-current");
		}, timeOut);
	});
});
