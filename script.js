document.addEventListener("DOMContentLoaded", function () {

    fetch("https://open.er-api.com/v6/latest/USD")
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);

            const fromCurrencyDropdown = document.getElementById("fromCurrency");
            const toCurrencyDropdown = document.getElementById("toCurrency");

            currencies.forEach(currency => {
                const option1 = document.createElement("option");
                // option1.value = currency;
                option1.text = currency;
                fromCurrencyDropdown.add(option1);

                const option2 = document.createElement("option");
                // option2.value = currency;
                option2.text = currency;
                toCurrencyDropdown.add(option2);
            });
        })
        .catch(error => console.error("Error fetching currency data:", error));
});

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    const apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const result = amount * exchangeRate;

            document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => console.error("Error converting currency:", error));
}