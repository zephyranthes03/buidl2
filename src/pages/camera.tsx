import React, { useRef, useState } from 'react';

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
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

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const width = video.videoWidth;
      const height = video.videoHeight;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(video, 0, 0, width, height);

      // 이미지 데이터를 Base64 형식으로 변환
      const imageData = canvas.toDataURL('image/png');
      setImageData(imageData);
    }
  };

  const uploadImage = async () => {
    if (imageData) {
      // 서버 업로드 로직을 여기에 추가
      // 예: fetch API를 사용하여 서버에 POST 요청
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: JSON.stringify({ image: imageData }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      // });
      // const data = await response.json();
      // console.log(data);
    }
  };

  return (
    <div>
      <video ref={videoRef}></video>
      <button onClick={getVideo}>Activate Camera</button>
      <button onClick={takePhoto}>Take Photo</button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {imageData && (
        <>
          <img src={imageData} alt="Captured" />
          <button onClick={uploadImage}>Upload Image</button>
        </>
      )}
    </div>
  );
};

export default Camera;
