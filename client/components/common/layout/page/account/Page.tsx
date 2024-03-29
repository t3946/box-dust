import * as React from "react";
import SelectPage from "@components/common/layout/page/SelectPage";
import Style from "@components/common/layout/page/account/Page.module.scss";
import FormButton from "@components/common/form/button/Button";
import cn from "classnames";
import { setUser } from "@redux/reducer/User";
import { setState } from "@redux/reducer/Stock";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
import Page from "@components/common/layout/page/Page";
import SidebarAccount from "@components/pages/account/SidebarAccount";
import SidebarPartnership from "@components/pages/account/partnership/Sidebar";

export interface IProps extends React.PropsWithChildren {
  isPartnership?: boolean;
  referer?: string;
}

export const PageAccount: React.FC<IProps> = function (props) {
  const { isPartnership, referer } = props;
  const dispatch = useDispatch();

  function logout() {
    dispatch(setUser({ user: null }));
    dispatch(setState({ stock: [] }));
    Cookie.remove("auth");
  }

  return (
    <Page isAccount={true}>
      <div className={cn("container", Style.pageContainer, Style.page__block)}>
        <div className="d-none d-lg-block">
          {isPartnership ? (
            <SidebarPartnership referer={referer} />
          ) : (
            <SidebarAccount />
          )}
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
