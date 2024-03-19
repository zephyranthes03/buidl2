import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";

import { PatientData, usePatientData } from '../contexts/PatientDataContext';

const PatientForm: React.FC = () => {
  const router = useRouter();
  const { setPatientData } = usePatientData();

//   const [localPatientData, setLocalPatientData] = useState<PatientData>({ name: '', ageGroup: '', symptom: [], affectedArea: [], progress: [], imageBase64: '' });
  const [localPatientData, setLocalPatientData] = useState<PatientData>(usePatientData().patientData);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPatientData({ ...localPatientData, imageBase64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLocalPatientData({ ...localPatientData, name: e.target.value });
  // };

  const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalPatientData({ ...localPatientData, ageGroup: e.target.value });
  };


  const handleSymptomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 체크된 경우: 배열에 증상 추가
      setLocalPatientData( { ...localPatientData, symptom: [...localPatientData.symptom, e.target.value ]} );
    } else {
      // 체크 해제된 경우: 배열에서 증상 제거
      setLocalPatientData( { ...localPatientData, symptom: localPatientData.symptom.filter(item => item !== e.target.value)});
    }
  };
    
  const handleAffectedAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 체크된 경우: 배열에 증상 추가
      setLocalPatientData( { ...localPatientData, affectedArea: [...localPatientData.affectedArea, e.target.value ]} );
    } else {
      // 체크 해제된 경우: 배열에서 증상 제거
      setLocalPatientData( { ...localPatientData, affectedArea: localPatientData.affectedArea.filter(item => item !== e.target.value)});
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 체크된 경우: 배열에 증상 추가
      setLocalPatientData( { ...localPatientData, progress: [...localPatientData.progress, e.target.value ]} );
    } else {
      // 체크 해제된 경우: 배열에서 증상 제거
      setLocalPatientData( { ...localPatientData, progress: localPatientData.progress.filter(item => item !== e.target.value)});
    }
  };

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPatientData(localPatientData);
    router.push('/requestResult');
    // router.push({
    //   pathname: '/next',
    //   query: { name }, // 쿼리 파라미터로 name 전달
    // });    
    };

  return (
    <main
      className={`flex min-h-screen flex-col items-left justify-between p-12`}
    >
    <form onSubmit={handleSubmit}>
     {localPatientData.imageBase64 && <Image src={localPatientData.imageBase64} width={1080} height={1920} alt="Uploaded" />}

     <label>
        연령대: 
      </label>
          <select value={localPatientData.ageGroup} onChange={handleAgeGroupChange} className="bg-transparent  border border-gray-100 p-0 rounded-md appearance-none">
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

      {/* <input type="file" onChange={handleImageChange} /> */}
      <br />
      <label>
        어떤 증상이 있나요?
      </label>
      <div className="flex place-items-center grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-6 lg:text-left">
       <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mx-2">
        <input type="checkbox" value="붉어짐" onChange={handleSymptomChange} checked={localPatientData.symptom.includes('붉어짐')} />
        붉어짐
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="가려움" onChange={handleSymptomChange} checked={localPatientData.symptom.includes("가려움")} />
        가려움
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="인설(각질)" onChange={handleSymptomChange} checked={localPatientData.symptom.includes("인설(각질)")} />
        인설(각질)
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="물집(수포)" onChange={handleSymptomChange} checked={localPatientData.symptom.includes("물집(수포)")} />
        물집(수포)
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="딱지" onChange={handleSymptomChange} checked={localPatientData.symptom.includes("딱지")} />
        딱지
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="부기" onChange={handleSymptomChange} checked={localPatientData.symptom.includes("부기")} />
        부기
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="진물" onChange={handleSymptomChange} checked={localPatientData.symptom.includes("진물")} />
        진물
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="태선화(피부 두꺼워짐)" onChange={handleSymptomChange} checked={localPatientData.symptom.includes("태선화(피부 두꺼워짐)")} />
        태선화(피부 두꺼워짐)
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="통증" onChange={handleSymptomChange} checked={localPatientData.symptom.includes("통증")} />
        통증
      </label>
      </div>
      <br />
      <br />
      <label>
        발병 부위는 어디인가요?
      </label>
      <div className="flex place-items-center grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-6 lg:text-left">
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mx-2">
        <input type="checkbox" value="손" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('손')} />
        손
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="손톱" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('손톱')} />
        손톱
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="팔" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('팔')} />
        팔
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="팔꿈치" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('팔꿈치')} />
        팔꿈치
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="팔꿈치(안쪽)" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('팔꿈치(안쪽)')} />
        팔꿈치(안쪽)
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="발" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('발')} />
        발
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="발톱" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('발톱')} />
        발톱
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="다리" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('다리')} />
        다리
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="무릎" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('무릎')} />
        무릎
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="무릎(안쪽)" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('무릎(안쪽)')} />
        무릎(안쪽)
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="배" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('배')} />
        배
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="가슴" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('가슴')} />
        가슴
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="등" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('등')} />
        등
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="엉덩이" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('엉덩이')} />
        엉덩이
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="사타구니" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('사타구니')} />
        사타구니
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="얼굴" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('얼굴')} />
        얼굴
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="입안" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('입안')} />
        입안
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="목" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('목')} />
        목
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="두피" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('두피')} />
        두피
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="겨드랑이" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('겨드랑이')} />
        겨드랑이
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
        <input type="checkbox" value="허리" onChange={handleAffectedAreaChange} checked={localPatientData.affectedArea.includes('허리')} />
        허리
      </label>
      </div>
      <br />
      <br />

      <label>
        증상의 진행 형태는 어떤가요?
      </label>
      <div className="flex place-items-center grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-6 lg:text-left">
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mx-2">
        <input type="checkbox" value="어느날 갑자기" onChange={handleProgressChange} checked={localPatientData.progress.includes('어느날 갑자기')} />
        어느날 갑자기
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
      <input type="checkbox" value="지속적" onChange={handleProgressChange} checked={localPatientData.progress.includes('지속적')} />
        지속적
      </label>
      <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
      <input type="checkbox" value="서서히" onChange={handleProgressChange} checked={localPatientData.progress.includes('서서히')} />
        서서히
      </label>
    <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
    <input type="checkbox" value="더운계절" onChange={handleProgressChange} checked={localPatientData.progress.includes('더운계절')} />
    더운계절
    </label>
    <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
    <input type="checkbox" value="계절 바뀔때" onChange={handleProgressChange} checked={localPatientData.progress.includes('계절 바뀔때')} />
    계절 바뀔때
    </label>
    <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
    <input type="checkbox" value="공기가 안좋을때" onChange={handleProgressChange} checked={localPatientData.progress.includes('공기가 안좋을때')} />
    공기가 안좋을때
    </label>
    <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
    <input type="checkbox" value="눈/비 올때" onChange={handleProgressChange} checked={localPatientData.progress.includes('눈/비 올때')} />
    눈/비 올때
    </label>
    <label className="bg-transparent border border-gray-100 p-0 rounded-md appearance-none mr-2">
      <input type="checkbox" value="나타났다 사라졌다" onChange={handleProgressChange} checked={localPatientData.progress.includes('나타났다 사라졌다')} />
      나타났다 사라졌다
    </label>
    </div>

      <br />
      <br />

      <button type="submit" className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded">진단 실행</button>
    </form>
    </main>    
  );
};

export default PatientForm;
