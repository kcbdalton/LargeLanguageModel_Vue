const { LLMMathChain } = require('langchain/chains');
const { OpenAI } = require('langchain/llms');
import fs from "fs"
// const { PromptTemplate } = require('langchain/prompts');
// const { LLMChain } = require('langchain/chains');
// const { initialize_agent, AgentType } = require('langchain/agents');
// const { ChatOpenAI } = require('langchain/chat_models');
// const { StructuredTool } = require('langchain/tools');
// const { MessagesPlaceholder } = require('langchain/prompts');
// const { ConversationBufferMemory } = require('langchain/memory');

const llm = new ChatOpenAI({ temperature: 0, model: "gpt-4-0613" });
const llmMathChain = LLMMathChain.fromLLM({ llm, verbose: true });

const tools = [
	{
		name: "Calculator",
		func: llmMathChain.run,
		description: `
		  Use this tool to perform mathematical operations/calculations. 
		  If you ever need to perform any mathematical operations, always use this to do so.
		`
  },
]

// Upload a file with an "assistants" purpose
const file = await OpenAI.files.create({
	file: fs.createReadStream("mydata.csv"),
	purpose: "assistants",
  });
  
  // Create an assistant using the file ID
  const assistant = await OpenAI.beta.assistants.create({
	instructions: "You are a personal math tutor. When asked a math question, write and run code to answer the question.",
	model: "gpt-4-turbo-preview",
	tools: [{"type": "code_interpreter"}],
	file_ids: [file.id]
  });
 


// const agent_kwargs = {
// 	extra_prompt_messages: [{ variable_name: "memory" }]
// };
// const memory = new ConversationBufferMemory({ memory_key: "memory", return_messages: true });

// const agent = initialize_agent({
// 	tools,
// 	llm,
// 	agent: AgentType.OPENAI_FUNCTIONS,
// 	verbose: true,
// 	agent_kwargs,
// 	memory,
// 	prompt: `
// 		If you ever need to make a calculation, use the calculator tool. 
// 		If you ever need to extract data from a CSV file, use the read_csv tool. 
// 		If you ever need to make a graph using data from the CSV file, put the data into a pandas dataframe and send it to the plotting tool.
// 		When asked to generate example code to help with programming questions, always send the text output of the 'ScriptGenerate' tool to the 'SaveTextFile' tool. 
// 		You can use these tools subsequently in order to generate the most correct answer. 
// 		Be sure to think step by step.
// 	`
// });

// agent.run(`
// 	Can you write me an example python script that allows me to take in data from an excel sheet and then graph it as a bar chart? 
// 	Save your generated answer in a text file.
// `);