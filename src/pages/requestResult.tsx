import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { usePatientData } from '../contexts/PatientDataContext';
import { PostData, ApiResponse, postToExternalApi } from '../rest/symptom_index';



const RequestResult: React.FC = () => {

  const { patientData } = usePatientData();
  const request: PostData = { symptom_text : '', base64_image: ''};
  const [apiResponse, setApiResponse] = useState<ApiResponse>({ success: false, message: '' });

  useEffect(() => {
    // 비동기 함수 정의
    // 함수 호출
  }, []); // 빈 배열은 컴포넌트 마운트 시에만 useEffect를 실행하게 함
  
  const handleApiCall = async () => {
    request.base64_image = patientData.imageBase64;
    request.symptom_text = "증상 : " + patientData.symptom.join(',') + ", "
                            + "증상 발현부위 : " + patientData.affectedArea.join(',') + ", "
                            + "증상 발현 패턴 : " + patientData.progress.join(',') + ", "
                            + "연령대 : " + patientData.ageGroup;
    console.log(request.symptom_text);
      const response = await postToExternalApi(request);
    setApiResponse(response);
    console.log(response);
  };


//   const [patientData, setPatientData] = useState<PatientData>({ name: '', ageGroup: '', imageBase64: '' });
  return (
    <div>
      <h1>환자 정보 확인</h1>
      {patientData && (
        <div>
          <p>증상: {patientData.symptom.join(',')}</p>
          <p>증상 발현부위: {patientData.affectedArea.join(',')}</p>
          <p>증상 발현 패턴: {patientData.progress.join(',')}</p>
          <p>연령대: {patientData.ageGroup}</p>
          <button onClick={handleApiCall}>진단 결과 보기</button>

          {apiResponse && (
        <div>
          <p>진단 성공/실패: {apiResponse.success.toString()}</p>
          <p>진단 결과: {apiResponse.message}</p>
        </div>
      )}
          {/* 이미지를 base64로 전달받았을 경우 이미지 출력 */}
          {patientData.imageBase64 && <Image src={patientData.imageBase64} width={1080} height={1920} alt="Uploaded" />}
        </div>
      )}
    </div>
  );
};

export default RequestResult;
