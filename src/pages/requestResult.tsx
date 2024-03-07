import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PatientData, usePatientData } from '../contexts/PatientDataContext';

const requestResult: React.FC = () => {
  const router = useRouter();
  const { patientData } = usePatientData();

//   const [patientData, setPatientData] = useState<PatientData>({ name: '', ageGroup: '', imageBase64: '' });
  return (
    <div>
      <h1>환자 정보 확인</h1>
      {patientData && (
        <div>
          <p>이름: {patientData.name}</p>
          <p>연령대: {patientData.ageGroup}</p>
          {/* 이미지를 base64로 전달받았을 경우 이미지 출력 */}
          {patientData.imageBase64 && <img src={patientData.imageBase64} alt="Uploaded" />}
        </div>
      )}
    </div>
  );
};

export default requestResult;
