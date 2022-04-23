// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select("tbody");


function buildTable(data){
    // clear out existing data
    tbody.html(''); 
    data.forEach(dataRow => {
        let row = tbody.append("tr");
        // loop through location,shape,duration
        Object.values(dataRow).forEach((val) => { 
            let cell = row.append("td");
            cell.text(val)
        });
    });
}


function handleClick(){
    // date specified by the user
    let date = d3.select('#datetime').property("value");
    // if nothing is filtered the filter is the universe data
    let filteredData = tableData;
    //filter the tableData to match the selected date
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date)
    }
    // rebuild the table now only with filteredData
    buildTable(filteredData);
}

//listen to handle a button click
d3.selectAll('#filter-btn').on("click",handleClick);

//buikd the table with the page loads
buildTable(tableData);