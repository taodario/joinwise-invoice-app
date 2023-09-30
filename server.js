// Importing necessary modules
const express = require('express'); // Express is a web framework for Node.js
const path = require('path'); // Path is a Node.js module for working with file and directory paths
const fs = require('fs'); // FS (File System) is a Node.js module for working with the file system
const { PDFDocument, StandardFonts } = require('pdf-lib'); // pdf-lib is a library for creating and editing PDF documents

// Creating an Express application
const app = express();

// Serving static files (like HTML, CSS, and JS) from the current directory
app.use(express.static(path.join(__dirname, '.')));

// Parsing incoming JSON requests
app.use(express.json());

// Defining a POST endpoint to generate PDFs
app.post('/generate-pdf', async (req, res) => {
    console.log('Endpoint hit'); // Logging when the endpoint is accessed
  
    try {
      console.log('Received data:', req.body); // Logging the received data from the client
  
      // Storing the received data in a variable
      const data = req.body;
  
      // Creating a new PDF document
      const pdfDoc = await PDFDocument.create();
  
      // Adding a page to the PDF document and drawing text on it
      const page = pdfDoc.addPage([600, 400]);
      // Drawing the received data at specified coordinates on the PDF page
      page.drawText(`BILL TO: ${data.billTo}`, { x: 50, y: 350, size: 12 });
      // ... (similar lines for other data fields)
  
      // Saving the PDF document to a variable
      const pdfBytes = await pdfDoc.save();
  
      // Writing the PDF bytes to a file on the server's file system
      const outputPath = path.join(__dirname, 'output.pdf');
      fs.writeFileSync(outputPath, pdfBytes);
  
      console.log('PDF generated successfully'); // Logging when the PDF is successfully generated
  
      // Sending the generated PDF file as a response to the client
      res.sendFile(outputPath);
    } catch (error) {
      console.error('Error generating PDF:', error); // Logging any errors that occur during PDF generation
      // Sending an error response to the client
      res.status(500).send(error.message);
    }
});

// Handling any unhandled errors that occur in the application
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err); // Logging the error details
  // Sending an error response to the client
  res.status(500).send('Internal Server Error');
});

// Starting the Express server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000'); // Logging when the server is started
});