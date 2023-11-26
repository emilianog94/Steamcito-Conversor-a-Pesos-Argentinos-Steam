const attributeName = "data-original-price";

let devoluciones = [
	{
		value: 1,
		day: 1,
		month: 1,
		year: 2019
	},
	{
		value: 45,
		day: 1,
		month: 1,
		year: 2023
	}
]

let standardTaxes = [
	{
		name: "Impuesto PAIS - RG AFIP N° 4659/2020",
		values: [
			{
				value: 30,
				day: 21,
				month: 12,
				year: 2019
			}
		],
		moreInfo: "https://www.boletinoficial.gob.ar/detalleAviso/primera/224404/20200107"
	},
	{
		name: "Percepción de Impuesto a las Ganancias - RG AFIP Nº 5232/2022",
        values: [
			{
				value: 35,
				day: 15,
				month: 09,
				year: 2020
			},
			{
				value: 45,
				day: 13,
				month: 07,
				year: 2022
			},
			{
				value: 100,
				day: 23,
				month: 11,
				year: 2023
			}
		],
        moreInfo: "https://www.boletinoficial.gob.ar/detalleAviso/primera/266506/20220714"
	},
	{
        name: "Percepción de Bienes Personales - RG AFIP Nº 5430/2023",
        values: [
			{
				value: 25,
				day: 10,
				month: 10,
				year: 2023
			}
		],
        moreInfo: "https://www.boletinoficial.gob.ar/#!DetalleNorma/295840/20231010"
    }
]

let impuestosGanancias = standardTaxes[1].values;

let provinceTaxes = [
    {
        name: "Cargá los impuestos de tu provincia para que el precio sea más exacto.<br><a href='https://steamcito.com.ar/impuestos-hoy/#impuestos-provinciales' target='_blank'>Ver listado de impuestos provinciales en Steamcito</a>",
        value: 0
    }
]

let regionalPricingChart = [
    {
        usdPrice: 0.99,
        argPrice: 82.00
    },
    {
        usdPrice: 1.99,
        argPrice: 165.00
    },
    {
        usdPrice: 2.99,
        argPrice: 249.00
    },
    {
        usdPrice: 3.99,
        argPrice: 320.00
    },
    {
        usdPrice: 4.99,
        argPrice: 400.00
    },
    {
        usdPrice: 5.99,
        argPrice: 475.00
    },
    {
        usdPrice: 6.99,
        argPrice: 550.00
    },
    {
        usdPrice: 7.99,
        argPrice: 620.00
    },
    {
        usdPrice: 8.99,
        argPrice: 700.00
    },
    {
        usdPrice: 9.99,
        argPrice: 765.00
    },
    {
        usdPrice: 10.99,
        argPrice: 835.00
    },
    {
        usdPrice: 11.99,
        argPrice: 900.00
    },
    {
        usdPrice: 12.99,
        argPrice: 970.00
    },
    {
        usdPrice: 13.99,
        argPrice: 1000.00
    },
    {
        usdPrice: 14.99,
        argPrice: 1050.00
    },
    {
        usdPrice: 15.99,
        argPrice: 1100.00
    },
    {
        usdPrice: 16.99,
        argPrice: 1200.00
    },
    {
        usdPrice: 17.99,
        argPrice: 1300.00
    },
    {
        usdPrice: 18.99,
        argPrice: 1350.00
    },
    {
        usdPrice: 18.99,
        argPrice: 1400.00
    },
    {
        usdPrice: 18.99,
        argPrice: 1350.00
    },
    {
        usdPrice: 19.99,
        argPrice: 1400.00
    },
    {
        usdPrice: 24.99,
        argPrice: 1750.00
    },
    {
        usdPrice: 29.99,
        argPrice: 2100.00
    },
    {
        usdPrice: 34.99,
        argPrice: 2400.00
    },
    {
        usdPrice: 39.99,
        argPrice: 2600.00
    },
    {
        usdPrice: 44.99,
        argPrice: 2850.00
    },
    {
        usdPrice: 49.99,
        argPrice: 3200.00
    },
    {
        usdPrice: 54.99,
        argPrice: 3700.00
    },
    {
        usdPrice: 59.99,
        argPrice: 3800.00
    },
    {
        usdPrice: 64.99,
        argPrice: 4100.00
    },
    {
        usdPrice: 69.99,
        argPrice: 4500.00
    },
    {
        usdPrice: 74.99,
        argPrice: 4750.00
    },
    {
        usdPrice: 79.99,
        argPrice: 5100.00
    },
    {
        usdPrice: 84.99,
        argPrice: 5400.00
    },
    {
        usdPrice: 89.99,
        argPrice: 5700.00
    },
    {
        usdPrice: 89.99,
        argPrice: 5700.00
    },
    {
        usdPrice: 89.99,
        argPrice: 5700.00
    },
    {
        usdPrice: 99.99,
        argPrice: 6400.00
    },
    {
        usdPrice: 119.99,
        argPrice: 7600.00
    },
    {
        usdPrice: 129.99,
        argPrice: 8200.00
    },
    {
        usdPrice: 149.99,
        argPrice: 9500.00
    },
    {
        usdPrice: 199.99,
        argPrice: 13000.00
    },
]

let regionalPricingChartLatam = [
    {
        usdPrice: 0.99,
        argPrice: 0.89
    },
    {
        usdPrice: 1.99,
        argPrice: 1.49
    },
    {
        usdPrice: 2.99,
        argPrice: 1.99
    },
    {
        usdPrice: 3.99,
        argPrice: 2.49
    },
    {
        usdPrice: 4.99,
        argPrice: 2.99
    },
    {
        usdPrice: 5.99,
        argPrice: 3.59
    },
    {
        usdPrice: 6.99,
        argPrice: 3.99
    },
    {
        usdPrice: 7.99,
        argPrice: 4.49
    },
    {
        usdPrice: 8.99,
        argPrice: 4.99
    },
    {
        usdPrice: 9.99,
        argPrice: 5.79
    },
    {
        usdPrice: 10.99,
        argPrice: 6.29
    },
    {
        usdPrice: 11.99,
        argPrice: 6.59
    },
    {
        usdPrice: 12.99,
        argPrice: 7.29
    },
    {
        usdPrice: 13.99,
        argPrice: 7.79
    },
    {
        usdPrice: 14.99,
        argPrice: 7.99
    },
    {
        usdPrice: 15.99,
        argPrice: 8.49
    },
    {
        usdPrice: 16.99,
        argPrice: 8.99
    },
    {
        usdPrice: 17.99,
        argPrice: 9.29
    },
    {
        usdPrice: 18.99,
        argPrice: 9.89
    },
    {
        usdPrice: 19.99,
        argPrice: 10.99
    },
    {
        usdPrice: 24.99,
        argPrice: 12.49
    },
    {
        usdPrice: 29.99,
        argPrice: 14.99
    },
    {
        usdPrice: 34.99,
        argPrice: 17.99
    },
    {
        usdPrice: 39.99,
        argPrice: 18.99
    },
    {
        usdPrice: 44.99,
        argPrice: 20.99
    },
    {
        usdPrice: 49.99,
        argPrice: 22.99
    },
    {
        usdPrice: 54.99,
        argPrice: 25.99
    },
    {
        usdPrice: 59.99,
        argPrice: 26.99
    },
    {
        usdPrice: 64.99,
        argPrice: 29.99
    },
    {
        usdPrice: 69.99,
        argPrice: 32.99
    },
    {
        usdPrice: 74.99,
        argPrice: 34.99
    },
    {
        usdPrice: 79.99,
        argPrice: 36.99
    },
    {
        usdPrice: 84.99,
        argPrice: 38.99
    },
    {
        usdPrice: 89.99,
        argPrice: 41.99
    },
    {
        usdPrice: 99.99,
        argPrice: 45.99
    },
    {
        usdPrice: 119.99,
        argPrice: 55.99
    },
    {
        usdPrice: 129.99,
        argPrice: 59.99
    },
    {
        usdPrice: 149.99,
        argPrice: 69.99
    },
    {
        usdPrice: 199.99,
        argPrice: 92.99
    },
]

const regionalPricingOptions = regionalPricingChart.map(item => item.usdPrice)
const regionalPricingOptionsLatam = regionalPricingChartLatam.map(item => item.usdPrice)



function setProvinceTax() {
    if (localStorage.hasOwnProperty('province-tax')) {
        let taxValue = localStorage.getItem('province-tax');

        if (taxValue == 0) {
            return [{
                name: "No se seleccionaron impuestos provinciales. <a href='https://steamcito.com.ar/impuestos-hoy#impuestos-provinciales' target='_blank'>(Listado de impuestos provinciales)</a>",
                value: taxValue
            }]
        }

        return [{
            name: "Impuestos Provinciales personalizados por vos",
            value: taxValue
        }]
    }

    return provinceTaxes;
}

function setNationalTax() {

    if (localStorage.hasOwnProperty('national-tax')) {
        let taxValue = localStorage.getItem('national-tax');

        if (taxValue == 0) return standardTaxes;

        standardTaxes = [{
            name: "Impuestos Nacionales personalizados por vos",
            values:
			[
				{
					value: taxValue,
					day: 0,
					month: 0,
					year: 0
				}
			]
        }];
    }

    // Si no existen custom taxes nacionales en localStorage, agarrar taxes oficiales
    return standardTaxes;
}

let taxes = setNationalTax();
provinceTaxes = setProvinceTax();

const priceContainers = `
        .discount_original_price:not([${attributeName}]), 
        .discount_final_price:not([${attributeName}]), 
        .game_purchase_price:not([${attributeName}]), 
        [class*=salepreviewwidgets_StoreSalePriceBox]:not([${attributeName}]), 
        [class*=salepreviewwidgets_StoreOrignalPrice]:not([${attributeName}]), 
        [class*=salepreviewwidgets_StoreOriginalPrice]:not([${attributeName}]), 
        .search_price:not([${attributeName}]), 
        .regular_price:not([${attributeName}]), 
        .match_price:not([${attributeName}]), 
        .cart_item .price:not([${attributeName}]),
        .price.bundle_final_package_price:not([${attributeName}]),
        .price.bundle_final_price_with_discount:not([${attributeName}]),
        .bundle_savings:not([${attributeName}]),
        .package_info_block_content .price:not([${attributeName}]),
        #package_savings_bar .savings:not([${attributeName}]),
        .promo_item_list .price span:not([${attributeName}]),
        .apphub_StorePrice .price:not([${attributeName}]),
        .item_def_price:not([${attributeName}]),
        .match_subtitle:not([${attributeName}]),
        .regional-meter-price:not([${attributeName}])        
        `;

function calcularImpuestos(initialPrice,date) {
	// Hago una variable para guardar la suma de los impuestos.
	let taxes = 0;
	// Recorro el arreglo del historial de impuestos
	for(let t = 0; t < standardTaxes.length; t++)
	{
		// Obtengo el impuesto en la posición actual
		let currentTaxes = standardTaxes[t].values;
		// Inicializo una variable tax para almacenar el impuesto que corresponderá según la fecha al finalizar el loop.
		let tax = 0;
		// Recorro el arreglo de valores de impuestos para comprobar las fechas
		for(let v = 0; v < currentTaxes.length; v++)
		{
			// Impuesto actual
			let currentTax = currentTaxes[v];
			// Comparo la fecha del impuesto con la de la compra.
			// Si el año de la compra es mayor que la del impuesto.
			// O: coinciden los años
			// 		Y: el mes de la compra es mayor que la del impuesto
			//			O: coinciden los meses
			//				Y: el dia de la compra es mayor o igual que la del impuesto
			if(date.year > currentTax.year || (date.year == currentTax.year && (date.month > currentTax.month || (date.month == currentTax.month && date.day >= currentTax.day))))
			{
				// tax tendrá el valor del impuesto
				tax = currentTax.value;
			}
			else
			{
				// Si ya no coincide ningún impuesto, dejo de recorrer el arreglo, como está ordenado de más viejo al más nuevo, donde haya un impuesto más nuevo que la compra se cortará el loop.
				break;
			}
		}
		// Si tax no es 0, quiere decir que se encontró algún impuesto que se aplica.
		if(tax != 0)
		{
			// Sumo el impuesto a la variable de impuestos a aplicar.
			taxes += tax;
		}
	}
	if(taxes == 0)
	{
		taxes = 1;
	}
	let finalPrice = (initialPrice) * (taxes / 100);
	
    provinceTaxes &&
        provinceTaxes.forEach(tax => {
            finalPrice += parseFloat(((initialPrice) * tax.value / 100).toFixed(2));
        })
    return finalPrice.toFixed(2);
}

function calcularDevoluciones(initialPrice, date)
{
	let impGanancias = 0;
	let devolucion = 0;
	for(let t = 0; t < impuestosGanancias.length; t++)
	{
		let currentTax = impuestosGanancias[t];
		if(date.year > currentTax.year || (date.year == currentTax.year && (date.month > currentTax.month || (date.month == currentTax.month && date.day >= currentTax.day))))
		{
			// tax tendrá el valor del impuesto
			impGanancias = currentTax.value;
		}
		else
		{
			break;
		}
	}
	for(let d = 0; d < devoluciones.length; d++)
	{
		let currentTax = devoluciones[d];
		if(date.year > currentTax.year || (date.year == currentTax.year && (date.month > currentTax.month || (date.month == currentTax.month && date.day >= currentTax.day))))
		{
			// tax tendrá el valor del impuesto
			devolucion = currentTax.value;
		}
		else
		{
			break;
		}
	}
	return initialPrice * (impGanancias / 100) * (devolucion/100);
}

 function calculateTaxesAndExchange(initialPrice, date, exchangeRate = "unset") {

    if(exchangeRate=="unset"){
        exchangeRate = JSON.parse(localStorage.getItem('steamcito-cotizacion')).rate;
    }

    let arsPriceBeforeTaxes = initialPrice * exchangeRate
    // Hago una variable para guardar la suma de los impuestos.
	let taxes = 0;
	// Recorro el arreglo del historial de impuestos
	for(let t = 0; t < standardTaxes.length; t++)
	{
		// Obtengo el impuesto en la posición actual
		let currentTaxes = standardTaxes[t].values;
		// Inicializo una variable tax para almacenar el impuesto que corresponderá según la fecha al finalizar el loop.
		let tax = 0;
		// Recorro el arreglo de valores de impuestos para comprobar las fechas
		for(let v = 0; v < currentTaxes.length; v++)
		{
			// Impuesto actual
			let currentTax = currentTaxes[v];
			// Comparo la fecha del impuesto con la de la compra.
			// Si el año de la compra es mayor que la del impuesto.
			// O: coinciden los años
			// 		Y: el mes de la compra es mayor que la del impuesto
			//			O: coinciden los meses
			//				Y: el dia de la compra es mayor o igual que la del impuesto
			if(date.year > currentTax.year || (date.year == currentTax.year && (date.month > currentTax.month || (date.month == currentTax.month && date.day >= currentTax.day))))
			{
				// tax tendrá el valor del impuesto
				tax = currentTax.value;
			}
			else
			{
				// Si ya no coincide ningún impuesto, dejo de recorrer el arreglo, como está ordenado de más viejo al más nuevo, donde haya un impuesto más nuevo que la compra se cortará el loop.
				break;
			}
		}
		// Si tax no es 0, quiere decir que se encontró algún impuesto que se aplica.
		if(tax != 0)
		{
			// Sumo el impuesto a la variable de impuestos a aplicar.
			taxes += tax;
		}
	}
	if(taxes == 0)
	{
		taxes = 1;
	}
	let finalPrice = arsPriceBeforeTaxes * (taxes / 100);
	
    provinceTaxes &&
        provinceTaxes.forEach(tax => {
            finalPrice += parseFloat((arsPriceBeforeTaxes * tax.value / 100).toFixed(2));
        })

    return finalPrice.toFixed(2);
}


function getBalance() {
    let walletBalanceContainer = document.querySelector("#header_wallet_balance");
    if (localStorage.getItem('manual-mode') == "wallet") {
        return 9999999;
    } else if (localStorage.getItem('manual-mode') == "mate") {
        return 0;
    }
    else if (walletBalanceContainer) {
        walletBalanceContainer.innerHTML += emojiWallet;
        // Fix para resolver problema de detección de saldo cuando tenés un reembolso pendiente
        let walletBalance = document.createElement('p');
        walletBalance.innerText = walletBalanceContainer.innerText;
        if(walletBalance.innerText.indexOf('Pend')){
            walletBalance.innerText = walletBalance.innerText.slice(0, walletBalance.innerText.indexOf('Pend'))
        }
        // return 6.12;
        return stringToNumber(walletBalance);
    }
    return 0;
}

function isStoreDolarized(){
    // Si la tienda no está dolarizada
    if(Date.now() < 1700449200000){
        return false;
    }
    return true;
}

function extractNumberFromString(string){
    let regexFindNumber = /(\d{1,3}(,\d{3})*(\.\d+)?)/;
    let match = string.match(regexFindNumber);
    if(match){
        return match[0].replace(/,/g, '');
    }


}

function stringToNumber(number, positionArs = 5) {

    if(!number.innerText.includes('ARS')){
        return extractNumberFromString(number.innerText);
    }

    // Comprobación para cuando a Steam le pinta cambiar el orden de las comas y decimales!
    const numero = number.innerText;
    if (numero) {
        if (numero.indexOf(',') != -1 && numero.indexOf('.') != -1) {
            if (numero.indexOf(',') < numero.indexOf('.')) {
                const numeroArreglado = numero.replace(',', '')
                return parseFloat(numeroArreglado.slice(positionArs));
            }
        }
    }

    if (numero) {
        if (numero.indexOf(',') == -1) {
            const numeroArreglado = numero;
            return parseFloat(numeroArreglado.slice(positionArs));
        }
    }


    if (positionArs != "none") {
        return parseFloat(number.innerText.slice(positionArs).replace(".", "").replace(",", "."));
    } else {
        return parseFloat(number.replace(".", "").replace(",", "."));
    }
}

function stringToNumber2(number, positionArs = 5) {
    return parseFloat(number.slice(positionArs).replace(".", "").replace(",", "."));
}

function numberToString(number) {
    if (number) {
        let parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return 'ARS$ ' + parts.join(",");
    }
}

function numberToStringUsd(number) {
    if (number) {
        let parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return 'USD$ ' + parts.join(",");
    }
}

function numberToStringSub(number) {
    return `${number}`.replace('.', ',');
}

function isInsideString(element, string) {
    return element.innerText.indexOf(string) != -1 ? true : false;
}

function argentinizar(contenedor, emoji = true) {
    let emojiStatus = emoji ? emojiMate : "";
    return numberToString(contenedor) + emojiStatus;
}

function steamizar(contenedor, emoji = true) {
    let emojiStatus = emoji ? emojiWallet : "";
    return numberToString(contenedor) + emojiStatus;
}

const currentChange = "patch"; // patch | minor | major

function showUpdate() {
    chrome.storage.local.get(['justUpdated'], function (result) {

        // Si es la primera vez que se abre desde la actualización
        if (result.justUpdated == 1 && currentChange == "major") {
            let header = document.querySelector('#global_header');
            let changelogUrl = 'https://steamcito.com.ar/changelog'
            let newVersion = chrome.runtime.getManifest().version;

            let updateAdvice = `
                <div class="actualizacion-steamcito">
                    <p>${emojiMate} ¡Steamcito se actualizó correctamente a la versión ${newVersion}! 
                        <a href="${changelogUrl}" target="_blank">¿Qué hay de nuevo?</a>
                    </p> 
                </div>
            `;

            header.insertAdjacentHTML('afterend', updateAdvice);
            chrome.storage.local.set({ justUpdated: 0 });
        }
    });
}