import React, { createContext, useState, useContext } from 'react';

export interface PatientData {
  name: string;
  ageGroup: string;
  imageBase64: string;
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
  const [patientData, setPatientData] = useState<PatientData>({ name: '', ageGroup: '', imageBase64: '' });

  return (
    <PatientDataContext.Provider value={{ patientData, setPatientData }}>
      {children}
    </PatientDataContext.Provider>
  );
};