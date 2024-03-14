const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate, MessagesPlaceholder, BaseMessageStringPromptTemplate } = require("@langchain/core/prompts");
const { llmRetrieveBenInfo } = require('./LangchainRetrieverDEMO')
const { createOpenAIFunctionsAgent, AgentExecutor } = require("langchain/agents");
const { pull } = require("langchain/hub");

const { DynamicTool } = require("@langchain/core/tools");


async function main() {
	const llm = new ChatOpenAI({
		modelName: "gpt-3.5-turbo",
		temperature: 0,
		openAIApiKey:'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'
	});
	
	const tools = [
		new DynamicTool({
			name: "Ben-Retriever",
			description: "Call this whenever you are asked to answer questions about Ben Dalton and pass the prompt to the function.",
			func: async (prompt) => llmRetrieveBenInfo(prompt),
		}),
	];

	const prompt = ChatPromptTemplate.fromMessages(
		[
			("system", "You are a helpful assistant who retrieves information from documents about Ben Dalton"),
			("user", new MessagesPlaceholder(variable_name="input")),
			new MessagesPlaceholder(variable_name="agent_scratchpad"),
		]
	)
	
	const agent = await createOpenAIFunctionsAgent({
		llm,
		tools,
		prompt,
	});
	console.log("agent:", agent)
	
	
	const agentExecutor = new AgentExecutor({
		agent,
		tools,
		verbose: true,
	});
	
	const result = await agentExecutor.invoke({
		input: [
			{ role: "user", content: "What is Ben Dalton's favorite color?" }
		],
	});
	
	console.log(`Got output ${result.output}`);
	
}

main();
