import React, { FC } from "react";
import styles from "./tab.module.scss";
import classNames from "classnames/bind";
import { ProductIcon, ArrowIcon } from "../../../assets/icon";

const cx = classNames.bind(styles);
interface TabAdProps {
    children?: React.ReactNode;
    item:any,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    isParentElement?:boolean,
    tabActivated:string,
}

const TabAd: React.FC<TabAdProps> = ({ item, children, onClick, isParentElement, tabActivated  }) => {
    return (
        <div className={cx("wrapper",{"parent-is-activated":tabActivated === item.tabName && isParentElement })}  >
            <div className={cx("tabContent", { "is-activated": tabActivated === item.tabName && !isParentElement })} data-name={item.tabName}  data-type={isParentElement ? "parent" : "children"} onClick={(e)=>{onClick(e)}} >
                <div className={cx("tabLeft", "fl")}>
                    <div className={cx("icon")}>
                       {item.icon}
                    </div>
                    <span className={cx("name")}>{item.tabName}</span>
                </div>
                <div className={cx("tabRight", "fl")}>
                    {isParentElement && <div className={cx("iconOpen", "icon")}>
                        <ArrowIcon />
                    </div>}
                </div>
            </div>
            <div className={cx("tabChildren")}>
                <div className={cx("tabChildrenWrapper")}>
                {children}  
                </div>
            </div>
        </div>
    );
};

export default TabAd;
