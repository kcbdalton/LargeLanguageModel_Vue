import openAiService from "./OpenAiService";
export const messageService = {
	userPrompt: '',
	aiResponse: ''
}

export async function createOpenAiRequest() {
	if (messageService.userPrompt !== '') {
		messageService.aiResponse = await openAiService.makeOpenAIRequest(messageService.userPrompt)
		return messageService.aiResponse;
	}
	
}
