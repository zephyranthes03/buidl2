import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PatientData, usePatientData } from '../contexts/PatientDataContext';

interface ImageSize {
  width: number;
  height: number;
}

const CameraApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const defaultImageSize: ImageSize = { width: 1080, height: 1920 };  
  const [imageSize, setImageSize] = useState<ImageSize | null>(defaultImageSize);
  const [useFrontCamera, setUseFrontCamera] = useState(false); // 카메라 전환 상태


  const router = useRouter();
  const { setPatientData } = usePatientData();

  // const [localPatientData, setLocalPatientData] = useState<PatientData>({ name: '', ageGroup: '', imageBase64: '' });
  

  const getVideo = () => {
    const constraints = {
      video: { 
        facingMode: useFrontCamera ? "user" : "environment" // 앞면 또는 후면 카메라 설정
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.width = defaultImageSize.width;
          video.height = defaultImageSize.height;

          video.play();
        }
      })
      .catch(err => {
        console.error("error:", err);
      });

  };

  useEffect(() => {
    getVideo(); // 컴포넌트가 마운트될 때 카메라를 활성화합니다.
  }, [useFrontCamera]); // useFrontCamera가 변경될 때마다 getVideo 함수를 재호출합니다.



  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {

      if (defaultImageSize) {
        video.width = defaultImageSize.width;
        video.height = defaultImageSize.height;
      }

      const width = video.videoWidth;
      const height = video.videoHeight;

      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(video, 0, 0, width, height);
      setImageSize({ width, height });

      savePhoto(canvas); // 사진을 저장하는 함수 호출

    }
  };


  const savePhoto = (canvas: HTMLCanvasElement) => {
    const imageDataUrl = canvas.toDataURL('image/jpeg'); // 캔버스의 내용을 이미지 데이터로 변환

    setPatientData({ ageGroup: '', symptom: [], affectedArea: [], progress: [], imageBase64: imageDataUrl });
    router.push('/patientForm');
    // // 이미지 데이터를 이용하여 사용자에게 다운로드 링크 제공
    // const link = document.createElement('a');
    // link.href = imageDataUrl;
    // link.download = 'captured-photo-' + new Date().toISOString() + '.jpeg'; // 저장될 파일명
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  const switchCamera = () => {
    // 현재 스트림을 중지합니다.
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    // 카메라 전환 상태를 변경합니다.
    if (useFrontCamera) {
        setUseFrontCamera(false);
    } else {
        setUseFrontCamera(true);
    }

    // 새로운 카메라로 비디오를 다시 시작합니다.
    getVideo();
  };

  const uploadImage = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageDataUrl = canvas.toDataURL('image/jpeg');

      // 이 부분에서 서버 엔드포인트로 POST 요청을 보냅니다.
      try {
        const response = await fetch('/your-server-endpoint', {
          method: 'POST',
          body: JSON.stringify({ image: imageDataUrl }),
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error("Server response wasn't OK");
        }

        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Failed to upload the image', error);
      }
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-left justify-between p-12`}>
      <Header />
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
      <video ref={videoRef}></video>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
      <button className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded" onClick={switchCamera}>Switch Camera</button> &nbsp;
      <button className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded" onClick={takePhoto}>Take Photo</button>
      {/* <button className="m-4" onClick={uploadImage}>Upload Image</button> */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {/* {defaultImageSize && <p>Image Size: {defaultImageSize.width} x {defaultImageSize.height}</p>} */}
      </div>
    <Footer />
    </main>
    );



}
  

export default CameraApp;
