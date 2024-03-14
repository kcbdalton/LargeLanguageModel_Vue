const { ChatOpenAI } = require("@langchain/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
// const { CheerioWebBaseLoader } = require("langchain/document_loaders/web/cheerio");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { HumanMessage } = require("@langchain/core/messages");
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents");
const { ChatPromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");
const { TextLoader } = require("langchain/document_loaders/fs/text")
// const path = require('path')

// https://js.langchain.com/docs/use_cases/chatbots/retrieval

const chat = new ChatOpenAI({
	modelName: "gpt-3.5-turbo-1106",
	temperature: 0,
	openAIApiKey:'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'
});

async function llmRetrieveBenInfo(prompt) {
	// const textFile = path.join(__dirname, "demo.txt");
	const loader = new TextLoader("./src/services/Langchain/demo.txt", 'utf-8');
	const rawDocs = await loader.load();
	
	console.log("raw docs:\n", rawDocs)
	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 50,
		chunkOverlap: 10,
	});

	const allSplits = await textSplitter.splitDocuments(rawDocs);
	const vectorstore = await MemoryVectorStore.fromDocuments(
		allSplits,
		new OpenAIEmbeddings({openAIApiKey:'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'})
	);
	const retriever = vectorstore.asRetriever();

	const docs = await retriever.invoke("Grab relevant information about Ben Dalton");

	console.log("docs: \n", docs);

	const SYSTEM_TEMPLATE = `
		Answer the user's questions based on the below context. 
		If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know".:

		<context>
		{context}
		</context>
	`;

	const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
		["system", SYSTEM_TEMPLATE],
		new MessagesPlaceholder("messages"),
	]);

	const documentChain = await createStuffDocumentsChain({
		llm: chat,
		prompt: questionAnsweringPrompt,
	});
	let llmResponse = await documentChain.invoke({
		messages: [new HumanMessage(prompt)],
		context: docs,
	});
	console.log("Response from the LLM:\n", llmResponse)
}

llmRetrieveBenInfo("What is Ben favorite color");

module.exports = {
	llmRetrieveBenInfo
};