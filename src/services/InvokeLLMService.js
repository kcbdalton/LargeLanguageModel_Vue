// export async function invokeLLM(prompt) {
// 	let response = await fetch('https://8r4teavzi7.execute-api.us-east-1.amazonaws.com/dev/invoke_llm', {mode: 'cors', method:"POST", body: prompt});
// 	// console.log("response  body: ", await response.json())
// 	let responseJSON = await response.json();
// 	return responseJSON;
// }

const { ChatOpenAI } = require("@langchain/openai");

const openAIConnection =  new ChatOpenAI({
	modelName: "gpt-3.5-turbo",
	temperature: 0,
	openAIApiKey: ''
});

async function invokeLLM(prompt) {
	try {
		const response = await openAIConnection.invoke(prompt);
		const message = await response;

		const responseContent = message.content;

		return responseContent;
		} catch (error) {
			console.error("Error making OpenAI request:", error);
			throw error; 
	}
}

module.exports = {
	openAIConnection,
	invokeLLM
};