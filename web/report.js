var uniqueValuesV = _.keys(_.countBy(vendorData, function(vendorData){return vendorData.Tractor;}));

var uniqueValuesY = _.keys(_.countBy(yardData, function(yardData){return yardData.Tractor;}));

var totalV = [];

$.each(vendorData,function(index, item){
    if(totalV[item.Tractor]==undefined){
        totalV[item.Tractor] =0;
    }
    totalV[item.Tractor] += item.Quantity;
});

var totalY = [];

$.each(yardData,function(index, item){
    if(totalY[item.Tractor]==undefined){
        totalY[item.Tractor] =0;
    }
    totalY[item.Tractor] += item.Quantity;
});

var items = Object.keys(totalV).map(function(key) {
    return [key, totalV[key]];
});

items.sort(function(first, second) {
    return first[1] - second[1];
});

console.log(items)

var yardTrace = {
    x: uniqueValuesY,
    y: Object.values(totalY),
    name: "Yard",
    type: 'bar'
};

var vendorTrace = {
    x: uniqueValuesV,
    y: Object.values(totalV),
    name: "Other",
    type: 'bar'
};

var data = [yardTrace, vendorTrace];

var layout = {barmode: 'group',
    xaxis: {type: 'category',
    "categoryorder": "array",
    "categoryarray": items.map(x => x[0])},
    title: "Fuel Report"
};

var config = {responsive: true}

console.log(data)

Plotly.newPlot("plot", data, layout, config);

