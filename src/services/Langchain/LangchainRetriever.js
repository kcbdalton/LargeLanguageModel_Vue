const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { CheerioWebBaseLoader } = require("langchain/document_loaders/web/cheerio");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { OpenAIEmbeddings } = require("@langchain/openai");
const {TextLoader } = require("langchain/document_loaders/fs/text")
const fs = require('fs');

const textFile = "C:/Users/Ben.Dalton/OneDrive - knoxcountymail/Documents/langchain-vuetify/src/services/Langchain/demo.txt";
async function llmRetrieve() {
	const loader = new TextLoader(textFile, 'utf-8');
	const text = fs.readFileSync(textFile, "utf8");

	console.log("loader:\n", loader)
	console.log("text:\n", text)
	const fileContent = await loader.load();
	// const documents = fileContent.Document.split('\r\n');
	// const loader = new CheerioWebBaseLoader(fileContent);
	// const rawDocs = await loader.load();
	console.log("fileContent: ", fileContent[0].pageContent)
	// const splitDoc = fileContent.split('\n\n');
	// console.log("split fileContent", splitDoc)
	const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 50, chunkOverlap: 10 });
	const docs = await textSplitter.createDocuments([text]);
	console.log("docs: ", docs)
	const vectorstore = await MemoryVectorStore.fromDocuments(
		docs,
		new OpenAIEmbeddings({openAIApiKey:'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'})
	);

	console.log("vectorstore: ", vectorstore)
	const retriever = vectorstore.asRetriever();
	console.log("vectorstore as retriever: ", retriever)
	const retrieverResult = await retriever.getRelevantDocuments(
		"what is ben dalton's favorite color"
	);
	console.log("retriever result ", retrieverResult)



	// const documents = fileContent.split('\n\n'); // Assuming each document is separated by two newlines
    
   
}

llmRetrieve();

/*
  Document {
	pageContent: "your application progresses through the beta testing phase, it's essential to continue collecting data to refine and improve its performance. LangSmith enables you to add runs as examples to datasets (from both the project page and within an annotation queue), expanding your test coverage on real-world scenarios. This is a key benefit in having your logging system and your evaluation/testing system in the same platform.Production​Closely inspecting key data points, growing benchmarking datasets, annotating traces, and drilling down into important data in trace view are workflows you’ll also want to do once your app hits production. However, especially at the production stage, it’s crucial to get a high-level overview of application performance with respect to latency, cost, and feedback scores. This ensures that it's delivering desirable results at scale.Monitoring and A/B Testing​LangSmith provides monitoring charts that allow you to track key metrics over time. You can expand to",
	metadata: {
	  source: 'https://docs.smith.langchain.com/user_guide',
	  loc: { lines: [Object] }
	}
  }
*/