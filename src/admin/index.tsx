import classNames from "classnames/bind";
import styles from "./admin.module.scss";
import { TabAd } from "./components";
const cx = classNames.bind(styles);

export default function AdminPage() {
  return (
    <div className={cx("templateAdmin")}>
      <div className={cx("bodyContentWrapper")}>
        <div className={cx("sidebar")}>
          <div className={cx("sidebarHeader")}></div>
          <div className={cx("tabs")}>
            <div className="tabs-wrapper">
              <TabAd icon="" tabName="test" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
