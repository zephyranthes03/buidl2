import React, { useState } from 'react';

interface QuestionnaireData {
  name: string;
  ageGroup: string;
}

interface QuestionnaireInfoFormProps {
  onSubmit: (questionnaireData: QuestionnaireData) => void;
}

const QuestionnaireInfoForm: React.FC<QuestionnaireInfoFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, ageGroup });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        연령대:
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
        >
          <option value="">연령대를 선택하세요</option>
          <option value="10대">10대</option>
          <option value="20대">20대</option>
          <option value="30대">30대</option>
          {/* 다른 연령대 옵션들 추가 */}
        </select>
      </label>
      <button type="submit">다음으로</button>
    </form>
  );
};

export default QuestionnaireInfoForm;
