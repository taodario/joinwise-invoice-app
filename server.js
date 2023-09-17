const express = require('express');
const path = require('path');
const fs = require('fs');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const app = express();

app.use(express.static(path.join(__dirname, '.')));
app.use(express.json());

app.post('/generate-pdf', async (req, res) => {
    console.log('Endpoint hit');  // Log a message as soon as the endpoint is hit
  
    try {
      console.log('Received data:', req.body);  // Log the received data
  
      const data = req.body;
  
      const pdfDoc = await PDFDocument.create();
  
      const page = pdfDoc.addPage([600, 400]);
      page.drawText(`BILL TO: ${data.billTo}`, { x: 50, y: 350, size: 12 });
      page.drawText(`Date: ${data.date}`, { x: 50, y: 330, size: 12 });
      page.drawText(`Invoice No.: ${data.invoiceNo}`, { x: 50, y: 310, size: 12 });
      page.drawText(`Payment Terms: ${data.paymentTerms}`, { x: 50, y: 290, size: 12 });
      page.drawText(`DESCRIPTION: ${data.description}`, { x: 50, y: 270, size: 12 });
      page.drawText(`QTY: ${data.qty}`, { x: 50, y: 250, size: 12 });
      page.drawText(`UNIT PRICE: ${data.unitPrice}`, { x: 50, y: 230, size: 12 });
      page.drawText(`TOTAL: ${data.total}`, { x: 50, y: 210, size: 12 });
  
      const pdfBytes = await pdfDoc.save();
  
      // Save the PDF to a file on the server's filesystem
      const outputPath = path.join(__dirname, 'output.pdf');
      fs.writeFileSync(outputPath, pdfBytes);
  
      console.log('PDF generated successfully');  // Log a message after the PDF is generated
  
      res.sendFile(outputPath);
    } catch (error) {
      console.error('Error generating PDF:', error);  // Log the error details
      res.status(500).send(error.message);
    }
  });
  

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
