
anychart.onDocumentReady(function () {

    //define a function to plot 
    function makeFunc(x_Intercept, y_Intercept) {
        function func(x) {
        var m = -y_Intercept / x_Intercept;
        return m * x + y_Intercept;
        }
        return func; 
    }

    //Define x and y intercepts
    var x_Intercept = 42;
    var y_Intercept = 36;

    // Create a function that generates data points
    var generateDataPoints = makeFunc(x_Intercept, y_Intercept);

    // define an empty data array
    var data = [];

    // Define the range of x values
    var xStart = 0;
    var xEnd = 42;
    var xStep = 0.01;

    // Enumerate through the range of x values, generating data points
    for (var x = xStart; x <= xEnd; x += xStep) {
        var y = generateDataPoints(x);
        data.push({ x: x.toFixed(2), y: y.toFixed(2)});
    }

    // create a data set
    var dataSet = anychart.data.set(data);

    // map the data for the generated line
    var LineData = dataSet.mapAs({x: "x", value: "y"});

    // create a line chart
    var chart = anychart.line();

    // create the series and name them
    var generatedLine = chart.line(LineData);

    // display x and y values
    var tooltip = generatedLine.tooltip();
    tooltip.title(null);
    tooltip.format("Heads: ${%value} \nTails: ${%x}");

    // add a title
    chart.title("Make your decision");

    // enable gridlines for both axes
    chart.xGrid(true);
    chart.yGrid(true);

    // specify where to display the chart
    chart.container("container");

    // draw the resulting chart
    chart.draw();

});