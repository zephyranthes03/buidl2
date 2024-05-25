import axios from 'axios';

// POST 요청을 위한 데이터 타입 정의
export interface PostData {
    symptom_text : string;
    base64_image : string;
  // 다른 필드들을 추가할 수 있습니다.
}

// POST 요청을 위한 데이터 타입 정의
export interface LlmResultData {
  id: string;
  instruction: string;
  input: string;
  image_base64: string;
  output: string;
  feedback: Number;
  feedback_content: string;
// 다른 필드들을 추가할 수 있습니다.
}

// POST 요청을 위한 데이터 타입 정의
export interface LlmResultDataForUpdate {
  id: string;
  feedback: Number;
  feedback_content: string;
// 다른 필드들을 추가할 수 있습니다.
}

// API 응답 타입 정의
export interface ApiResponse {
  success: boolean;
  feedback: Number;
  message_content: string;
  id: string;
  // 다른 필드들을 추가할 수 있습니다.
}


// API에 POST 요청을 보내는 함수
export const postToExternalApi = async (data: PostData): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>('https://imgroo.kr/llm_result/llm_base64', data);
    // const response = await axios.post<ApiResponse>('http://localhost:8003/symptom_index/llm_base64', data);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during API request:', error);
    return { success: false, feedback: 2,  message_content: 'An error occurred', id: '' };

    // throw error;
  }
};

// API에 PUT 요청을 보내는 함수
export const putToExternalApi = async (data: LlmResultDataForUpdate): Promise<ApiResponse> => {
  try {
    const response = await axios.put<ApiResponse>('https://imgroo.kr/llm_result/llm_base64'+data.id, data);
    // const response = await axios.post<ApiResponse>('http://localhost:8003/symptom_index/llm_base64', data);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during API request:', error);
    return { success: false, feedback: 2, message_content: 'An error occurred', id: '' };

    // throw error;
  }
};


