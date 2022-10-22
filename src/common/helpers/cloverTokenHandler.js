function cloverTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'cloverToken');
    hiddenInput.setAttribute('value', token);
    form.appendChild(hiddenInput);
    form.submit();
}