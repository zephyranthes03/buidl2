import React, { useRef, useState } from 'react';

interface ImageSize {
  width: number;
  height: number;
}

const CameraApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);

  const getVideo = () => {
    const constraints = {
      video: { facingMode: "environment" } // 후방 카메라 사용 설정
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
    }
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
      <button onClick={takePhoto}>Take Photo</button>
      <button onClick={uploadImage}>Upload Image</button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {imageSize && <p>Image Size: {imageSize.width} x {imageSize.height}</p>}
    </div>
  );

//   return (
//     <div>
//       <video ref={videoRef}></video>
//       <button onClick={getVideo}>Activate Camera</button>
//       <button onClick={takePhoto}>Take Photo</button>
//       <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
//       {imageSize && <p>Image Size: {imageSize.width} x {imageSize.height}</p>}
//     </div>
//   );

}
  

export default CameraApp;
