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


  const skipPhoto = () => {
    setPatientData({ ageGroup: '', symptom: [], affectedArea: [], progress: [], feedback: '', comment: '', imageBase64: '' });
    router.push('/patientForm');
  };


  const savePhoto = (canvas: HTMLCanvasElement) => {
    const imageDataUrl = canvas.toDataURL('image/jpeg'); // 캔버스의 내용을 이미지 데이터로 변환

    setPatientData({ ageGroup: '', symptom: [], affectedArea: [], progress: [], feedback: '', comment: '', imageBase64: imageDataUrl });
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
      className={`flex min-h-screen flex-col items-left justify-between p-12`}
    >
      <Header />
      <div className="flex items-center justify-center w-full h-full">
        <video ref={videoRef} className="w-full h-full object-cover"></video>
      </div>
      <br/>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      <button className="bg-blue-600 hover:bg-blue-900 font-bold py-2 px-2 rounded mr-4" onClick={switchCamera}>Switch Camera</button>
      <button className="bg-blue-600 hover:bg-blue-900 font-bold py-2 px-2 rounded mr-4" onClick={takePhoto}>Take Photo</button>
      <button className="bg-blue-600 hover:bg-blue-900 font-bold py-2 px-2 rounded mr-4" onClick={skipPhoto}>Skip</button>
      {/* {defaultImageSize && <p>Image Size: {defaultImageSize.width} x {defaultImageSize.height}</p>} */}
      </div>
      <br/>
    <Footer />
    </main>
    );



}
  

export default CameraApp;
