import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PatientDataProvider } from '../contexts/PatientDataContext';


export default function App({ Component, pageProps }: AppProps) {
  return <PatientDataProvider>
      <Component {...pageProps} />
      </PatientDataProvider>;
}
