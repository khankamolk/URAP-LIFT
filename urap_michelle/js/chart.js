
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
    var x_Intercept = 50;
    var y_Intercept = 50;

    // Create a function that generates data points
    var generateDataPoints = makeFunc(x_Intercept, y_Intercept);

    // define an empty data array
    var data = [];


    // Enumerate through the range of x values, generating data points
    const xStep = 0.01;
    for (var x = 0; x <= x_Intercept; x += xStep) {
        var y = generateDataPoints(x);
        data.push({ x: x.toFixed(2), y: y.toFixed(2)});
    }

    // create a data set
    var dataSet = anychart.data.set(data);
    //console.log(dataSet.data());

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

    // add x and y label names
    chart.xAxis().title('$Tails');
    chart.yAxis().title('$Heads');


    // var xTicks = chart.xScale().ticks();
    // xTicks.interval(20);
    // xTicks.minor
    chart.xScale().ticks().interval(1000);
    chart.yScale().ticks().interval(10);
    chart.yScale().minorTicks().interval(2);
   

    // enable gridlines for both axes
    chart.xGrid(true);
    chart.yGrid(true);

    // crosshairs
    chart.crosshair().enabled(true);
    chart.crosshair().xLabel(false);
    chart.crosshair().yLabel(false);
    chart.crosshair().xStroke({ color: "#000", thickness: 1, dash: "5 5" });
    chart.crosshair().yStroke({ color: "#000", thickness: 1, dash: "5 5" });

    

    // // specify where to display the chart
    chart.container("container");

    // draw the resulting chart
    chart.draw();

});