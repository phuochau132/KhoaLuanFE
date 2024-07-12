import styles from "./productCreation.module.scss";
import classNames from "classnames/bind";
import {
  Button,
  GetProp,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useCallback, useState } from "react";
import axios from "axios";
import { useCreateProductMutation } from "../../../api/ProductApi";

const cx = classNames.bind(styles);
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function ProductCreation() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [createProduct, { data, isError }] = useCreateProductMutation();
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log(11111);
    setFileList(newFileList);
  };

  const onPreview = useCallback(async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  }, []);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      alert("Please select a file to upload");
      return;
    }
    const file = fileList[0].originFileObj as FileType;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecommerce");
    formData.append("cloud_name", "dvgjegefi");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvgjegefi/image/upload",
        formData
      );
      const result = await createProduct({
        image: response.data.url,
        product_name: "test",
        price: 20,
        label_id: 1,
      });
      console.log("result.data.status", result);
      if (result.data.status) {
      }

      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className={cx("container")}>
      <div className="main">
        <h4 className={cx("title")}>Information</h4>
        <div className={cx("productInformation", "fl")}>
          <div className={cx("fieldset")}>
            <label htmlFor="">Product Name</label>
            <Input className={cx("input")} placeholder="Basic usage" />
          </div>
          <div className={cx("fieldset")}>
            <label htmlFor="">Product Label</label>
            <Select className={cx("input")}>
              <Select.Option value="sample">Sample</Select.Option>
            </Select>
          </div>
          <div className={cx("fieldset")}>
            <label htmlFor="">Product Price</label>
            <InputNumber
              className={cx("input")}
              min={1}
              max={100}
              defaultValue={10}
            />
          </div>
        </div>
        <div className="line"></div>
        <div className={cx("imageContainer")}>
          <h4 className={cx("title")}>Image Upload</h4>
          <div className={cx("fieldset")}>
            <label htmlFor="">Upload Image</label>
            <ImgCrop className={cx("fieldset")} rotationSlider>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false} // Prevent automatic upload
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
        </div>
      </div>
      <div className={cx("actionAdd")}>
        <div className="line"></div>
        <Button
          className={cx("btnAdd")}
          onClick={handleUpload}
          variant="contained"
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
