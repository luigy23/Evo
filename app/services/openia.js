const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT_API, dangerouslyAllowBrowser: true 
});




const functions = [
    {
        "name": "escoger_libro",
        "description": "Seleccionar un libro basado en la solicitud del usuario, escoge bajo tu propio criterio de los distintos libros que existen en el mundo y las 5 enseñanzas que te dejaron",
        "parameters": {
            "type": "object",
            "properties": {
                "nombreLibro": {
                    "type": "string",
                    "description": "El nombre del libro que se desea seleccionar",
                },
                "autor": {
                    "type": "string",
                    "description": "El nombre del autor del libro que se desea seleccionar",
                },
                "enseñanzas": {
                    "type": "array",
                    "items": {
                        "type": "string",
                    },
                    "description": "Las 5 enseñanzas que te dejó el libro",
                },
            },
            "required": ["nombreLibro", "autor", "enseñanzas"],
        },
    }
];

const escogerLibro = (nombreLibro, autor, enseñanzas) => {
    return `Seleccioné el libro ${nombreLibro} del autor ${autor} para ti
    las 5 enseñanzas que te dejó el libro son:
    -${enseñanzas[0]}
    -${enseñanzas[1]}
    -${enseñanzas[2]}
    -${enseñanzas[3]}
    -${enseñanzas[4]}
    `;
}



const openFun=async(mensajes)=>{
const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: mensajes,
    functions: functions,
    function_call: "auto",
  });
  console.log(chatCompletion.choices[0].message.content);

  if (chatCompletion.choices[0].message.function_call) {
    const functionResponse = chatCompletion.choices[0].message.function_call;

    // Llamamos a la función "escoger libro" con el nombre del libro proporcionado
    const parametros= JSON.parse(functionResponse.arguments);
    console.log(parametros);
    const selectedBook = escogerLibro(parametros.nombreLibro, parametros.autor, parametros.enseñanzas);

    // volvemos a generar el mensaje con la respuesta de la función
    //agregamos la respuesta a los mensajes

    return selectedBook;


}

  return chatCompletion.choices[0].message.content;
}

//exportamos la funcion para usarla en el componente
export default openFun;