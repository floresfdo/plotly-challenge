// set up function to populate dropdown and initial charts and table
function init(){
    var dropdown = d3.select("#selDataset");

    d3.json("/data/samples.json").then(d => {
        console.log(d);
        d.names.forEach(name => dropdown.append("option").text(name).property("value"));
        getPlot(d.names[0]);
        //getTable(d.names[0]);
    })
}

function optionChanged(id) {
    getPlot(id);
    //getTable(id);
}

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

        var trace = {
            x: choiceValues.reverse(),
            y: OTUs.reverse(),
            text: labels,
            type: "bar",
            orientation: "h"
        };
        var data = [trace];
         Plotly.newPlot("bar", data);
        });
};

// var url = "/data/samples.json";
// d3.json(url).then(d => {
//         console.log(d);
//     });

init(); 