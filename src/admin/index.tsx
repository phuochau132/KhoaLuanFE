import classNames from "classnames/bind";
import styles from "./admin.module.scss";
import { TabAd } from "./components";
import { useState,useCallback  } from "react";
import { ProductIcon } from "../assets/icon";
const cx = classNames.bind(styles);
const pages = [
    {
        tabName: "Product",
        icon: <ProductIcon/>,
        children: [
            { tabName: "list product", icon: <ProductIcon/> },
            { tabName: "create product", icon: <ProductIcon/> },
        ],
    },
];
export default function AdminPage() {
    const [tabActivated,setTabActivated] = useState("list product")
    const [parentTabActivated,setParentTabActivated] = useState("Product")
    const handleTabActivated=useCallback(
        (e:any)=>{
            const target = e.currentTarget;
            const dataName = target.dataset.name;
            setTabActivated(
                dataName
            )
        },[tabActivated])
    const handleParentTabActivated=useCallback((e:any)=>{
        const target = e.currentTarget;
        const dataName = target.dataset.name;
        if(dataName == parentTabActivated){
            setParentTabActivated(
                ""
            )
        }else{
            setParentTabActivated(
                dataName
            )
        }
    },[parentTabActivated])
    
    return (
        <div className={cx("templateAdmin")}>
            <div className={cx("bodyContentWrapper")}>
                <div className={cx("sidebar")}>
                    <div className={cx("sidebarHeader")}>
                        <img className={cx("logo")} src="https://lotru.devias.io/assets/logo.svg" alt="" />
                    </div>
                    <div className={cx("tabs")}>
                        <div className="tabs-wrapper">
                            {pages.map((item, index)=>{
                                return <TabAd tabActivated={parentTabActivated}  onClick={handleParentTabActivated} key={index} isParentElement={true} item={item} >
                                    {item.children && item.children.map((itemChild, childIndex)=>{
                                        return  <TabAd tabActivated={tabActivated} onClick={handleTabActivated}  key={childIndex} item={itemChild}/>
                                    })}
                                </TabAd>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
