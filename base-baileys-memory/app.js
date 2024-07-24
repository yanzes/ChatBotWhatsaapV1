const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['Información General', 'Info', 'inf','informacion','información','1']).addAnswer(
    [
        '📄 Información General:\n Descubre cómo los generadores de Ozono eliminan olores y desinfectan ambientes, convirtiéndolos en una solución efectiva para el hogar y el negocio.',
        ,
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['ole', 'alo','buenas','buenos','buenas noches','buenas tardes','buenas tardes noches','Hola','hola','HOLA'])
    .addAnswer('🙌 ¡Bienvenido al servicio de alquiler de generadores de Ozono!')
    .addAnswer(
        [
            'Para ayudarte mejor, elige una de las siguientes opciones:\n',
            '👉 📄 *Información General*: Descubre qué es un generador de Ozono y cómo funciona.\nEscribe info para obtener más detalles.\n',
            '👉 *gracias* 🛠️ Solicitud de Alquiler: ¿Listo para alquilar un generador de Ozono? Te guiaremos en el proceso.\nEscribe alquilar para iniciar tu solicitud.\n',
            '👉 *discord* 🤔 Asesoría Especializada: ¿Tienes preguntas o necesitas asesoramiento? Estamos aquí para ayudarte.\nEscribe asesoría para hablar con un experto.\n',
            '👉 *gracias3* 🧼 Aplicaciones Comunes: Aprende cómo los generadores de Ozono pueden ayudar con olores y humedad.\nEscribe usos para más información.\n',
            '👉 *gracias2* 💰 Información de Pago: ¿Quieres saber cómo funciona el pago por parte de los clientes? Aquí te explicamos.\nEscribe pago para más información.\n',
            '👉 *doc2* 💬 Testimonios: Conoce la experiencia de otros clientes con nuestros generadores.\nEscribe testimonios para leer sus historias.',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
