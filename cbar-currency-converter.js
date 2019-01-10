const https = require("https");
const convert = require('xml-js');
const moment = require('moment');

module.exports = function(converOptions) {
    let currencyDate
    if (typeof converOptions == "undefined") {
        currencyDate = moment().format('DD.MM.YYYY');
    } else if (("currencyDate" in converOptions)) {
        currencyDate = moment(converOptions["converOptions"]).format('DD.MM.YYYY')
    } else {
        currencyDate = moment().format('DD.MM.YYYY');
    }
    const options = {
        host: 'www.cbar.az',
        port: 443,
        path: '/currencies/' + currencyDate + '.xml',
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        var req = https.request(options, (res) => {
            res.setEncoding('utf8');
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                let jsObject = convert.xml2js(data);
                let ValType = jsObject["elements"][0]["attributes"];
                let CbarData = {}
                CbarData["Date"] = ValType["Date"];
                CbarData["Name"] = ValType["Name"];
                CbarData["Description"] = ValType["Description"];
                jsObject["elements"].forEach((Elements) => {
                    Elements["elements"].forEach((Valutes) => {
                        Valutes["elements"].forEach((valute) => {
                            CbarData[valute["attributes"]["Code"]] = {
                                "Nominal": valute["elements"][0]["elements"][0]["text"],
                                "Name": valute["elements"][1]["elements"][0]["text"],
                                "Value": valute["elements"][2]["elements"][0]["text"]
                            }
                        })
                    });
                })
                let result;
                if (typeof converOptions != "undefined") {
                    if (("from" in converOptions) && ("amount" in converOptions)) {
                        result = parseFloat(converOptions["amount"]) / parseFloat(CbarData[converOptions["from"]]["Value"])
                    } else if (("to" in converOptions) && ("amount" in converOptions)) {
                        result = parseFloat(converOptions["amount"]) * parseFloat(CbarData[converOptions["to"]]["Value"])
                    }
                } else {
                    result = CbarData
                }

                resolve(result)
            });

        });

        req.on('error', (e) => {
            reject(e.message);
        });

        req.end();
    });




}