const submitBtn = document.getElementById('convertBtn');

submitBtn.addEventListener('click', function() {
    const binary = document.getElementById('binaryInput').value.trim();
    const resultOutput = document.getElementById('result');

    // Validate input: only 0 or 1, max 8 digits
    if (!/^[01]{1,8}$/.test(binary)) {
        resultOutput.textContent = 'Please enter a valid 8-bit binary number (only 0 or 1).';
        resultOutput.style.color = 'red';
        return;
    }

    // Convert binary to decimal
    const decimal = parseInt(binary, 2);
    resultOutput.textContent = 'Decimal: ' + decimal;
    resultOutput.style.color = '#333';
});
