// Define URL using a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Define function
function init() {
    
    let dropdownmenu = d3.select("#selDataset");

    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        console.log(data);

        let namelist = data.names;

        namelist.forEach((name) => {
            dropdownmenu.append("option").text(name).property("value", name);
        });

        let firstname = namelist[0];

        demographics(firstname);
        bar(firstname);
        bubble(firstname);
        gauge(firstname);

    });
}

function demographics(optionselect) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        let metadatalist = data.metadata;
        
        // Filter based on the option selected:
        let filteredmetaData = metadatalist.filter((meta) => meta.id == optionselect);
      
        // Assign the first object to obj variable
        let firstmetavalue = filteredmetaData[0]
        
        d3.select("#sample-metadata").html("");
  
        let enteredvalues = Object.entries(firstmetavalue);
        
        // Iterate through the enteredvalues array
        enteredvalues.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(enteredvalues);
    });
}

function bar(optionselect) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        let sampleset = data.samples;

        // Filter data where id = option selected
        let filteredsampleset = sampleset.filter((sample) => sample.id === optionselect);

        let firstset = filteredsampleset[0];
        
        // Trace data for the horizontal bar chart
        let trace = [{
            // Slice the top 10 otus
            x: firstset.sample_values.slice(0,10).reverse(),
            y: firstset.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: firstset.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(160,178,239)"
            },
            orientation: "h"
        }];
        
        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", trace);
    });
}

function bubble(optionselect) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {

        // Create an array of sample data set
        let sampleset1 = data.samples;
    
        // Filter data where id = option taken
        let filteredsamset = sampleset1.filter((sample) => sample.id === optionselect);
    
        let firstsamset = filteredsamset[0];
        
        // Trace data for the bubble chart
        let trace = [{
            x: firstsamset.otu_ids,
            y: firstsamset.sample_values,
            text: firstsamset.otu_labels,
            mode: "markers",
            marker: {
                size: firstsamset.sample_values,
                color: firstsamset.otu_ids,
                colorscale: "Sunset"
            }
        }];
    
        // Apply the x-axis lengend to the layout
        let layout = {
            xaxis: {title: "OTU ID"}
        };
    
        // Use Plotly to plot the data in a bubble chart
        Plotly.newPlot("bubble", trace, layout);
    });
}

function gauge(optionselect) {
    // Fetch the JSON data and console log it 
    d3.json(url).then((data) => {
        // An array of metadata objects
        let metadataset = data.metadata;
        
        let filteredmetaset = metadataset.filter((meta) => meta.id == optionselect);
      
        let metafirst = filteredmetaset[0]

        // Trace for gauge chart
        let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: metafirst.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
            type: "indicator", 
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 10]}, 
                bar: {color: "rgb(65,161,188)"},
                steps: [
                    { range: [0, 1], color: "rgb(236,247,248)" },
                    { range: [1, 2], color: "rgb(216,242,244)" },
                    { range: [2, 3], color: "rgb(205,234,240)" },
                    { range: [3, 4], color: "rgb(198,223,238)" },
                    { range: [4, 5], color: "rgb(183,215,231)" },
                    { range: [5, 6], color: "rgb(159,207,227)" },
                    { range: [6, 7], color: "rgb(141,201,221)" },
                    { range: [7, 8], color: "rgb(122,195,215)" },
                    { range: [8, 9], color: "rgb(114,187,212)" },
                    { range: [9, 10], color: "rgb(93,180,207)" }
                ]
            }
        }];

         // Plot the data in a gauge chart
         Plotly.newPlot("gauge", trace);
    });
}

// Switch to new plots when option changed
function optionChanged(optionselect) {
    demographics(optionselect);
    bar(optionselect);
    bubble(optionselect);
    gauge(optionselect)
}

init();