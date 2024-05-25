import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PatientDataProvider } from '../contexts/PatientDataContext';
import { LlmDataProvider } from '../contexts/LLMDataContext';


export default function App({ Component, pageProps }: AppProps) {
  return <PatientDataProvider>
      <LlmDataProvider>
      <Component {...pageProps} />
      </LlmDataProvider>
      </PatientDataProvider>;
}
