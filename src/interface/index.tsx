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

