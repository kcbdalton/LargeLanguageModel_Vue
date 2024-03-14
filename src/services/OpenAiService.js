// 'https://platform.openai.com/docs/assistants/tools/code-interpreter?lang=node.js'

import OpenAI from "openai";
import { environment } from "../../environment";
// import { ChatCompletionContentPart } from "openai/resources";

const openAI = new OpenAI(
	{
		apiKey: environment.OPENAI_API_KEY,
		dangerouslyAllowBrowser: true
	}
);
const modelEngine = 'gpt-3.5-turbo';

export default {
	async makeOpenAIRequest(prompt) {
		const response = await openAI.chat.completions.create({
			model: modelEngine,
			messages: [{
				role: 'user',
				content: prompt
			}],
			stream: false
		});
		return response.choices[0].message.content;
	}
};

