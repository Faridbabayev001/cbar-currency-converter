const cbar = require('./cbar-currency-converter');


test('test module', () => {
    expect.assertions(1);

    return cbar({ to: "USD", "amount": 236 }).then(response => {
        expect(response).toBeDefined();
    })

    return cbar({ from: "EUR", "amount": 125 }).then(response => {
        expect(response).toBeDefined();
    })

    return cbar({ to: "EUR", "amount": 1 }).then(response => {
        expect(response).toBeDefined();
    })
});