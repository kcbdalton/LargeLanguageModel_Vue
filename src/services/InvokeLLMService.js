// export async function invokeLLM(prompt) {
// 	let response = await fetch('https://8r4teavzi7.execute-api.us-east-1.amazonaws.com/dev/invoke_llm', {mode: 'cors', method:"POST", body: prompt});
// 	// console.log("response  body: ", await response.json())
// 	let responseJSON = await response.json();
// 	return responseJSON;
// }

const { ChatOpenAI } = require("@langchain/openai");
const { BufferMemory } = require("langchain/memory");
const { ConversationChain } = require("langchain/chains");

const memory = new BufferMemory();
const llmModel = new ChatOpenAI({
	modelName: "gpt-3.5-turbo",
	temperature: 0,
	openAIApiKey: ''
});

const conversationChain = new ConversationChain({
	llm: llmModel,
	memory: memory
})

/**
* Take in the prompt submitted by the user, send it to the LLM, and return the response.
@param {string} prompt The human prompt
@returns {string} The response from the LLM
*/ 
async function invokeLLM(prompt) {
	
	try {
		const response = await conversationChain.call({input: prompt});
		return response.response;
		} catch (error) {
			console.error("Error making OpenAI request:", error);
			throw error; 
	}
}

module.exports = {
	invokeLLM
};