var nextPopup = document.getElementById("next-popup");
var clickedHead;
var clickedTail;
var confirmSelectionBtn = document.getElementById("toggle-popup");
confirmSelectionBtn.disabled = true; // Disable the button initially

// Storing selected data
var log = [ 
    {round : 0, tails: null, heads: null}
]

// Returns f(x) function that generates y-points 
function makeFunc(x_Intercept, y_Intercept) {
    function func(x) {
    var m = -y_Intercept / x_Intercept;
    return m * x + y_Intercept;
    }
    return func; 
}

// Takes in the max tails and heads value and generates a line chart
// using the values as the x and y-intercepts respectively.
function drawChart(maxTailsValue, maxHeadsValue) {
    // Define x and y intercepts
    var x_Intercept = maxTailsValue;
    var y_Intercept = maxHeadsValue;

    // Generating data points
    var generateDataPoints = makeFunc(x_Intercept, y_Intercept);
    var data = [];
    const xStep = 0.01;
    for (var x = 0; x <= 50; x += xStep) {
        var y = generateDataPoints(x);
        if (y >= 0) {
        data.push({ x: x.toFixed(2), y: y.toFixed(2)});
        }
    }
    var dataSet = anychart.data.set(data);

    // Draw and populate line chart
    var LineData = dataSet.mapAs({x: "x", value: "y"});
    var chart = anychart.line();

    // make x axis linear, so that the labels are aligned with their respective ticks
    chart.xScale(anychart.scales.linear());

    var generatedLine = chart.line(LineData);


    // display x and y values
    var tooltip = generatedLine.tooltip();
    tooltip.title(null);
    tooltip.format("Heads: ${%value} \nTails: ${%x}");

    // Setting axes
    chart.title("Make your decision");
    chart.xAxis().title('$Tails');
    chart.yAxis().title('$Heads');

    chart.xScale().maximum(50);
    chart.yScale().maximum(50);

    chart.xScale().ticks().interval(10);
    chart.yScale().ticks().interval(10);
    //chart.yScale().minorTicks().interval(2);
   
    chart.xGrid(true);
    chart.yGrid(true);

    // Crosshairs
    chart.crosshair().enabled(true);
    chart.crosshair().xLabel(false);
    chart.crosshair().yLabel(false);
    chart.crosshair().xStroke({ color: "#000", thickness: 1, dash: "5 5" });
    chart.crosshair().yStroke({ color: "#000", thickness: 1, dash: "5 5" });

    chart.container("container");
    chart.draw();

    // Get the head and tail values that have been selected
    generatedLine.listen("pointClick", function(e) {
        var selectedPoint = e.point;
        clickedHead = selectedPoint.getStat('value');
        clickedTail = selectedPoint.getStat('x');

        confirmSelectionBtn.disabled = false; // Enable the button
        confirmSelectionBtn.classList.add("enabled"); // Apply the blue style
    });
}

// Log the selected point
function nextPopup() {
    console.log("Selected Point - x: " + point.x + ", y: " + point.value);
    log.push({round : currentRound, tails: selectedPoint.x, heads: selectedPoint.y});
}

// Load in first chart
anychart.onDocumentReady(drawChart(50, 50));