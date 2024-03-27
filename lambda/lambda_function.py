from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain.memory import ConversationBufferMemory
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from operator import itemgetter
from tools import line_graphing, bar_graphing

class CustomAgent:
	def __init__(self, api_key, model, tools: list):
		self.llm = ChatOpenAI(temperature=0, model=model, api_key=api_key)
		self.llm_with_tools = self.llm.bind_tools(tools)

		self.prompt = ChatPromptTemplate.from_messages([
			("system", "You are a helpful assistant."),
			MessagesPlaceholder(variable_name="history"),
			("user", "{input}")
		])
		
		self.memory = ConversationBufferMemory(return_messages=True)
		self.memory.load_memory_variables({})
		self.output_parser = StrOutputParser()
		self.chain = (
			RunnablePassthrough.assign(
				history=RunnableLambda(self.memory.load_memory_variables) | itemgetter("history")
			)
			| self.prompt
			| self.llm_with_tools
			# | self.llm
			# | self.tools
		)
		
	def invoke_llm(self, input_text):
		inputs = {"input": input_text}
		response = self.chain.invoke(inputs)
		self.memory.save_context(inputs, {"output": response.content})
		self.memory.load_memory_variables({})
		print("response: ", response)
		return response.content

	def converse(self):
		while True:
			user_input = input("You: ")
			if user_input.lower() == "exit" or user_input.lower() == "":
				break
			response = self.invoke_llm(user_input)
			print("Bot:", response)

if __name__ == "__main__":
	api_key = ""
	model = "gpt-4-1106-preview"
	tools = [line_graphing, bar_graphing]
	agent = CustomAgent(api_key, model, tools)
	agent.converse()