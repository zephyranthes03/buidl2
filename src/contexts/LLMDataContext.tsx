import React, { createContext, useState, useContext } from 'react';

export interface LlmData {
  id: string;
  instruction: string;
  input: string;
  image_base64: string;
  output: string;
  feedback: Number;
  feedback_content: string;
}

interface LlmDataContextProps {
  llmData: LlmData;
  setLlmData: React.Dispatch<React.SetStateAction<LlmData>>;
}

const LlmDataContext = createContext<LlmDataContextProps | undefined>(undefined);

export const useLlmData = () => {
  const context = useContext(LlmDataContext);
  if (!context) {
    throw new Error('useLlmData must be used within a LlmDataProvider');
  }
  return context;
};

interface LlmDataProviderProps {
  children: React.ReactNode;
}

export const LlmDataProvider: React.FC<LlmDataProviderProps> = ({ children }) => {
  const [llmData, setLlmData] = useState<LlmData>({ id: '', instruction: '', input: '', image_base64: '', output: '', feedback: 2, feedback_content: ''});

  return (
    <LlmDataContext.Provider value={{ llmData, setLlmData }}>
      {children}
    </LlmDataContext.Provider>
  );
};
