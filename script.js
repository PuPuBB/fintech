// Generate a random private key and display corresponding address and QR code
function generateWallet() {
    // Generate a random private key
    const privateKey = bitcoinjsLib.ECPair.makeRandom();

    // Get the public key from the private key
    const publicKey = privateKey.publicKey.toString('hex');

    // Generate the address from the public key
    const { address } = bitcoinjsLib.payments.p2pkh({ pubkey: privateKey.publicKey });

    // Display the address in the HTML
    document.getElementById('address').textContent = address;

    // Generate and display the QR code for the address
    QRCode.toCanvas(document.getElementById('qrcode'), address, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log('QR code generated!');
        }
    });
}

// Fetch the current Bitcoin price from a public API
function fetchBitcoinPrice() {
    fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
        .then(response => response.json())
        .then(data => {
            const price = data.bpi.USD.rate;
            document.getElementById('btc-price').textContent = `$${price}`;
        })
        .catch(error => console.error('Error fetching Bitcoin price:', error));
}

// Call the function to fetch Bitcoin price on page load
window.onload = fetchBitcoinPrice;
