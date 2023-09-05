// Define link and attach to a varibale 
const url_2 = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url_2).then(function(data) {
    console.log(data);

// plot first sample (Bar Chart)
    let SampleOneWashing = data.metadata[0].wfreq;
    let GaugePlotData = [{
        type: "indicator",
        mode: "gauge+number",
        value: SampleOneWashing,
        title: {text: `<h1>Belly Button Washing Frequency</h1> <hr> <h3>Scrubs Per Week</h3>`,
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
    },
];

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

//Add names to a dropdown menu (Test Subject ID No)
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

function updateSamplesPlots(ForEachSamples){
    const url_1 = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url_1).then(function(data) {
        let SampleInfo_1 = data.metadata.find(metadata => metadata.id === ForEachSamples_1);
        if (SampleInfo_1) {
            let SampleWashing = SampleInfo_1.wfreq !== null ? SampleInfo_1.wfreq : 0;


        let GaugePlotData = [{
            type: "indicator",
            mode: "gauge+number",
            value: SampleWashing,
            title: {text: `<h1>Belly Button Washing Frequency</h1> <hr> <h3>Scrubs Per Week</h3>`,
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

        let sampleMetadata = data.metadata.find(metadata => metadata.id.toString() === ForEachSamples_1);

        // Update the demographic info
        let demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(sampleMetadata).forEach(function([key, value]) {
          demographicInfo.append("p").text(`${key}: ${value}`);
        });
      }
    });
    
    d3.selectAll("#selDataset").on("change", function() {
        let ForEachSamples_1 = d3.select(this).property("value");
        updateSamplesPlots(ForEachSamples_1);
      });
    }