// Define link and attach to a variable 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);

// plot first sample (Bar Chart)
    let SampleOne = data.samples[0];
    let SampleOtuID = data.samples[0].otu_ids;
    let SampleValues = data.samples[0].sample_values;
    let SampleLables = data.samples[0].otu_labels;
    let BarChartData = [{
        x: SampleValues.slice(0, 10).reverse(),
        y: SampleOtuID.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        text: SampleLables.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    }
];

let layoutBar = {
    title: "Top 10 OTUs",
    xaxis: { title: "Sample Values"},
    yaxis: { title: "OTU IDs"},
    width: 600,
    height: 800,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }};

Plotly.newPlot("bar", BarChartData, layoutBar);

// plot first sample (Bubble Chart)
let BubbleChartData = [{
      x: SampleOtuID,
      y: SampleValues,
      text: SampleLables,
      mode: "markers",
      marker: {
        size: SampleValues,
        color: SampleOtuID,
        colorscale: "Earth"
      }
    }
  ];

  let layoutbubble = {
    title: "Sample Values Vs OTU ID",
    xaxis: { title: "OTU IDs"},
    yaxis: { title: "Sample Values"},
    width: 1500,
    height: 600,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }};

Plotly.newPlot("bubble", BubbleChartData, layoutbubble);

// plot first sample (Gauge Chart)
let SampleOneWashing = data.metadata[0].wfreq;
let GaugePlotData = [
    {
        type: "indicator",
        mode: "gauge+number",
        value: SampleOneWashing,
        title: {
            text: "<b>Belly Button Washing Frequency</b><br>Scrubs Per Week",
            useHTML: true
        },
        gauge: {
            axis: { range: [0, 9], tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
            steps: [
                { range: [0, 1], color: "lightgray" },
                { range: [1, 2], color: "lightyellow" },
                { range: [2, 3], color: "yellow" },
                { range: [3, 4], color: "gold" },
                { range: [4, 5], color: "orange" },
                { range: [5, 6], color: "darkorange" },
                { range: [6, 7], color: "chocolate" },
                { range: [7, 8], color: "saddlebrown" },
                { range: [8, 9], color: "sienna" },
            ],
        },
    },
];


let layoutGauge = {
    width: 700,
    height: 800,
    margin: {
        l: 50,
        r: 50,
        t: 50,
        b: 50,
    },
};

Plotly.newPlot("gauge", GaugePlotData, layoutGauge);


//Add names to a dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  data.names.forEach(function(name) {
  dropdownMenu.append("option").property("value", name).text(name)
    });

// Add first sample Demographic info
    let demographicInfo = d3.select("#sample-metadata");
    let firstSample = data.metadata[0];
    demographicInfo.html("");
    Object.entries(firstSample).forEach(function([key, value]) {
      demographicInfo.append("p").text(`${key}: ${value}`);
    });
});


// Create plots (bar, bubble and gauge) based on selection from the dropdown menu
function optionChanged(ForEachSamples){
    const url_1 = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url_1).then(function(data) {
      // define SampleInfo...to be used to create bar and bubble plots
        let SampleInfo = data.samples.find(sample => sample.id == ForEachSamples);
      // define SampleInfo_1....to be used to create gauge plots  
        let SampleInfo_1 = data.metadata.find(item => item.id == ForEachSamples);
      
      // create bar plot  
        let NewBarChart = [{
            x: SampleInfo.sample_values.slice(0, 10).reverse(),
            y: SampleInfo.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: SampleInfo.otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }];
        
        let layoutBar = {
          title: "Top 10 OTUs",
          xaxis: { title: "Sample Values"},
          yaxis: { title: "OTU IDs"},
          width: 600,
          height: 800,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          }};
        
Plotly.newPlot("bar", NewBarChart, layoutBar);

       // create bubble plots
    
        let NewBubbleChart = [{
            x: SampleInfo.otu_ids,
            y: SampleInfo.sample_values,
            text: SampleInfo.otu_labels,
            mode: "markers",
            marker: {
                size: SampleInfo.sample_values,
                color: SampleInfo.otu_ids,
                colorscale: "Earth"
            }}];

          let layoutbubble = {
              title: "Sample Values Vs OTU ID",
              xaxis: { title: "OTU IDs"},
              yaxis: { title: "Sample Values"},
              width: 1500,
              height: 600,
              margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
              }};
          
Plotly.newPlot("bubble", NewBubbleChart, layoutbubble);

        // create gauge plots   

        let GaugePlotData = [{
            type: "indicator",
            mode: "gauge+number",
            value: SampleInfo_1.wfreq,
            title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs Per Week",
                    useHTML: true},
            gauge: {
                axis: { range: [0, 9], tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
                steps: [
                    { range: [0, 1], color: "lightgray" },
                    { range: [1, 2], color: "lightyellow" },
                    { range: [2, 3], color: "yellow" },
                    { range: [3, 4], color: "gold" },
                    { range: [4, 5], color: "orange" },
                    { range: [5, 6], color: "darkorange" },
                    { range: [6, 7], color: "chocolate" },
                    { range: [7, 8], color: "saddlebrown" },
                    { range: [8, 9], color: "sienna" },
                   ],
            },
        }];

    let layoutGauge = {
        width: 700,
        height: 800,
        margin: {
          l: 50,
          r: 50,
          t: 50,
          b: 50
        }};
    
        
        Plotly.newPlot("gauge", GaugePlotData, layoutGauge);

        let sampleMetadata = data.metadata.find(metadata => metadata.id.toString() === ForEachSamples);

        // Update the demographic info
        let demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(sampleMetadata).forEach(function([key, value]) {
          demographicInfo.append("p").text(`${key}: ${value}`);
        });
      });
    }
    
    
    d3.selectAll("#selDataset").on("change", function() {
        let ForEachSamples = d3.select(this).property("value");
        optionChanged(ForEachSamples);
      });
      
      optionChanged(data.samples[0]);