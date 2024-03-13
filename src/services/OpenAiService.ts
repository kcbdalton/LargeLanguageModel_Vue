'https://platform.openai.com/docs/assistants/tools/code-interpreter?lang=node.js'

import OpenAI from "openai";
import { environment } from "environment";

const openai = new OpenAI({apiKey: environment.OPENAT_API_KEY});

async function main() {
	const completion = await openai.chat.completions.create({
		messages: [{ role: "system", content: "You are a helpful assistant." }],
		model: "gpt-3.5-turbo",
	});

	console.log(completion.choices[0]);
}

main()