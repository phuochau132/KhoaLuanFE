import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import { Select } from "antd";
import { usePredictMutation } from "../../api/PredictApi";
import { ICamera } from "../../interface";

export default function PredictPage() {
  const webcamRef = useRef(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const [cameraDevices, setCameraDevices] = useState<ICamera[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [predict, { isLoading, data, error }] = usePredictMutation();

  useEffect(() => {
    const getCameraDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const cameras: ICamera[] = devices.filter(
          (device) => device.kind === "videoinput"
        );

        setCameraDevices(cameras);
        if (cameras.length > 0) {
          setSelectedDeviceId(cameras[0].deviceId);
        }
      } catch (error) {
        console.error("Error enumerating devices:", error);
      }
    };

    getCameraDevices();
  }, []);

  const captureScreenshot = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current);
      const image = canvas.toDataURL("image/png");
      predict(image);
    }
  };

  const handleDeviceChange = (value: string) => {
    setSelectedDeviceId(value);
  };

  return (
    <div>
      <div>
        <label htmlFor="cameraSelect">Choose a camera:</label>
        <Select value={selectedDeviceId} onChange={handleDeviceChange}>
          {cameraDevices.map((camera) => (
            <Select.Option key={camera.deviceId} value={camera.deviceId}>
              {camera.label}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div
        ref={captureRef}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ deviceId: selectedDeviceId }}
        />
      </div>
      <button onClick={captureScreenshot}>Capture Screen</button>
    </div>
  );
}
