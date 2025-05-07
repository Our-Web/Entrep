const form = document.getElementById('reservationForm');
const priceField = document.getElementById('price');
const ticketsInput = document.getElementById('tickets');
const receiptContainer = document.getElementById('receiptContainer');


ticketsInput.addEventListener('input', () => {
  const pricePerTicket = 25; 
  const tickets = parseInt(ticketsInput.value) || 1;
  priceField.value = '₱' + (pricePerTicket * tickets).toFixed(2);
});


function generateReceiptCode() {
  return 'RCPT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}


function showLoading(btn) {
  btn.disabled = true;
  btn.innerHTML = 'Processing...';
}


function hideLoading(btn, originalText) {
  btn.disabled = false;
  btn.innerHTML = originalText;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  showLoading(submitBtn);

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const date = form.date.value;
  const tickets = form.tickets.value;
  const price = priceField.value;
  const receiptCode = generateReceiptCode();

  try {
    await fetch('https://script.google.com/macros/s/AKfycbzBd6BsDKOGR52MYpWODp3UaNmK4LZkIvv9AA1KvPCmmxskDhP8HLneZRJ-DahjuFh4DQ/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, date, tickets, price, receiptCode })
    });

    receiptContainer.innerHTML = `
      <div class="receipt">
        <h3>Thank you for reserving!</h3>
        <p>Your reservation has been received.</p>
        <p class="code">Receipt Code: ${receiptCode}</p>
        <p>Please keep this code for the event day.</p>
      </div>
    `;
    receiptContainer.style.display = 'block';
    form.reset();
    priceField.value = '';
  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error(error);
  } finally {
    hideLoading(submitBtn, 'Reserve Now');
  }
});
