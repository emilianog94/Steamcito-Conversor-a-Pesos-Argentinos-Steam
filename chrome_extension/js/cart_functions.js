(async() => {
    await getUsdExchangeRate();

    let oldCart = document.querySelector(".estimated_total_box");
    let walletElement = document.querySelector('#cart_estimated_total');
    let cartTotal = getCartTotal();
    let cartTotalCreditCard = setCartTotalCC(cartTotal);
    let cartTotalMixed = setMixedCartTotal(cartTotal);
    


    function getCartTotal() {
        return stringToNumber(walletElement);
    }
    
    function setCartTotalCC(cartValue) {
        if(!walletElement.innerText.includes('ARS')){
            walletElement.dataset.currency = "usd"
            return calculateTaxesAndExchange(cartValue,hoy)
        }
        walletElement.dataset.currency = "ars"
        return calcularImpuestos(cartValue,hoy);
    }
    
    function setMixedCartTotal(cartValue) {
    
        if (walletBalance > 0) {
    
            if(!walletElement.innerText.includes('ARS')){
                walletElement.dataset.currency = "usd"
                return calculateTaxesAndExchange(cartValue - walletBalance,hoy)
            }
            return calcularImpuestos(cartValue - walletBalance,hoy);
        }
    }
    
    
    function showExchangeRate() {
        
        let staticExchangeRate = JSON.parse(localStorage.getItem('steamcito-cotizacion')).rate;
        let newExchangeRate = JSON.parse(localStorage.getItem('steamcito-cotizacion')).rate;

        standardTaxes &&
        standardTaxes.forEach(tax => {
            newExchangeRate += parseFloat((staticExchangeRate * tax.value / 100).toFixed(2));
        })

        provinceTaxes &&
        provinceTaxes.forEach(tax => {
            newExchangeRate += parseFloat((staticExchangeRate * tax.value / 100).toFixed(2));
        })

        
        let exchangeRateContainer = 
            `<div class="tax-container">
                <h3>Cotización del dólar con todos los impuestos incluidos: <br> 1 USD ≈ ${newExchangeRate} ARS </h3>
                <p>
                    Todos los precios en pesos argentinos (ARS$) son aproximados ya que cada banco/entidad tiene su propia cotización del dólar. De acuerdo al banco/aplicación que uses, es posible que pagues más o menos que el monto indicado.
                </p>
                
            </div>`
    
            oldCart.insertAdjacentHTML('afterend', exchangeRateContainer);
    }
    
    
    function showCart() {
        let estimatedTotalDisplay = walletBalance < cartTotal ? "hide" : "show";
        let totalMixedDisplay = estimatedTotalDisplay == "hide" && walletBalance != 0 ? "show" : "hide";
    
        let newCart =
        `<div class="estimated_total_extension">
    
            <div class="total_wallet"> 
                <p>Total Final pagando con Steam Wallet </p>
                <span class="green">${walletElement.dataset.currency == "ars" ? numberToString(cartTotal.toFixed(2)) : numberToStringUsd(cartTotal)} ${emojiWallet}</span>
            </div>
    
            <div class="total_cc">
                <p>Total Aproximado pagando con Tarjeta</p>
                <span>${numberToString(cartTotalCreditCard)} ${emojiMate}</span>        
            </div>
    
            <div class="total_mixed ${totalMixedDisplay}">
                <p>Total Aproximado pagando con Steam Wallet + Tarjeta</p>
                <span> <span class="green">${walletElement.dataset.currency == "ars" ? numberToString(walletBalance) : numberToStringUsd(walletBalance)} ${emojiWallet} </span> + &nbsp;${numberToString(cartTotalMixed)} ${emojiMate}</span>        
            </div>
    
        </div>`;
        oldCart.insertAdjacentHTML('afterbegin', newCart);
    }
    
    function showTaxes() {
        let taxesContainer =
            `<div class="tax-container">
            <h3>Impuestos Nacionales</h3>
            <ul class="impuestos-nacionales"></ul>
    
            <span class="taxes-separator"></span>
    
            <h3>Impuestos Provinciales</h3>
            <ul class="impuestos-provinciales"></ul>  
            
            <span class="taxes-separator"></span>
    
            <div class="taxes-final-total">
                <span class="final-total">Total de Impuestos: ${((totalTaxes - 1) * 100).toFixed(2)}%</span>
                <p id="tax-change">Personalizar impuestos</p>
            </div>
    
        </div>`;
        oldCart.insertAdjacentHTML('afterend', taxesContainer);
    
        taxes.forEach(tax => showFullInfo(tax, "national"));
        provinceTaxes && provinceTaxes.forEach(tax => showFullInfo(tax, "province"));
    
        function showFullInfo(tax, type) {
            let taxList = `
            <li>
                <p>${tax.name}</p>&nbsp;
                <a href="${tax.moreInfo}" target="_blank">
                    <span>(Boletín Oficial)</span>
                </a>
                <p class="value">${tax.value}%</p>
            </li>
            `
            if (type == "national") {
                document.querySelector(".tax-container ul.impuestos-nacionales").insertAdjacentHTML('afterbegin', taxList);
            } else {
                document.querySelector(".tax-container ul.impuestos-provinciales").insertAdjacentHTML('afterbegin', taxList);
            }
        }
    }
    
    
    showCart();
    showTaxes();
    if(isStoreDolarized()){
        showExchangeRate();
    }

    
    
    let taxChangeShortcut = document.querySelector("#tax-change");
    taxChangeShortcut.addEventListener('click', function () {
        setTimeout(function () {
            steamcitoIcon.click();
        }, 1);
    });
    






})();



