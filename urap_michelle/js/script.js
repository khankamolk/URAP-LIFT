var toggle = document.getElementById("toggle-popup");
var myPopup = document.getElementById("confirmation-popup");
var closePopup = document.getElementById("close-popup");
var nextPopup = document.getElementById("next-popup");

toggle.onclick = function() {
  myPopup.style.display = "block";
};

closePopup.onclick = function() {
  myPopup.style.display = "none";
};

nextPopup.onclick = function() {
    drawChart(30, 40); // I want this to redraw the chart...
	myPopup.style.display = "none";
};

function displayValue() {
	// Get the HTML element with the id "value"
	let valueElement = document.getElementById("value");

	// Get the value from your script
	let value = 42;

	// Set the innerHTML of the element to the value
	valueElement.innerHTML = value;
}
