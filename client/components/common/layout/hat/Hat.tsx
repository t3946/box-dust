import * as React from "react";
import Navigation from "@components/common/layout/hat/Navigation";
import Styles from "@components/common/layout/hat/Hat.module.scss";
import cn from "classnames";
import ConvexButton from "@components/common/ui/convex-button/ConvexButton";
import { modalOpen } from "@redux/reducer/Popup";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import UserPanel from "@components/common/layout/hat/UserPanel";

export const Hat: React.FC = function () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  function openModalLogin() {
    dispatch(
      modalOpen({
        modal: "login",
      })
    );
  }

  return (
    <>
      <header className={cn(Styles.hat)}>
        <div className="row m-lg-0">
          <div className="col-3">
            <img src={"/images/pages/main/logo.png"} className={Styles.logo} />
          </div>

          <div className="col-5 d-flex align-items-center justify-content-center">
            <ul className={"list-unstyled m-0"}>
              <li className={Styles.navItem}>
                <a href="#" className={Styles.navLink}>
                  Коробки
                </a>
              </li>
              <li className={Styles.navItem}>
                <a href="#" className={Styles.navLink}>
                  Доставка
                </a>
              </li>
              <li className={Styles.navItem}>
                <a href="#" className={Styles.navLink}>
                  Отзывы
                </a>
              </li>
              <li className={Styles.navItem}>
                <a href="#" className={Styles.navLink}>
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div className={cn([Styles.headerUiColumn, "col-4"])}>
            {!user && (
              <ConvexButton
                classes={Styles.loginButton}
                onClick={openModalLogin}
              >
                Войти
              </ConvexButton>
            )}

            {user && <UserPanel />}
          </div>
        </div>
      </header>

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
    </>
  );
};

export default Hat;
