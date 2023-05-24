var nextPopup = document.getElementById("next-popup");

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
function drawChart(maxTailsValue, maxHeadsValue, callback) {
    // Define x and y intercepts
    var x_Intercept = maxTailsValue;
    var y_Intercept = maxHeadsValue;

    // Generating data points
    var generateDataPoints = makeFunc(x_Intercept, y_Intercept);
    var data = [];
    const xStep = 0.01;
    for (var x = 0; x <= x_Intercept; x += xStep) {
        var y = generateDataPoints(x);
        data.push({ x: x.toFixed(2), y: y.toFixed(2)});
    }
    var dataSet = anychart.data.set(data);
    
    // Draw and populate line chart
    var LineData = dataSet.mapAs({x: "x", value: "y"});
    var chart = anychart.line();
    var generatedLine = chart.line(LineData);

    generatedLine.listen("click", function() {
        var selectedPoint = e.point;
        callback(selectedPoint);
    });

    // display x and y values
    var tooltip = generatedLine.tooltip();
    tooltip.title(null);
    tooltip.format("Heads: ${%value} \nTails: ${%x}");

    // Setting axes
    chart.title("Make your decision");
    chart.xAxis().title('$Tails');
    chart.yAxis().title('$Heads');

    chart.yScale().maximum(60);

    chart.xScale().ticks().interval(1000);
    chart.yScale().ticks().interval(10);
    chart.yScale().minorTicks().interval(2);
   
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
}

// TODO: Log the latest selected point with its round number
// if user selects confirm.
function handleSelectedPoint(point) {
    console.log("Selected Point - x: " + point.x + ", y: " + point.value);
}

// Log the selected point
function nextPopup() {
    console.log("Selected Point - x: " + point.x + ", y: " + point.value);
    log.push({round : currentRound, tails: selectedPoint.x, heads: selectedPoint.y});
}

// Load in first chart
anychart.onDocumentReady(drawChart(50, 50, handleSelectedPoint));