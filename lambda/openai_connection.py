from langchain_openai import ChatOpenAI
import os

def connect_to_openai(event, context):
	api_key = os.environ.get('OPENAI_API_KEY')
	if not api_key:
		return {
			'statusCode': 500,
			'body': 'No OPENAI_API_KEY was provided'
		}
	return {
		'statusCode': 200,
		'body': ChatOpenAI(temperature=0, model="gpt-4-0613", api_key=api_key)
	}
