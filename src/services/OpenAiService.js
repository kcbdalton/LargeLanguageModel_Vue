// 'https://platform.openai.com/docs/assistants/tools/code-interpreter?lang=node.js'
const { ChatOpenAI } = require("@langchain/openai");
// import { environment } from "../../environment";
// import { ChatCompletionContentPart } from "openai/resources";

const openAIConnection =  new ChatOpenAI({
	modelName: "gpt-3.5-turbo",
	temperature: 0,
	openAIApiKey:'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'
});

const modelEngine = 'gpt-3.5-turbo';

async function makeOpenAIRequest(prompt) {
	const response = await openAIConnection.chat.completions.create({
		model: modelEngine,
		messages: [{
			role: 'user',
			content: prompt
		}],
		stream: false
	});
	return response.choices[0].message.content;
}


module.exports = {
	openAIConnection,
	makeOpenAIRequest
};