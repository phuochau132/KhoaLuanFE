import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDelProductMutation,
  useProductQuery,
} from "../../../api/ProductApi";
import styles from "./productAd.module.scss";
import classNames from "classnames/bind";
import { Modal } from "antd";

let initialRows: GridRowsProp = [];
const cx = classNames.bind(styles);
export default function ProductPage() {
  const { data, isLoading, isSuccess, isError } = useProductQuery();
  const [deleteProduct, { data: deleteData, isError: deleteIsError }] =
    useDelProductMutation();
  const [rows, setRows] = useState(initialRows);
  const handleDelete = async (id: number) => {
    const result = await deleteProduct(id);
    console.log("deleteData", deleteData);
    if (result.data) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      Modal.success({
        content: "Deleted successfully",
      });
    } else {
      if (deleteIsError) {
        Modal.success({
          content: "Delete failed",
        });
      }
    }
  };
  useEffect(() => {
    if (isSuccess && data) {
      setRows(data);
    }
  }, [isSuccess, data]);
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
          icon={<DeleteIcon sx={{ color: "rgb(142 23 22)" }} />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />
      ),
    },
  ];
  return (
    <div
      className={cx("container", {
        isLoading: isLoading,
        backgroundOverLay: isLoading,
      })}
      style={{ height: 500, width: "100%" }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[1, 2]}
        checkboxSelection
      />
    </div>
  );
}
