export interface IRoute {
  path: string;
  element: React.ComponentType<any>;
}
export interface ICamera {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
}
export interface PageAdmin {
  tabName: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}
export interface ProductCreation {
  image: string;
  price: Number;
  product_name: string;
}
export interface ProductUpdate {
  id: Number;
  image: string;
  price: Number;
  product_name: string;
}
