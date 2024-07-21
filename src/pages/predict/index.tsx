import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import { Button, Image, Input, Select } from "antd";
import { usePredictMutation } from "../../api/PredictApi";
import { ICamera, ProductPredict } from "../../interface";
// css
import styles from "./predict.module.scss";
import classNames from "classnames/bind";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
  GridRowsProp,
} from "@mui/x-data-grid";
import Block from "../block";
import { ShoppingCartOutlined } from "@mui/icons-material";
const cx = classNames.bind(styles);
const initialRows: GridRowsProp = [];
export default function PredictPage() {
  const webcamRef = useRef(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const [cameraDevices, setCameraDevices] = useState<ICamera[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [scanImage, setScanImage] = useState<string>("");
  const [predict, { isLoading , data, error }] = usePredictMutation();

  const formatterCurrency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [rows, setRows] = useState(initialRows);
  const [visible, setVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const previewProduct = (image: string)=>{
    setImagePreview(image)
    setVisible(true)
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 100 },
    { field: "label_id", headerName: "Label Id", width: 150 },
    { field: "product_name", headerName: "Product Name", width: 150 },
    {
      field: 'image_scan',
      headerName: 'Image Scan',
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="image" style={{ width: '100%' }} onClick={() => previewProduct(params.value)}/>
      ),
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="image" style={{ width: '100%' }} onClick={() => previewProduct(params.value)} />
      ),
    },
    { field: "price", headerName: "Price", width: 150,
      renderCell: (params) => (
        formatterCurrency.format(params.value)
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<GridDeleteIcon sx={{ color: "rgb(142 23 22)" }} />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />
      ),
    },
  ];
  const handleKeyPress = (event : KeyboardEvent) => {
    if (event.key === 'F2') {
      captureScreenshot();
    }
  };
  useEffect(()=>{
    if(data){
      const newData : ProductPredict = {...data, image_scan : scanImage}
      setRows((old)=>[...old, newData])
    }
  },[data])
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
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
    return ()=>{
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  const captureScreenshot = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScanImage(imageSrc)
    predict(imageSrc);
 };

  const handleDeviceChange = (value: string) => {
    setSelectedDeviceId(value);
  };


  return (
    <div className={cx("container")}>
      <Image
        width={200}
        style={{
          display: 'none',
        }}
        src={imagePreview}
        preview={{
          visible,
          scaleStep: 0.5,
          src: imagePreview,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />

      <div  className="main-predict" style={{display: 'flex', gap:'10px', alignItems: 'center'}}>
      <div className={cx("cameraWrapper", "fl")} style={{flex: 1}}>
        <div className={cx("cameraTop", "fl")} >
          <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:10}}> 
            <label htmlFor="cameraSelect">Choose a camera:</label>
            <Select value={selectedDeviceId} onChange={handleDeviceChange}>
              {cameraDevices.map((camera) => (
                <Select.Option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div ref={captureRef}>
            <Webcam
              width={600}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ deviceId: selectedDeviceId }}
            />
          </div>
        </div>
        <Button type="primary" danger onClick={captureScreenshot} >Click Scan Product / F2</Button>
      </div>
      <div className={cx("productWrapper")}  style={{flex: 1}}>
        <Block title="List Product">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[1, 2]}
          />
        </Block>

        <div className={cx("OrderInformationWrapper")}>
        <Block title="Information">
          <div className={cx("fieldset")}>
            <label htmlFor="">Customer Name</label>
            <Input className={cx("input")} placeholder="Basic usage" />
          </div>
          <div className={cx("fieldset")}>
            <label htmlFor="">Address</label>
            <Input className={cx("input")} placeholder="Basic usage" />
          </div>
          <div className={cx("fieldset")}>
            <label htmlFor="">Email</label>
            <Input className={cx("input")} placeholder="Basic usage" />
          </div>
          <div className={cx("fieldset")}>
            <label htmlFor="">Phone Number</label>
            <Input className={cx("input")} placeholder="Basic usage" />
          </div>
        </Block>
      </div>
      <Button icon={<ShoppingCartOutlined />} iconPosition={'start'} style={{float:'right', backgroundColor:'#06bfe2', color:'white', padding:'20px 20px'}}>
            Payment
          </Button>
      </div>
      </div>
      
    </div>
  );
}
