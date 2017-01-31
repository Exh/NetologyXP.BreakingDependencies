"use strict";

// Этот код можно менять как угодно
var items = {
	"milk": {price: 5.5, type: "Groceries"},
	"eggs": {price: 3.0, type: "Groceries"},
	"coca-cola": {price: 0.4, type: "Groceries"},
	"amoxicillin": {price: 6.7, type: "PrescriptionDrug"},
	"aspirin": {price: 0.2, type: "PrescriptionDrug"},
	"marijuana": {price: 1.4, type: "PrescriptionDrug"},
	"hamburger": {price: 2.00, type: "PreparedFood"},
	"ceasar salad": {price: 4.2, type: "PreparedFood"}
};

function State(base, categories) {
	this.base = base;
	this.categories = categories;

	this.getCategoryTax = function (title) {
		return this.categories[title];
	};

	this.getBaseTax = function () {
		return this.base;
	};

	this.calculateTax = function (category) {
		var categoryTax = this.getCategoryTax(category);
		if (categoryTax === "") {
			return 0;
		}
		return this.base + categoryTax;
	};

	this.calculatePriceWithTax = function (item) {
		if (item.type === "PreparedFood") {
			return this.calcPreparedFoodPrice(item.price);
		}
		else {
			console.log(item.price + " " + this.calculateTax(item.type));
			return item.price + item.price * this.calculateTax(item.type);
		}
	};

	this.calcPriceWithBaseTax = function (price) {
		return (1 + this.base) * price;
	};

	this.calcPreparedFoodPrice = function (price) {
		return this.calcPriceWithBaseTax(price);
	};
};


var states = {
	"Alabama": new State(0.04, {"Groceries": 0, "PrescriptionDrug": ""}),
	"Alaska": new State(0, {"Groceries": 0, "PrescriptionDrug": 0}),
	"Arizona": new State(0.056, {"Groceries": "", "PrescriptionDrug": ""}),
	"Arkansas": new State(0.065, {"Groceries": 0.015, "PrescriptionDrug": ""}),
	"California": new State(0.075, {"Groceries": "", "PrescriptionDrug": ""}),
	"Colorado": new State(0.029, {"Groceries": "", "PrescriptionDrug": ""}),
	"Connecticut": new State(0.0635, {"Groceries": "", "PrescriptionDrug": ""}),
	"Tennessee": new State(0.07, {"Groceries": 0.05, "PrescriptionDrug": ""}),
	"Texas": new State(0.0625, {"Groceries": 0, "PrescriptionDrug": 0})
};

function calculatePriceFor(state, item) {
	var s = states[state];
	var i = items[item];
	return s.calculatePriceWithTax(i);
}

class TaxCalculator {
	// У этой функции нелья менять интерфейс
	// Но можно менять содержимое
	calculateTax() {
		var ordersCount = getOrdersCount();
		var state = getSelectedState();
		console.log(`----------${state}-----------`);
		for (var i = 0; i < ordersCount; i++) {
			var item = getSelectedItem();
			console.log("Item: " + item);
			var result = null;
			result = calculatePriceFor(state, item);
			console.log(`${item}: $${result.toFixed(2)}`);
		}
		console.log(`----Have a nice day!-----`);
	}
}



//############################
//Production - код:
calculateTaxes();

//############################
//Тесты:
var tests = [
	() => assertEquals(3.0 * (1 + 0.04), calculatePriceFor("Alabama", "eggs")),
	() => assertEquals(0.4 * (1 + 0.015 + 0.065), calculatePriceFor("Arkansas", "coca-cola")),
	() => assertEquals(6.7 * (1 + 0.0), calculatePriceFor("Alaska", "amoxicillin")),
	() => assertEquals(6.7 * (1 + 0.0), calculatePriceFor("California", "amoxicillin")),
	() => assertEquals(2 * (1 + 0.0635), calculatePriceFor("Connecticut", "hamburger")),
	() => assertEquals(0.4 * (1 + 0.0625), calculatePriceFor("Texas", "coca-cola")),
];


//Раскомментируйте следующую строчку для запуска тестов:
runAllTests (tests);

//############################
//Код ниже этой строчки не надо менять для выполнения домашней работы

	function calculateTaxes() {
		var calculator = new TaxCalculator();
		calculator.calculateTax();
	}

	function getSelectedItem() {
		var items = ["milk", "eggs", "coca-cola", "amoxicillin", "aspirin", "marijuana", "hamburger", "ceasar salad"];
		return items[Math.floor(Math.random() * items.length)];
	}

	function getSelectedState() {
		var state = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut"];
		return state[Math.floor(Math.random() * state.length)];
	}

	function getOrdersCount() {
		return Math.floor(Math.random() * 3) + 1;
	}

//############################
// Кустарный способ писать тесты

	function assertEquals(expected, actual) {
		var epsilon = 0.000001;
		var difference = Math.abs(expected - actual);
		if (difference > epsilon || difference === undefined || isNaN(difference)) {
			console.error(`Fail! Expected: ${expected}, Actual: ${actual}`);
			return -1;
		}
		return 0;
	}

	function runAllTests(tests) {
		var failedTests = tests
				.map((f) => f())
	.map((code) => {
			if (code === -1) {
			return 1
		} else {
			return 0
		}
	})
	.reduce((a, b) => a + b, 0);

		if (failedTests === 0) {
			console.log(`Success: ${tests.length} tests passed.`);
		}
		else {
			console.error(`Fail: ${failedTests} tests failed.`);
		}
	}