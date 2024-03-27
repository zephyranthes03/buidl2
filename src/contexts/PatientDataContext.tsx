import React, { createContext, useState, useContext } from 'react';

export interface PatientData {
  ageGroup: string;
  symptom: string[];
  affectedArea: string[];
  progress: string[];
  imageBase64: string;
  feedback: string;
  comment: string;
}

interface PatientDataContextProps {
  patientData: PatientData;
  setPatientData: React.Dispatch<React.SetStateAction<PatientData>>;
}

const PatientDataContext = createContext<PatientDataContextProps | undefined>(undefined);

export const usePatientData = () => {
  const context = useContext(PatientDataContext);
  if (!context) {
    throw new Error('usePatientData must be used within a PatientDataProvider');
  }
  return context;
};

interface PatientDataProviderProps {
  children: React.ReactNode;
}

export const PatientDataProvider: React.FC<PatientDataProviderProps> = ({ children }) => {
  const [patientData, setPatientData] = useState<PatientData>({ ageGroup: '', symptom: [], affectedArea: [], progress: [], imageBase64: '', feedback: '', comment: '' });

  return (
    <PatientDataContext.Provider value={{ patientData, setPatientData }}>
      {children}
    </PatientDataContext.Provider>
  );
};
