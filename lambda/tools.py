from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import tool
from langchain.agents import create_openai_functions_agent, AgentExecutor
import matplotlib.pyplot as plt



@tool("line_graphing")
def line_graphing(x: list, y: list):
	""" Use this when you're asked to graph and you determine the data would best fit in a line graph """
	plt.plot(x, y)

	for i in range(len(x)):
		plt.annotate(str(y[i]), xy=(x[i], y[i]), xytext=(x[i], y[i] + 0.5), textcoords='data')

	plt.show()

@tool("bar_graphing")
def bar_graphing(x: list, y: list):
	""" Use this when you're asked to graph and you determine the data would best fit in a bar graph """
	plt.bar(x, y)

	for i in range(len(x)):
		plt.annotate(str(y[i]), xy=(x[i], y[i]), xytext=(x[i], y[i] + 0.5), textcoords='data')

	plt.show()


# chat_history = []
# tools = [line_graphing, bar_graphing]

# api_key = ""
# llm = ChatOpenAI(temperature=0, model="gpt-4-1106-preview", api_key=api_key)

# prompt = ChatPromptTemplate.from_messages([
# 	("system", "You are a helpful assistant."),
# 	MessagesPlaceholder(variable_name="intermediate_steps"),
# 	("user", "{input}"),
# 	MessagesPlaceholder(variable_name='agent_scratchpad')
# ])

# agent = create_openai_functions_agent(llm, tools, prompt)

# # print(agent)

# agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# agent_executor.invoke({"input": "hi! can you create a graph using the following data: x-axis = [0, 1, 2, 3, 4], y-axis = [10, 20, 24, 92, 42]."})
# # agent_executor.invoke({"input": "what is the tallest mountain in the world"})