export const messageService = {
	userPrompt: '',
	aiResponse: ''
}

export async function createOpenAiRequest(prompt) {
	let response = await fetch('https://8r4teavzi7.execute-api.us-east-1.amazonaws.com/dev/invoke_llm', {mode: 'cors', method:"POST", body: prompt});
	// console.log("response  body: ", await response.json())
	let responseJSON = await response.json();
	return responseJSON;
}
