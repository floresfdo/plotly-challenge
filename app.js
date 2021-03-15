// set up function to populate dropdown and initial charts and table
function init(){
    var dropdown = d3.select("#selDataset");

    d3.json("/data/samples.json").then(d => {
        console.log(d);
        d.names.forEach(name => dropdown.append("option").text(name).property("value"));
        getPlot(d.names[0]);
        getTable(d.names[0]);
    });
};

// function to update when dropdown selection changes
function optionChanged(id) {
    getPlot(id);
    getTable(id);
};

// function that plots charts based on selection
function getPlot(id) {
    d3.json("/data/samples.json").then(d => {
        console.log(d);
        var choice = d.samples.filter(r => r.id.toString() === id)[0];
        console.log(choice);
        var choiceValues = choice.sample_values.slice(0,10);
        console.log(choiceValues);
        var top_10id = choice.otu_ids.slice(0,10);
        console.log(top_10id);
        var OTUs = top_10id.map(s => "OTU " + s);
        console.log(OTUs);
        var labels = choice.otu_labels.slice(0,10);

        var trace_bar = {
            x: choiceValues.reverse(),
            y: OTUs.reverse(),
            text: labels,
            type: "bar",
            orientation: "h"
        };
        var data_bar = [trace_bar];

        var layout_bar = {
            title: "Top 10 OTUs",
            xaxis: {title: "Values"},
            yaxis: {title: "OTU ID"}
        };
         Plotly.newPlot("bar", data_bar, layout_bar);

         var trace_bubble = {
             x: choice.otu_ids,
             y: choice.sample_values,
             mode: "markers",
             text: choice.otu_labels,
             marker: {
                 size: choice.sample_values,
                 color: choice.otu_ids
             }
            };
         var layout_bubble = {
             xaxis: {title: "OTU ID"},
             yaxis: {title: "Values"}
         };
         var data_bubble = [trace_bubble];

         Plotly.newPlot("bubble",data_bubble,layout_bubble);
        });
};

// function that gets metadata to display as demographic info
function getTable(id){
    d3.json("/data/samples.json").then(d => {
        var metadata = d.metadata;
        console.log(metadata);
        var filtered = metadata.filter(m => m.id.toString() === id)[0];
        console.log(filtered);
        var demodata = d3.select("#sample-metadata");
        demodata.html("");
        Object.entries(filtered).forEach((t) => {
            demodata.append("h6").text(t[0] + ": " + t[1]);
        });      
    });
};

init(); 