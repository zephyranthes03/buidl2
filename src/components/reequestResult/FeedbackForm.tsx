import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { LlmResultData, LlmResultDataForUpdate, ApiResponse, putToExternalApi } from '@/rest/symptom_index';

import { PatientData, usePatientData } from '@/contexts/PatientDataContext';
import { LlmData, useLlmData } from '@/contexts/LLMDataContext';

type Props = {
  patientData: PatientData;
  llmData: LlmData;
};

export const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [comment, setComment] = useState('');

  const router = useRouter();
  const { patientData, setPatientData } = usePatientData();
  const { llmData, setLlmData } = useLlmData();
  const [apiResponse, setApiResponse] = useState<ApiResponse>({ success: false, feedback: 2, message_content: '', id:'' });

  const updateFeedback = (feedback: string) => {
    setFeedback(feedback);

  };

  const updateComment = () => {
    const handleApiCall = async () => {
      let feedback_number = 0;
      if (feedback == '불만족') {
        feedback_number = 3;
      } else {
        feedback_number = 1;
      }
      setLlmData({ id: llmData.id , instruction: llmData.instruction, input: llmData.input, image_base64: llmData.image_base64, output: llmData.output, feedback: feedback_number, feedback_content: comment});

      const request: LlmResultDataForUpdate = {
        id: llmData.id,
        feedback: llmData.feedback,
        feedback_content: llmData.feedback_content
      };
      const response = await putToExternalApi(request);

      setApiResponse({
        ...response,
        message_content: response.message_content,
        id: response.id
      });  
        
    };
    router.push('/thanksForm');
  };

  return (
    <div>
    <label className="block text-lg font-medium">피드백</label>
    <p>피드백은 AI 성능 향상을 위해서만 사용되고, 데이터는 적용 후 바로 폐기됩니다.</p>
    <div className="mt-2 flex justify-center space-x-4">
      <button 
        type="button"
        onClick={() => updateFeedback('만족')}
        className={`py-2 px-4 border ${feedback === '만족' ? 'bg-blue-900' : 'bg-blue-600'} rounded-md shadow-sm text-sm hover:bg-blue-900`}
        >
        만족
      </button>
      <button
        type="button"
        onClick={() => updateFeedback('불만족')}
        className={`py-2 px-4 border ${feedback === '불만족' ? 'bg-blue-900' : 'bg-blue-600'} rounded-md shadow-sm text-sm hover:bg-blue-900`}
        >
        불만족
      </button>
    </div>

    {feedback === '불만족' && (
        <div>
        <label htmlFor="comment" className="block text-sm font-medium">
            추가 코멘트(선택사항)
        </label>
        <textarea
            id="comment"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="저희 결과에 만족하지 못하신 이유를 간략하게 설명해주시면 서비스 성능 향상에 도움이 됩니다. 피드백을 입력하는게 망설여지신다면, 불만족을 선택해 알려주시는 것만으로도 큰 도움이 됩니다."
        ></textarea>

        </div>
    )}
    <br/>
    <div className="mt-2 flex justify-center space-x-4">
        <button type="button" onClick={(e) => updateComment()}  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        제출하기
        </button>
    </div>

  </div>




  );
};

