import React, { useRef, useState, useEffect } from 'react';

interface ImageSize {
  width: number;
  height: number;
}

const CameraApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [useFrontCamera, setUseFrontCamera] = useState(false); // 카메라 전환 상태

  

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
      const width = video.videoWidth;
      const height = video.videoHeight;

      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(video, 0, 0, width, height);
      setImageSize({ width, height });

  return (
    <div>
      <video ref={videoRef}></video>
      <button onClick={getVideo}>Activate Camera</button>
      <button onClick={takePhoto}>Take Photo</button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {imageSize && <p>Image Size: {imageSize.width} x {imageSize.height}</p>}
    </div>
  );      
    }
  };

  const switchCamera = () => {
    // 현재 스트림을 중지합니다.
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    // 카메라 전환 상태를 변경합니다.
    setUseFrontCamera(!useFrontCamera);

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
    <div>
      <video ref={videoRef}></video>
      <button onClick={getVideo}>Activate Camera</button>
      <button onClick={switchCamera}>Switch Camera</button>      
      <button onClick={takePhoto}>Take Photo</button>
      <button onClick={uploadImage}>Upload Image</button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {imageSize && <p>Image Size: {imageSize.width} x {imageSize.height}</p>}
    </div>
  );



}
  

export default CameraApp;
