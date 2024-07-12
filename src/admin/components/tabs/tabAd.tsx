import React, { FC } from "react";
import styles from "./tab.module.scss";
import classNames from "classnames/bind";
import { ProductIcon, ArrowIcon } from "../../../assets/icon";

const cx = classNames.bind(styles);
interface TabAdProps {
  children?: React.ReactNode;
  item: any;
  onClick: (
    item: any,
    callback: any
  ) => void;
  isParentElement?: boolean;
  tabActivated: string;
  callback: (
    event: React.MouseEvent<HTMLDivElement>,
    item: any,
    callback: any
  ) => void;
}

const TabAd: React.FC<TabAdProps> = ({
  item,
  children,
  onClick,
  isParentElement,
  tabActivated,
  callback,
}) => {
  return (
    <div
      className={cx("wrapper", {
        "parent-is-activated": tabActivated === item.tabName && isParentElement,
      })}
    >
      <div
        className={cx("tabContent", {
          "is-activated": tabActivated === item.tabName && !isParentElement,
        })}
        data-name={item.tabName}
        data-type={isParentElement ? "parent" : "children"}
        onClick={(e) => {
          onClick(item, callback);
        }}
      >
        <div className={cx("tabLeft", "fl")}>
          <div className={cx("icon")}>{item.icon}</div>
          <span className={cx("name")}>{item.tabName}</span>
        </div>
        <div className={cx("tabRight", "fl")}>
          {isParentElement && (
            <div className={cx("iconOpen", "icon")}>
              <ArrowIcon />
            </div>
          )}
        </div>
      </div>
      <div className={cx("tabChildren")}>
        <div className={cx("tabChildrenWrapper")}>{children}</div>
      </div>
    </div>
  );
};

export default TabAd;
