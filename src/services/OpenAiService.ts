'https://platform.openai.com/docs/assistants/tools/code-interpreter?lang=node.js'

import OpenAI from "openai";
import { environment } from "environment";
import { ChatCompletionContentPart } from "openai/resources";

const openAI = new OpenAI({apiKey: environment.OPENAT_API_KEY});
const modelEngine = 'gpt-3.5-turbo';

export default {
	async makeOpenAIRequest(prompt: string | ChatCompletionContentPart[]): Promise<string> {
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