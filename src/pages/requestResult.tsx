import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { PostData, ApiResponse, postToExternalApi } from '../rest/symptom_index';
import { useRouter } from 'next/router';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FeedbackForm } from '../components/reequestResult/FeedbackForm'
import { PatientData, usePatientData } from '../contexts/PatientDataContext';


const RequestResult: React.FC = () => {

  const router = useRouter();

  const { patientData } = usePatientData();
  const request: PostData = { symptom_text : '', base64_image: ''};
  const [apiResponse, setApiResponse] = useState<ApiResponse>({ success: false, message: '', message_array: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // 첫 번째 로딩을 추적하는 상태


  useEffect(() => {
    const handleApiCall = async () => {

      if (initialLoad) {
        setIsLoading(true); // 첫 번째 로딩 시에만 로딩 상태를 활성화

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

        setInitialLoad(false); // 첫 로딩이 완료되었으므로 false로 설정
        setIsLoading(false); // 로딩 완료

      }

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
      <Header />
    <div>

      <div>
        {apiResponse.message_array && apiResponse.message_array.length > 0 && (
          <div>
            <h1>진단 결과 확인</h1>
            {/* <p>진단 성공/실패: {apiResponse.success.toString()}</p> */}
            <p>진단 결과:</p>
            {apiResponse.message_array.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <br/>
            <br/>

              <FeedbackForm />

          </div>
        )}
        {isLoading && (
          <div className="flex flex-col justify-center items-center h-screen"> {/* 화면 전체를 채우는 flex 컨테이너 */}

              {patientData && (
                <div className="flex flex-col items-center">
                  <h1>입력정보 확인</h1>
                  <p>증상: {patientData.symptom.join(',')}</p>
                  <p>증상 발현부위: {patientData.affectedArea.join(',')}</p>
                  <p>증상 발현 패턴: {patientData.progress.join(',')}</p>
                  <p>연령대: {patientData.ageGroup}</p>
                  <br/>
                  {/* <button onClick={handleApiCall} className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded">진단 결과 보기</button> */}

                  {/* 이미지 출력 */}
                  {/* {patientData.imageBase64 && (
                    <Image src={patientData.imageBase64} width={1080} height={1920} alt="Uploaded" />
                  )} */}
                </div>
              )}

            <p className="text-lg mt-4">...Analysing </p> {/* 로딩 텍스트 */}
            <br/>
            <br/>
            <br/>
            <div className="flex flex-col items-center"> {/* 수직 정렬을 위한 flex 컬럼 */}

              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>

        )}

      </div>
    </div>
    <Footer />
    </main>
  );
};

export default RequestResult;
