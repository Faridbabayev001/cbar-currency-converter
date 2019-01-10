# Cbar Currency Converter



A simple currency converter based on [cbar.az](https://cbar.az).

## Getting started

### Installation
This package can be installed using npm

```
npm install cbar-currency-converter
```

### Usage
Import `cbar-currency-converter` and use it as a Promise.

```
const cbar = require('cbar-currency-converter');

cbar({ to: "USD", "amount": 1 }).then(response => console.log(response));

// OR

cbar({ from: "USD", "amount": 1 }).then(response => console.log(response));

```

Without the last parameter, the function will return the currency based on the current day conversion. To pass the date to convert, pass the last parameter in the format `DD.MM.YYYY`.

```
const cbar = require('cbar-currency-converter');

cbar({ to: "USD", "amount": 1, currencyDate: "25.12.2018" }).then(response => console.log(response));
```

## Issues
If any issues are found, they can be reported [here](https://github.com/Faridbabayev001/cbar-currency-converter/issues).

## License

This project is licensed under the [MIT](LICENSE) license.
