let precios = document.querySelectorAll(".updateSubscriptionOptionPrice,.transactionRowAmountDue,.itemSubtext,.game_area_purchase_game_dropdown_menu_item_text,.game_area_purchase_game_dropdown_selection span");
precios.forEach(precio => {
    precio.innerHTML = precio.innerHTML + " &nbsp;"; // Previene errores
    check(precio);
});
let spans = document.querySelectorAll(".suscription-price");
spans.forEach(span => {
    if(walletBalance < span.innerText){
        span.innerHTML = span.dataset.argentinaPrice + emojiMate;
        span.classList.add("argentina");
    } else{
        span.innerHTML += emojiWallet;
        span.classList.add("original");
    }
    if(!span.parentElement.classList.contains("game_area_purchase_game_dropdown_menu_item_text")){
        span.addEventListener('click',showSecondaryPrice);
    }
})

function check(element,start = 0){
    if(element.innerText.indexOf("ARS$ ",start) != -1)
    {
        let inicioNumero = element.innerHTML.indexOf("ARS$ ",start) + 5;
        let finNumero = element.innerHTML.indexOf(" ",inicioNumero);
        let numeroOriginal = element.innerHTML.substring(inicioNumero,finNumero);
        let numeroWallet = sanitize(element.innerHTML.substring(inicioNumero,finNumero));
        let numeroArgentino = calcularImpuestos(stringToNumber(numeroWallet,"none")/100,hoy);

        element.innerHTML = element.innerHTML.replace(
            numeroOriginal,`<span class="suscription-price" data-argentina-price="${numeroArgentino}" data-original-price="${numeroWallet}">${numeroWallet}</span>`
        );

        check(element,finNumero); // Hago un chequeo recursivo para verificar si hay más strings de ARS$
    } 
}

function sanitize(numero){
    let price = parseFloat(numero.replace(".","").replace(",",".")).toFixed(2);
    return price.indexOf("/") != -1 ? price.slice(0,price.indexOf("/")) : price; 
}