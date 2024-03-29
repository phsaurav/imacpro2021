//* Declearation
let costs = { memory: 0, storage: 0, delivery: 0, base: 1299 };
let totalCost = 1299;

//* Select Elements
const memoryBtns = document.querySelectorAll('.memory-section button');
const storageBtns = document.querySelectorAll('.storage-section button');
const deliveryBtns = document.querySelectorAll('.delivery-section button');
const totalPrice = document.getElementById('total-display');
const totalFooter = document.getElementById('footer-display');
const buttonSection = [memoryBtns, storageBtns, deliveryBtns];
const promoButton = document.querySelector('.promo-section button');
const promoInput = document.querySelector('.promo-section input');

// *Display Funcitons
function setDisplayValue(element, value) {
	element.innerText = value;
}

function updateDisplayValue(processName) {
	const element = document.getElementById(processName + '-display');
	setDisplayValue(element, costs[processName]);
}

// *Calculate Total
function calculateTotal() {
	totalCost =
		parseFloat(costs.base) +
		parseFloat(costs.memory) +
		parseFloat(costs.storage) +
		parseFloat(costs.delivery);
	setDisplayValue(totalPrice, totalCost);
	if (totalFooter.classList.contains('promo')) {
		setDisplayValue(totalFooter, totalCost - totalCost * 0.2);
	} else {
		setDisplayValue(totalFooter, totalCost);
	}
}

//*Remove previous active button class
function removeActive(btns) {
	for (btn of btns) {
		if (btn.classList.contains('active')) {
			btn.classList.remove('active');
		}
	}
}

// *Upgrade buttons
for (let i = 0; i < buttonSection.length; i++) {
	for (btn of buttonSection[i]) {
		btn.addEventListener('click', function (e) {
			if (!e.target.classList.contains('active')) {
				removeActive(buttonSection[i]);
				const key = Object.keys(costs)[i];
				costs[key] = parseFloat(e.target.dataset.price);
				e.target.classList.add('active');
				updateDisplayValue(key);
				calculateTotal();
			}
		});
	}
}

// *Promo Buttons
promoButton.addEventListener('click', function () {
	if (promoInput.value == 'stevekaku') {
		totalFooter.classList.add('promo');
		calculateTotal();
		promoInput.value = '';
		promoButton.style.backgroundColor = 'gray';
	} else {
		promoInput.classList.add('wrong');
		promoInput.value = '';
		alert('Wrong Promo!!');
		setTimeout(function () {
			promoInput.classList.remove('wrong');
		}, 3000);
	}
});
