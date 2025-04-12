function fetchHolidays() {
    // Get input values from the form
    const country = document.getElementById('countryCode').value.trim().toUpperCase();
    const year = document.getElementById('year').value.trim();
    const resultsBody = document.getElementById('results');
    resultsBody.innerHTML = ''; // Clear previous results
  
    // Validate that both inputs are provided
    if (!country || !year) {
      alert('Please enter both a country code and a year.');
      return;
    }
  
    // Construct API URL with user input
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`;
  
    // Make API call to fetch holiday data
    fetch(url)
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
      .then(data => {
        // Handle case when no holidays are found
        if (data.length === 0) {
          resultsBody.innerHTML = '<tr><td colspan="5">No public holidays found.</td></tr>';
          return;
        }
  
        // Loop through each holiday in the data
        data.forEach(holiday => {
          // Create a new table row
          const row = document.createElement('tr');
  
          // Create and add date cell
          const dateCell = document.createElement('td');
          dateCell.textContent = holiday.date;
          row.appendChild(dateCell);
  
          // Create and add name cell
          const nameCell = document.createElement('td');
          nameCell.textContent = holiday.name;
          row.appendChild(nameCell);
  
          // Create and add local name cell
          const localNameCell = document.createElement('td');
          localNameCell.textContent = holiday.localName;
          row.appendChild(localNameCell);
  
          // Create and add country code cell
          const countryCell = document.createElement('td');
          countryCell.textContent = holiday.countryCode;
          row.appendChild(countryCell);
  
          // Create and add global status cell (checkbox)
          const globalCell = document.createElement('td');
          globalCell.innerHTML = holiday.global ? '&#x2611;' : '&#x2610;'; // ☑ or ☐
          row.appendChild(globalCell);
  
          // Add the completed row to the results table
          resultsBody.appendChild(row);
        });
      })
      .catch(error => {
        // Display any errors in the results area
        resultsBody.innerHTML = `<tr><td colspan="5">Error: ${error.message}</td></tr>`;
      });
  }
