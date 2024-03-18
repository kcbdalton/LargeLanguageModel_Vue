from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import json
import os

def invoke_llm(event, context):
	print("event: ", event)
	print("event body: ", event['body'])
	api_key = os.environ.get('OPENAI_API_KEY')
	if not api_key:
		return {
			'statusCode': 500,
			'body': 'No OPENAI_API_KEY was provided'
		}
	
	llm = ChatOpenAI(temperature=0, model="gpt-4-1106-preview", api_key=api_key)
	prompt = ChatPromptTemplate.from_messages([
		("system", "You are a helpful assistant."),
		("user", "{input}")
	])

	output_parser = StrOutputParser()
	chain = prompt | llm | output_parser
	response = chain.invoke({"input": event['body']})
	print("response: ", response)
	return {
		'statusCode': 200,
		"headers": {'Access-Control-Allow-Origin': '*'},
		'body': json.dumps(response)
	}

