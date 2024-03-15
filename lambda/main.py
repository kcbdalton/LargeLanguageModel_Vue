from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType
from langchain.prompts import MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import faiss
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages.human import HumanMessage
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain import hub
import os

openai_connection = ChatOpenAI(temperature=0, model="gpt-4-0613", api_key='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')

print(llm)
# llm = ChatOpenAI()
# llm_math_chain = LLMMathChain.from_llm(llm=llm, verbose=True)

def retrieve_personal_info(prompt: str):
	loader = TextLoader("./Ben-info.txt")
	docs = loader.load()
	print("docs: \n", docs)
	text_splitter = CharacterTextSplitter(chunk_size=15, chunk_overlap=3)
	print("text splitter: \n", text_splitter)
	texts = text_splitter.split_documents(docs)
	print("texts: \n", texts)
	embeddings = OpenAIEmbeddings( api_key='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')
	vector_store = faiss.FAISS.from_documents(texts, embeddings)
	retriever = vector_store.as_retriever()
	context_docs = retriever.get_relevant_documents(prompt)

	SYSTEM_TEMPLATE = """
		Answer the user's questions based on the below context. 
		If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know".:

		<context>
		{context}
		</context>
	"""

	prompt = ChatPromptTemplate.from_messages(
		    [("system", SYSTEM_TEMPLATE)]
		)
	
	print("prompt:\n", prompt)


	# try create_retrieval_chain 
	# https://python.langchain.com/docs/modules/chains
	combine_docs_chain = create_stuff_documents_chain(llm, prompt)
	retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)

	print("retrieval chain: ", retrieval_chain)

	# print("chain:\n", chain)
	response = retrieval_chain.invoke({
		"input": prompt,
		"context": context_docs})
	print("response:\n", response)
	return 

tools = [
	Tool(
		name = "Ben-Retriever",
		description = "Call this whenever you are asked to answer questions about Ben Dalton and pass the prompt to the function.",
		func = retrieve_personal_info,
	),
]

agent_kwargs = {
	"extra_prompt_messages": [MessagesPlaceholder(variable_name="memory")],
}
memory = ConversationBufferMemory(memory_key="memory", return_messages=True)

agent = initialize_agent(
	tools,
	llm,
	agent=AgentType.OPENAI_FUNCTIONS,
	verbose=True,
	agent_kwargs=agent_kwargs,
	memory=memory,
	prompt="""
		If you are ever asked to retrieve personal information about Ben Dalton, use the 'Ben-Retriever' tool.
		If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know"."""
)

if __name__ == "__main__":
		
	prompt = """
		Can you tell me personal information about Ben Dalton"""
	# prompt = input("\x1B[3mEnter 'exit' at any point to end discussion.\x1B[23m\nPlease enter your prompt here: ")
	# if prompt == "exit":
	# 	break
	agent.invoke(prompt)

	retrieval_qa_chat_prompt = hub.pull("langchain-ai/retrieval-qa-chat")
	llm = ChatOpenAI()
	retriever = ...
	combine_docs_chain = create_stuff_documents_chain(
		llm, retrieval_qa_chat_prompt
	)
	retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)

	chain.invoke({"input": "..."})