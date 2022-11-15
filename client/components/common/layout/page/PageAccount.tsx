import * as React from "react";
import Sidebar from "@components/pages/account/Sidebar";
import { PropsWithChildren } from "react";
import SelectPage from "@components/common/layout/page/SelectPage";
import Style from "@components/common/layout/page/PageAccount.module.scss";
import FormButton from "@components/common/form/button/Button";
import cn from "classnames";
import { setUser } from "@redux/reducer/User";
import { setState } from "@redux/reducer/Stock";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
import Page from "@components/common/layout/page/Page";

export const PageAccount: React.FC<PropsWithChildren<any>> = function (props) {
  const dispatch = useDispatch();

  function logout() {
    dispatch(setUser({ user: null }));
    dispatch(setState({ stock: [] }));
    Cookie.remove("auth");
  }
  return (
    <Page isAccount={true}>
      <div className={cn("container", Style.pageContainer)}>
        <div className="pe-1 d-none d-lg-block">
          <Sidebar />
        </div>

        <div>
          <SelectPage className={[Style.page__mobilMenu, "d-lg-none"]} />
          {props.children}

          <FormButton
            className={cn(Style.logoutButton, "d-lg-none")}
            onClick={logout}
          >
            выход
          </FormButton>
        </div>
      </div>
    </Page>
  );
};

export default PageAccount;
