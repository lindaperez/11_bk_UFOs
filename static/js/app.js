// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {}
function resetFilters(){
  d3.select("#selectorDatetime").property('value','');
  d3.select("#selectorCity").property('value','');
  d3.select("#selectorState").property('value','');
  d3.select("#selectorCountry").property('value','');
  d3.select("#selectorShape").property('value','');
} 
// 3. Use this function to update the filters. 
function updateFilters() {

  // 4a. Save the element that was changed as a variable.
  let selector = d3.select(this)
  // 4b. Save the value that was changed as a variable.
  let value = selector.property("value");
  // 4c. Save the id of the filter that was changed as a variable.

  let selectorID = selector.property("id");;

  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (value != undefined && value != null) {
    if (selectorID in filters) {
      filters[selectorID] = value;
    } else {
      filters[selectorID] = value;
    }
  }
  
  // 6. Call function to apply all filters and rebuild the table
  filterTable();

}
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
    
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (const [key, value] of Object.entries(filters)) {
      switch (key) {
        case 'selectorDatetime': {
          if (value!=undefined && value!='' && value!=' ') {
            filteredData = filteredData.filter(row => row.datetime.startsWith(value));
          }
          break;
        }
        case 'selectorCity': {
          if (value!=undefined && value!='' && value!=' ') {
            filteredData = filteredData.filter(row => row.city.startsWith(value));
          }
          break;
        }
        case 'selectorState': {
          if (value!=undefined && value!='' && value!=' ') {
            filteredData = filteredData.filter(row => row.state.startsWith(value));
          }
          break;
        }
        case 'selectorCountry': {
          if (value!=undefined && value!='' && value!=' ') {
            filteredData = filteredData.filter(row => row.country.startsWith(value));
          }
          break;
        }
        case 'selectorShape': {
          if (value!=undefined && value!='' && value!=' ') {
            filteredData = filteredData.filter(row => row.shape.startsWith(value));
          }
          break;
        }
        default: {
          //statements;
          break;
        }
      }
    }
  
    // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData)
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.select("#selectorDatetime").on('input', updateFilters).on('click',updateFilters);
  d3.select("#selectorCity").on('input', updateFilters).on('click',updateFilters);
  d3.select("#selectorState").on('input', updateFilters).on('click',updateFilters);
  d3.select("#selectorCountry").on('input', updateFilters).on('click',updateFilters);
  d3.select("#selectorShape").on('input', updateFilters).on('click',updateFilters);
  


  
  // Build the table when the page loads
  resetFilters();
  buildTable(tableData);
