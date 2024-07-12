import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import { Button, Input, Select } from "antd";
import { usePredictMutation } from "../../api/PredictApi";
import { ICamera } from "../../interface";
// css
import styles from "./predict.module.scss";
import classNames from "classnames/bind";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridDeleteIcon,
} from "@mui/x-data-grid";
import Block from "../block";
const cx = classNames.bind(styles);

export default function PredictPage() {
    const webcamRef = useRef(null);
    const captureRef = useRef<HTMLDivElement>(null);
    const [cameraDevices, setCameraDevices] = useState<ICamera[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
    const [predict, { isLoading, data, error }] = usePredictMutation();
    const handleDelete = (id: Number) => {
        console.log("1111");
    };
    const columns: GridColDef[] = [
        { field: "id", headerName: "Select", width: 100 },
        { field: "label_id", headerName: "ID", width: 150 },
        { field: "class_name", headerName: "Label Name", width: 150 },
        { field: "image", headerName: "Product Image", width: 150 },
        { field: "product_name", headerName: "Product Name", width: 150 },
        { field: "price", headerName: "Product Price", width: 150 },
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
    const rows = [
        {
            id: 1,
            label_id: "123",
            class_name: "Class A",
            image: "Image 1",
            product_name: "Product 1",
            price: 100,
        },
        {
            id: 2,
            label_id: "456",
            class_name: "Class B",
            image: "Image 2",
            product_name: "Product 2",
            price: 200,
        },
    ];

    return (
        <div className={cx("container")}>
            <div className={cx("cameraWrapper", "fl")}>
                <div className={cx("cameraTop", "fl")}>
                    <label htmlFor="cameraSelect">Choose a camera:</label>
                    <Select
                        value={selectedDeviceId}
                        onChange={handleDeviceChange}
                    >
                        {cameraDevices.map((camera) => (
                            <Select.Option
                                key={camera.deviceId}
                                value={camera.deviceId}
                            >
                                {camera.label}
                            </Select.Option>
                        ))}
                    </Select>
                    <div ref={captureRef}>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{ deviceId: selectedDeviceId }}
                        />
                    </div>
                </div>
                <Button onClick={captureScreenshot}>Capture Screen</Button>
            </div>
            <div className={cx("productWrapper")}>
                <Block title="List Product">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[1, 2]}
                        checkboxSelection
                    />
                </Block>
            </div>
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
        </div>
    );
}
