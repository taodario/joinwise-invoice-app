// Function to calculate the total amount based on quantity and unit price
function calculateTotal() {
  // Getting the quantity and unit price values from the input fields and converting them to floating-point numbers
  let qty = parseFloat(document.getElementById('qty').value);
  let unitPrice = parseFloat(document.getElementById('unitPrice').value);
  
  // Calculating the total amount
  let total = qty * unitPrice;
  
  // Setting the calculated total amount in the 'total' input field
  document.getElementById('total').value = total;
}

// Asynchronous function to generate PDF
async function generatePDF() {
  try {
      // Creating an object to hold the values from the input fields
      const data = {
          // ... (other data fields)
      };
      
      // Sending a POST request to the server to generate the PDF
      const response = await fetch('http://localhost:3000/generate-pdf', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Converting the data object to a JSON string
      });
      
      // Checking if the server response is not ok, and throwing an error if it is not
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      
      // Creating a blob from the server response
      const blob = await response.blob();
      
      // Creating a link element to download the blob as a PDF file
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'invoice.pdf';
      
      // Triggering the download of the PDF file
      link.click();
  } catch (error) {
      // Logging any errors that occur during the PDF generation process
      console.error('Error:', error);
  }
}

// Function to add a new item row to the invoice form
function addItemRow() {
  // Creating a new div element to hold the item row
  const itemRow = document.createElement('div');
  itemRow.classList.add('item-row');
  
  // Setting the inner HTML of the item row div to include the input fields for description, quantity, and unit price
  itemRow.innerHTML = `
    <div>
      <label>DESCRIPTION:</label>
      <input type="text" name="description">
    </div>
    <div>
      <label>QTY:</label>
      <input type="number" name="qty">
    </div>
    <div>
      <label>UNIT PRICE:</label>
      <input type="number" name="unitPrice">
    </div>
  `;
  
  // Inserting the new item row div before the button in the invoice form
  document.querySelector('.invoice-form').insertBefore(itemRow, document.querySelector('button'));
}
