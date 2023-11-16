var toggle = document.getElementById("toggle-popup");
var myPopup = document.getElementById("confirmation-popup");
var closePopup = document.getElementById("close-popup");
var nextPopup = document.getElementById("next-popup");
var chartContainer = document.getElementById("container");
var currentRound = 1;
const TOTAL_ROUNDS = 25;


toggle.onclick = function() {
    if(clickedHead && clickedTail) {
        document.getElementById("selected-heads").textContent = "Heads: " + clickedHead;
        document.getElementById("selected-tails").textContent = "Tails: " + clickedTail;
        myPopup.style.display = "block";
    } else {
        alert("Please select a point on the chart first.");
    }
};

closePopup.onclick = function() {
  	myPopup.style.display = "none";
};

// x: tails intercept value, y: heads intercept value.
var intercepts = [
	{x: 30, y: 40},
	{x: 40, y: 30},
	{x: 30, y: 50},
	{x: 50, y: 30},
	{x: 20, y: 40},
	{x: 40, y: 20},
	{x: 50, y: 10},
	{x: 10, y: 50},
	{x: 40, y: 25},
	{x: 25, y: 40},
	{x: 30, y: 40},
	{x: 40, y: 30},
	{x: 30, y: 50},
	{x: 50, y: 30},
	{x: 20, y: 40},
	{x: 40, y: 20},
	{x: 50, y: 10},
	{x: 10, y: 50},
	{x: 40, y: 25},
	{x: 25, y: 40},
	{x: 30, y: 40},
	{x: 40, y: 30},
	{x: 30, y: 50},
	{x: 50, y: 30}
  ];

nextPopup.onclick = function() {
	document.getElementById('container').innerHTML = '';
	confirmSelectionBtn.disabled = true; // Disable the button for the next round
	confirmSelectionBtn.classList.remove("enabled"); // Remove the blue style for the next round
	
	var xIntercept = intercepts[currentRound - 1].x;
	var yIntercept = intercepts[currentRound - 1].y;
    drawChart(xIntercept, yIntercept); 
	myPopup.style.display = "none";

  	// Update the round title
  	currentRound++;
  	updateRound();
};

// Update round title and progress bar
function updateRound() {
	var roundTitle = document.getElementById('round-title');
	//var progressBar = document.getElementById('progress-bar');
	roundTitle.textContent = 'Round ' + currentRound + ' of 25';

	progressBar.innerHTML = ""; // Clear div
	var filledSegment = document.createElement('<div class="item green-common"></div>');
	var emptySegment = document.createElement('<div class="item"></div>');

	for (var i = 0; i < TOTAL_ROUNDS; i++) {
		if (i < currentRound) {
			progressBar.append(filledSegment);
		} else {
			progressBar.append(emptySegment);
		}
	}
}
