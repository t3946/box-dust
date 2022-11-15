import * as React from "react";
import cn from "classnames";
import Style from "@components/pages/account/Sidebar.module.scss";
import { useRouter } from "next/router";

export const LogoutButton: React.FC<any> = function (props) {
  const router = useRouter();
  const goBack = () => {
    const backUrlWhiteList = ["/account/payment", "/account/stock"];
    const defaultUrl = "/account/profile";

    for (const url of backUrlWhiteList) {
      if (props.referer.endsWith(url)) {
        router.push(url);
        return;
      }
    }

    router.push(defaultUrl);
  };

  return (
    <div onClick={goBack} className={cn(Style.sidebar_item, "mb-3")}>
      <span className={cn(Style.item, Style.item__logout)}>Назад</span>
    </div>
  );
};

export default LogoutButton;
