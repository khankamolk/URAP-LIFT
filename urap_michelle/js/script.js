var toggle = document.getElementById("toggle-popup");
var myPopup = document.getElementById("confirmation-popup");
var closePopup = document.getElementById("close-popup");
var nextPopup = document.getElementById("next-popup");
var chartContainer = document.getElementById("container");
var currentRound = 1;

toggle.onclick = function() {
  	myPopup.style.display = "block";
};

closePopup.onclick = function() {
  	myPopup.style.display = "none";
};

nextPopup.onclick = function() {
	document.getElementById('container').innerHTML = '';
    drawChart(30, 40); 
	myPopup.style.display = "none";

  	// Update the round title
  	currentRound++;
  	updateRoundTitle();
};

function updateRoundTitle() {
	var roundTitle = document.getElementById('round-title');
	roundTitle.textContent = 'Round ' + currentRound + ' of 25';
  }
