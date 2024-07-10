import classNames from "classnames/bind";
import styles from "./admin.module.scss";
import { TabAd } from "./components";
import { useState, useCallback } from "react";
import { ProductIcon } from "../assets/icon";
import { ProductPage } from "./page";
const cx = classNames.bind(styles);
const pages = [
  {
    isParent: true,
    tabName: "Product",
    icon: <ProductIcon />,
    children: [
      {
        tabName: "list product",
        icon: <ProductIcon />,
        content: <ProductPage />,
      },
      { tabName: "create product", icon: <ProductIcon /> },
    ],
  },
];
export default function AdminPage() {
  const [tabActivated, setTabActivated] = useState("list product");
  const [parentTabActivated, setParentTabActivated] = useState("Product");
  const [content, setContent] = useState(<ProductPage />);
  const handleTabActivated = useCallback(
    (e: any, item: any, callback: any) => {
      if (item.isParent) {
        if (item.tabName == parentTabActivated) {
          callback("");
        } else {
          callback(item.tabName);
        }
      } else {
        callback(item.tabName);
        setContent(item.content);
      }
    },
    [tabActivated, parentTabActivated]
  );

  return (
    <div className={cx("templateAdmin")}>
      <div className={cx("bodyContentWrapper")}>
        <div className={cx("sidebar")}>
          <div className={cx("sidebarHeader")}>
            <img
              className={cx("logo")}
              src="https://lotru.devias.io/assets/logo.svg"
              alt=""
            />
          </div>
          <div className={cx("tabs")}>
            <div className="tabs-wrapper">
              {pages.map((item, index) => {
                return (
                  <TabAd
                    tabActivated={parentTabActivated}
                    onClick={handleTabActivated}
                    key={index}
                    isParentElement={true}
                    item={item}
                    callback={setParentTabActivated}
                  >
                    {item.children &&
                      item.children.map((itemChild, childIndex) => {
                        return (
                          <TabAd
                            tabActivated={tabActivated}
                            onClick={handleTabActivated}
                            key={childIndex}
                            item={itemChild}
                            callback={setTabActivated}
                          />
                        );
                      })}
                  </TabAd>
                );
              })}
            </div>
          </div>
        </div>
        <div className={cx("content")}>
          <div className={cx("wrapper")}>{content}</div>
        </div>
      </div>
    </div>
  );
}
