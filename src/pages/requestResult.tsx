import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { usePatientData } from '../contexts/PatientDataContext';
import { PostData, ApiResponse, postToExternalApi } from '../rest/symptom_index';



const RequestResult: React.FC = () => {

  const { patientData } = usePatientData();  
  const request: PostData = { symptom_text : '', base64_image: ''};
  const [apiResponse, setApiResponse] = useState<ApiResponse>({ success: false, message: '', message_array: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleApiCall = async () => {
      setIsLoading(true); // 로딩 시작

      const request: PostData = {
        base64_image: patientData.imageBase64,
        symptom_text: `증상 : ${patientData.symptom.join(',')}, ` +
                      `증상 발현부위 : ${patientData.affectedArea.join(',')}, ` +
                      `증상 발현 패턴 : ${patientData.progress.join(',')}, ` +
                      `연령대 : ${patientData.ageGroup}`
      };
      const response = await postToExternalApi(request);
      const messageArray = response.message.split('\n');
      setApiResponse({
        ...response,
        message_array: messageArray
      });
      setIsLoading(false); // 로딩 완료
    };

    if (patientData) {
      handleApiCall();
    }

  }, [patientData]); // patientData를 의존성 배열에 추가
  

//   const [patientData, setPatientData] = useState<PatientData>({ name: '', ageGroup: '', imageBase64: '' });
  return (
    <main
      className={`flex min-h-screen flex-col items-left justify-between p-12`}
    >      
    <div>
      <h1>환자 정보 확인</h1>
      {patientData && (
        <div>
          <p>증상: {patientData.symptom.join(',')}</p>
          <p>증상 발현부위: {patientData.affectedArea.join(',')}</p>
          <p>증상 발현 패턴: {patientData.progress.join(',')}</p>
          <p>연령대: {patientData.ageGroup}</p>
          {/* <button onClick={handleApiCall} className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded">진단 결과 보기</button> */}

          {/* 이미지 출력 */}
          {/* {patientData.imageBase64 && (
            <Image src={patientData.imageBase64} width={1080} height={1920} alt="Uploaded" />
          )} */}
        </div>
      )}

      <div>
        {apiResponse.message_array && apiResponse.message_array.length > 0 && (
          <div>
            <p>진단 성공/실패: {apiResponse.success.toString()}</p>
            <p>진단 결과:</p>
            {apiResponse.message_array.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center h-screen"> {/* 화면 전체를 채우는 flex 컨테이너 */}
            <div className="flex flex-col items-center"> {/* 수직 정렬을 위한 flex 컬럼 */}
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
              <p className="text-lg mt-4">...Analysing... </p> {/* 로딩 텍스트 */}
            </div>
          </div>
        )}

      </div>
    </div>
    </main>
  );
};

export default RequestResult;
