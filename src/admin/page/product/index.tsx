import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useProductQuery } from "../../../api/ProductApi";

const rows: GridRowsProp = [
  {
    id: 1,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 2,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 3,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 4,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 5,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 6,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 7,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 8,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 9,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 10,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
  {
    id: 11,
    id_label: 1,
    label_name: "World",
    product_image: "World",
    product_name: "World",
    product_price: "World",
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "Select", width: 100 },
  { field: "id_label", headerName: "ID", width: 150 },
  { field: "label_name", headerName: "Label Name", width: 150 },
  { field: "product_image", headerName: "Product Image", width: 150 },
  { field: "product_name", headerName: "Product Name", width: 150 },
  { field: "product_price", headerName: "Product Price", width: 150 },
];

export default function ProductPage() {
  const { isLoading, data, error } = useProductQuery();
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[1, 2]}
        checkboxSelection
      />
    </div>
  );
}
