import * as React from "react";
import Navigation from "@components/common/layout/hat/Navigation";
import Styles from "@components/common/layout/hat/Hat.module.scss";
import cn from "classnames";
import ConvexButton from "@components/common/ui/convex-button/ConvexButton";
import { modalOpen } from "@redux/reducer/Popup";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import UserPanel from "@components/common/layout/hat/UserPanel";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuDesktop from "@components/common/layout/hat/MenuDesktop";
import HatMobile from "@components/common/layout/hat/mobile/HatMobile";

export const Hat: React.FC = function () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  function openModalLogin() {
    dispatch(
      modalOpen({
        modal: "login",
      })
    );
  }

  return (
    <>
      <HatMobile />

      <header className={cn(Styles.hat, "d-none", "d-md-block")}>
        <div className="row m-lg-0">
          <div className="col-3">
            <Link href={"/main"}>
              <a>
                <img
                  src={"/images/pages/main/logo.png"}
                  alt={"site log"}
                  className={Styles.logo}
                />
              </a>
            </Link>
          </div>

          <div className="col-5 d-none d-lg-flex align-items-center justify-content-center">
            <MenuDesktop />
          </div>

          <div className={cn([Styles.headerUiColumn, "col-4"])}>
            {!user && (
              <ConvexButton
                className={Styles.loginButton}
                onClick={openModalLogin}
              >
                Войти
              </ConvexButton>
            )}

            {user && <UserPanel />}
          </div>
        </div>
      </header>

      {router.route !== "/account" && (
        <div
          className={cn([
            Styles.headerMenuPanel,
            "col-12",
            "d-none",
            "d-lg-block",
          ])}
        >
          <Navigation />
        </div>
      )}
    </>
  );
};

export default Hat;
