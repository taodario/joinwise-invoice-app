function calculateTotal() {
    let qty = parseFloat(document.getElementById('qty').value);
    let unitPrice = parseFloat(document.getElementById('unitPrice').value);
    let total = qty * unitPrice;
    document.getElementById('total').value = total;
  }
  
  async function generatePDF() {
    try {
      const data = {
        billTo: document.getElementById('billTo').value,
        date: document.getElementById('date').value,
        invoiceNo: document.getElementById('invoiceNo').value,
        paymentTerms: document.getElementById('paymentTerms').value,
        description: document.getElementById('description').value,
        qty: document.getElementById('qty').value,
        unitPrice: document.getElementById('unitPrice').value,
        total: document.getElementById('total').value,
      };
  
      const response = await fetch('http://localhost:3000/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'invoice.pdf';
      link.click();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  