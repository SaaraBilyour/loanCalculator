// listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // Hide Results
    document.getElementById('results').style.display = 'none';
    //Show loading img
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults,2000);
    e.preventDefault();
    //document.getElementById('results').style.display = 'none';
});


function calculateResults(e) {
    console.log('calculating ..');
    //UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayment = parseFloat(years.value) * 12;
    
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    
    // check if the numbre is +-infinity , NaN
    // Note : if the numbre is '0' it will return true 
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbres');
    }
    //e.preventDefault();
}

function showError(error) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    // insert the error before the heading
    card.insertBefore(errorDiv, heading);
    //clear error after few seconds - 3s
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}