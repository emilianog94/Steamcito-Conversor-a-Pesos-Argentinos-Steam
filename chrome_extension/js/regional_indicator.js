const url = window.location.pathname;
let indicatorStyle = localStorage.getItem('estilo-barra');

const getAppData = (url) => {
    let appData = {
        type: '',
        id: ''
    };
    url.includes('/sub/') ? appData.type = "sub" : appData.type = "app";

    let startingPosition = url.indexOf('/', 1);
    let endingPosition = url.indexOf('/', startingPosition + 1);
    appData.id = url.slice(startingPosition + 1, endingPosition);
    return appData;
}

const criticizePublisher = (margin,publisher) => {

    const phrases = [
        `¿Lo trajiste de Dubai, ${publisher}?`,
        `¡Te fuiste al pasto ${publisher}!`,
        `¡Te zarpaste mal ${publisher}!`,
        `Epa, ¿qué rompimos ${publisher}?`,
        `¡Saladito ${publisher}!`,
        `¡Se te fue la mano ${publisher}!`,
        `${publisher}, hasta acá llegaste...`,
        `¿Viene firmado por Messi, ${publisher}?`,
        `${publisher}, en qué te has convertido...`
    ]

    const randomChoice = Math.floor(Math.random() * phrases.length);
    if(margin >= 100){
        return `<br><br><span>${phrases[randomChoice]}</span>`
    }
    return "";
}


const getExchangeRate = async () => {
    await getUsdExchangeRate();
    let exchangeRate = JSON.parse(localStorage.getItem('steamcito-cotizacion')).rate;
    let exchangeRateDate = JSON.parse(localStorage.getItem('steamcito-cotizacion')).rateDateProvided;

    renderExchangeIndicator(exchangeRate,exchangeRateDate)
    
}

const getAppPricing = async (appInitialData) => {
    await getUsdExchangeRate();
    const { type, id } = appInitialData;
    let appEndpoint = `/api/appdetails?appids=${id}`;
    let subEndpoint = `/api/packagedetails?packageids=${id}`

    const appIdFetch = await fetch(`${type == "app" ? `${appEndpoint}&cc=us` : `${subEndpoint}&cc=us`}`, { credentials: 'omit' })

    const appIdFetchArg = await fetch(`${type == "app" ? `${appEndpoint}&cc=ar` : `${subEndpoint}&cc=ar`}`, { credentials: 'omit' })

    let exchangeRate = JSON.parse(localStorage.getItem('steamcito-cotizacion')).rate;


    let appIdResponse = await appIdFetch.json();
    let appIdArgResponse = await appIdFetchArg.json();

    if (appIdResponse[id].success && appIdArgResponse[id].success) {
        if (appIdResponse[id].data.is_free || !appIdResponse[id].data[type == "sub" ? "price" : "price_overview"]) {
            return;
        }
        appIdResponse = appIdResponse[id].data;
        appIdArgResponse = appIdArgResponse[id].data;

        const appData = {
            name: appIdResponse.name,
            discount: (appIdResponse[type == "sub" ? "price" : "price_overview"].discount_percent),
            publisher: appIdResponse.publishers?.[0] || "El publisher",
            baseUsdPrice: (appIdResponse[type == "sub" ? "price" : "price_overview"].initial) / 100,
            baseArsPrice: (appIdArgResponse[type == "sub" ? "price" : "price_overview"].initial) / 100,
            usdPrice: (appIdResponse[type == "sub" ? "price" : "price_overview"].final) / 100,
            arsPrice: (appIdArgResponse[type == "sub" ? "price" : "price_overview"].final) / 100,
            support_url: appIdResponse?.support_info?.url,
            support_email: appIdResponse?.support_info?.email,
            recommendedArsPrice: undefined,
            recommendedLatamPrice: undefined,
            regionalStatus: undefined
        }

        if(appData.publisher != "El publisher" && !appData.support_email.includes('@')){
            // Si el mail no incluye una @, es porque lo cargó mal
            !appData.support_url ? appData.support_url = appData.support_email : ""
            appData.support_email = "";

        }

        const nearestOption = regionalPricingOptionsLatam.reduce((prev, curr) => Math.abs(curr - appData.baseUsdPrice) < Math.abs(prev - appData.baseUsdPrice) ? curr : prev);

        const recommendedArsPrice = regionalPricingChartLatam
            .filter(item => item.usdPrice == nearestOption)
            .map(item => item.argPrice)[0] * (100 - appData.discount) / 100;
            

        appData.recommendedArsPrice = recommendedArsPrice;

        // Está más caro que lo esperado
        if (appData.arsPrice > appData.recommendedArsPrice) {
            appData.regionalDifference = Math.round((parseFloat((appData.arsPrice - appData.recommendedArsPrice)) / appData.recommendedArsPrice) * 100);
            appData.regionalDifference <= 35 ? appData.regionalStatus = "fair" : appData.regionalStatus = "expensive";
        }
        else if (appData.arsPrice < appData.recommendedArsPrice) {
            appData.regionalDifference = Math.round((parseFloat((appData.recommendedArsPrice - appData.arsPrice)) / appData.recommendedArsPrice) * 100);
            appData.regionalDifference <= 25 ? appData.regionalStatus = "fair" : appData.regionalStatus = "cheap";
        }
        else if (appData.arsPrice == appData.recommendedArsPrice) {
            appData.regionalStatus = "fair";
            appData.regionalDifference = 0;
        }

        renderRegionalIndicator(appData, exchangeRate);

        return appData;

    }
}


const renderExchangeIndicator = (exchangeRate,exchangeRateDate) => {
    let sidebar = document.querySelector('.rightcol.game_meta_data');

    let staticExchangeRate = exchangeRate;

    standardTaxes &&
    standardTaxes.forEach(tax => {
        exchangeRate += parseFloat((staticExchangeRate * tax.value / 100).toFixed(2));
    })

    provinceTaxes &&
    provinceTaxes.forEach(tax => {
        exchangeRate += parseFloat((staticExchangeRate * tax.value / 100).toFixed(2));
    })

    let container = `
        <div class="block responsive_apppage_details_right heading heading_steamcito_3">
            Cotización del dólar de Steamcito
        </div>

        <div class="block responsive_apppage_details_right recommendation_reasons regional-meter-wrapper cotizacion-wrapper ${indicatorStyle} content_steamcito_3">
            <p class="reason info">
                <span class="name-span">1 USD ≈ ${exchangeRate.toFixed(2)} ARS</span>
                <br>
                <span class="name-smaller">
                    Resultado de dólar oficial más impuestos<br><br>
                    <span class="name-white">- Cotización promedio del dólar oficial <a href="https://www.bcra.gob.ar/PublicacionesEstadisticas/Tipo_de_cambio_minorista.asp"target="_blank">(BCRA)</a></span> <br>
                    1 USD = ${staticExchangeRate}
                    ${exchangeRateDate ? `<span class="name-smaller">(Cierre del ${exchangeRateDate})</span>` : ""}
                    <br><br>
                    <span class="name-white">- Total de impuestos nacionales y provinciales</span><br>
                    ${((totalTaxes - 1) * 100).toFixed(2)}% ${localStorage.getItem('national-tax') || localStorage.getItem('province-tax') ? "(Personalizados por vos)" : ""}
                    ${localStorage.getItem('national-tax') ? `<br>Cargaste ${localStorage.getItem('national-tax')}% de impuestos nacionales` : ""}
                    ${localStorage.getItem('province-tax') ? `<br>Cargaste ${localStorage.getItem('province-tax')}% de impuestos provinciales` : ""}


                </span>

            </p>
        </div>
    
    `;

    sidebar.insertAdjacentHTML('afterbegin', container);
}


const renderRegionalIndicator = (appData, exchangeRate) => {
    let sidebar = document.querySelector('.rightcol.game_meta_data');

    let container =
        `
    <div class="block responsive_apppage_details_right heading heading_steamcito_1">
        ¿Cómo es el precio regional?
    </div>
    <div class="block responsive_apppage_details_right recommendation_reasons regional-meter-wrapper ${indicatorStyle} content_steamcito_1">
        <div class="regional-meter-container">
            <div class="regional-meter-bar regional-meter-bar--cheap ${appData.regionalStatus == "cheap" && "regional-meter-bar--selected"}">
                <span>Barato</span>
            </div>
            <div class="regional-meter-bar regional-meter-bar--fair ${appData.regionalStatus == "fair" && "regional-meter-bar--selected"}">
                <span>Adecuado</span>
            </div>
            <div class="regional-meter-bar regional-meter-bar--expensive ${appData.regionalStatus == "expensive" && "regional-meter-bar--selected"}">
                <span>Caro</span>
            </div>
        </div>
        <hr>
        ${appData.regionalStatus == "expensive"
            ?
            `
        <p class="reason against">
        <span class="name-span">${appData.name}${appData.publisher != "El publisher" ? `, de ${appData.publisher},` : ""} </span> es <span class="regional-meter-reason--red">${appData.regionalDifference}%</span> más caro en Argentina que lo sugerido por Valve.

        ${appData.usdPrice == appData.arsPrice
            ?
            `<br><br>El precio en nuestra región es el mismo que en Estados Unidos.`
            :
            ""
        }
        
        </p>

        <hr>
        <p class="reason info">
            Precio regional sugerido para Argentina <br><span class="regional-meter-price">ARS$ ${appData.recommendedArsPrice.toFixed(2)}</span>
        </p>
        <hr>
        <p class="reason info">
            Precio actual en Argentina<br><span class="regional-meter-price">ARS$ ${appData.arsPrice.toFixed(2)} </span>
        </p> 

        ${appData.usdPrice != appData.arsPrice
            ? `
            <hr>
            <p class="reason info">
                Precio actual en Estados Unidos<br><span>USD$ ${appData.usdPrice} </span> 
            </p>   
            `
            :
            ""
        }




        `
            : ""
        }

        ${appData.regionalStatus == "fair"
            ?
            `
        <p class="reason for">
        
        <span class="name-span">${appData.name}</span> está a un precio accesible, siguiendo de cerca la sugerencia de precios de Valve.
        
        ${appData.publisher != "El publisher" ? `<span class="name-span">¡Gracias ${appData.publisher}!</span>` : ""}
        </p>
        <hr>


        ${appData.arsPrice > appData.recommendedArsPrice
                ?
                `
            <p class="reason info">
                El precio es solamente <span class="regional-meter-reason--yellow">${appData.regionalDifference}%</span> más caro que lo sugerido. 
            </p>
            <hr>                
            `
                :
                ""
            }

            ${appData.arsPrice < appData.recommendedArsPrice && appData.regionalDifference != 0
                ?
                `
            <p class="reason info">
                Está <span class="regional-meter-reason--yellow">${appData.regionalDifference}%</span> más barato que lo sugerido. 
            </p>
            <hr>                
            `
                :
                ""
            }

        <p class="reason info">
            Precio regional sugerido para Argentina <br><span class="regional-meter-price">ARS$ ${appData.recommendedArsPrice.toFixed(2)}</span>
        </p>
        <hr>
        <p class="reason info">
            Precio actual en Argentina<br><span class="regional-meter-price">ARS$ ${appData.arsPrice.toFixed(2)} </span>
        </p> 
        <hr>
        <p class="reason info">
            Precio actual en Estados Unidos<br><span>USD$ ${appData.usdPrice} </span> 
        </p> 



        `
            : ""
        }

        ${appData.regionalStatus == "cheap"
            ?
            `
        <p class="reason for">
        <span class="name-span">${appData.name}</span> es <span class="regional-meter-reason--green">${appData.regionalDifference}%</span> más barato en Argentina que lo sugerido por Valve.<br>
        </p>
        <hr>
        <p class="reason info">
        <span class="name-span">${appData.publisher}</span> cargó manualmente un precio más barato que el sugerido. <br><br> ¡Te quiero mucho ${appData.publisher}!
        </p>
        <hr>
        <p class="reason info">
            Precio sugerido para Argentina <br><span class="regional-meter-price">ARS$ ${appData.recommendedArsPrice.toFixed(2)}</span>
        </p>
        <hr>
        <p class="reason info">
            Precio actual en Argentina<br><span class="regional-meter-price">ARS$ ${appData.arsPrice.toFixed(2)} </span>
        </p> 
        <hr>
        <p class="reason info">
            Precio actual en Estados Unidos<br><span>USD$ ${appData.usdPrice} </span> 
        </p> 
        `
            : ""
        }



        <div class="DRM_notice">
            <div>
                Cálculo hecho por Steamcito en base a la
                <a href="https://steamcito.com.ar/precios-regionales-steam-argentina" target="_blank">Valve Regional Pricing Recommendation</a>
            </div>
        </div>

    </div>

    ${appData.usdPrice == appData.arsPrice && appData.arsPrice == appData.baseArsPrice  && (appData.support_email || appData.support_url)
        ?
        `<div class="block responsive_apppage_details_right heading heading_steamcito_2">
        Solicitar precio regional
        </div>
        
        <div class="block responsive_apppage_details_right recommendation_reasons regional-meter-wrapper ${indicatorStyle} content_steamcito_2">
            <div class="">
                <p class="reason info">
                <span class="name-span">${appData.name}</span> tiene el mismo precio en nuestro país que en Estados Unidos: <span class="name-span">${appData.usdPrice} USD</span> <br><br> 
                
                <span class="name-span">${appData.publisher}</span> todavía no cargó un precio para nuestro región. ¡Avisale para que considere hacerlo!

                <span class="notify-publisher-button green-steamcito-button">Avisar a ${appData.publisher}</span>
                </p>
            </div>
        </div>
        
        <div class="notify-publisher-popup notify-publisher-popup--hidden">
            <span class="publisher-popup-close-button">X</span>

            <h4>Solicitar precio regional a ${appData.publisher} 
            </h4>

            <div class="contact-method-container">
                <h5>Medio de contacto</h5>  
                <div class="publisher-popup-flex-container">
                    ${appData.support_email 
                        ? `<p class="publisher-email">${appData.support_email}</p>`
                        : `<a target=_blank href="${appData.support_url}">${appData.support_url}</a>`
                    }  
                    ${appData.support_email ? `<button class="copiar-texto-steamcito green-steamcito-button" type="button" data-clipboard="publisher-email">Copiar</button>` : ""}
                </div>

            </div>

            <hr>

            <div class="email-template-container">
                
                ${appData.support_email ? 
                `<div class="email-template-container-subheader">
                    <h5>Asunto</h5> 
                    <div class="publisher-popup-flex-container">
                        <p class="publisher-subject">Question about new regional pricing on ${appData.name}</p> 
                        <button class="copiar-texto-steamcito green-steamcito-button" type="button" data-clipboard="publisher-subject">Copiar</button>
                    </div>
                </div>
                <hr>

                `
                :
                ""
                }

                


                <div class="email-template-container-subheader">
                    <div class="publisher-popup-flex-container">
                        <h5>Cuerpo del Mensaje</h5>
                        <button class="copiar-texto-steamcito green-steamcito-button" type="button" data-clipboard="email-template">Copiar</button>
                    </div>

                </div>
                <p class="email-template">
                    Hi there! <br>
                    <br>

                    I'm a Steam user and I would like to bring something to your attention that may have been overlooked. Recently, Steam introduced a new region called LATAM which includes many countries in Latin America, including my country, Argentina.
                    <br><br> 

                    Currently, ${appData.name} seems to have inherited the standard price in the United States since no price was set for our region.<br><br>

                    Would you please consider setting a price for our region when you get a chance? This would be greatly appreciated by players across Latin America! <br><br>

                    Kind regards,
                </p>
            </div>
			
			${appData.support_email ? 
			`<hr>
			<div class="email-send-container">
				<h5>Enviar mail a a ${appData.publisher}</h5> 
				<div class="publisher-popup-flex-container">
					<p><a href="https://www.activationtrouble.com/es/use-gmail-para-abrir-el-enlace-mailto-enviar-correo-a-en-la-pc" target="_blank">Configurar link de "enviar correo a"</a></p>&emsp;
					<button class="copiar-texto-steamcito green-steamcito-button" type="button" onclick="window.open('mailto:${appData.support_email}?subject=Question about new regional pricing on ${appData.name}&body=Hi there!%0A%0A` + 
					`I%27m a Steam user and I would like to bring something to your attention that may have been overlooked. Recently, Steam introduced a new region called LATAM which includes many countries in Latin America, including my country, Argentina.%0A%0A` +
					`Currently, ${appData.name} seems to have inherited the standard price in the United States since no price was set for our region.%0A%0AWould you please consider setting a price for our region when you get a chance? This would be greatly appreciated by players across Latin America!%0A%0A` +
					`Kind regards,');">Enviar</button>
				</div>
			</div>
			`
			:
			""
			}
		
		</div>
		
        `

        :
            ""
    }

    `
    sidebar.insertAdjacentHTML('afterbegin', container);

    if(appData.usdPrice == appData.arsPrice && appData.arsPrice == appData.baseArsPrice  && (appData.support_email || appData.support_url)){

        let clipboardHandlers = document.querySelectorAll('.copiar-texto-steamcito');
        clipboardHandlers.forEach(handler => {
            let valueToCopy = document.querySelector(`.${handler.dataset.clipboard}`)
            handler.addEventListener('click', () => {
                navigator.clipboard.writeText(valueToCopy.innerText);
                handler.innerText = '✔ ¡Copiado! '
                setTimeout( () => {
                    handler.innerText = "Copiar"
                },3000)
            })
        })

        let modal = document.querySelector('.notify-publisher-popup');
        let openModalButton = document.querySelector('.notify-publisher-button');
        let closeModalButton = document.querySelector('.publisher-popup-close-button');
        openModalButton.addEventListener('click', () => modal.classList.toggle('notify-publisher-popup--hidden'));
        

        closeModalButton.addEventListener('click', () => modal.classList.toggle('notify-publisher-popup--hidden'))
    }




}

if(isStoreDolarized()){
    getExchangeRate();
}

const appData = getAppData(url);
getAppPricing(appData);
