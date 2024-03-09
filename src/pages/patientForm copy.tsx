import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface PatientData {
  name: string;
  ageGroup: string;
  imageBase64: string;
}

const PatientForm: React.FC = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const [patientData, setPatientData] = useState<PatientData>({ name: '', ageGroup: '', imageBase64: '' });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPatientData({ ...patientData, imageBase64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientData({ ...patientData, name: e.target.value });
  };

  const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPatientData({ ...patientData, ageGroup: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/requestResult');
    // router.push({
    //   pathname: '/next',
    //   query: { name }, // 쿼리 파라미터로 name 전달
    // });    
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이미지 업로드:
      </label>
      <input type="file" onChange={handleImageChange} />
      <br />
      <label>
        환자 이름:
    </label>
        <input type="text" value={patientData.name} onChange={handleNameChange} className="bg-transparent  border border-gray-300 p-0 rounded-md" />
      <br />
      <label>
        연령대:
    </label>
        <select value={patientData.ageGroup} onChange={handleAgeGroupChange} className="bg-transparent  border border-gray-100 p-0 rounded-md appearance-none">
          <option value="영아">0-2세(영아)</option>
          <option value="유아">2-6세(유아)</option>
          <option value="어린이">6-13세(어린이)</option>
          <option value="청소년">13-19세(청소년)</option>
          <option value="20대">20대</option>
          <option value="30대">30대</option>
          <option value="40대">40대</option>
          <option value="50대">50대</option>
          <option value="60대이상">60대이상</option>            
          {/* 연령대 옵션 */}
        </select>
      <br />
      <button type="submit">다음</button>
    </form>
  );
};

export default PatientForm;
