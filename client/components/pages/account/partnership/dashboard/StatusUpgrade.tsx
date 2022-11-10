import * as React from "react";
import SecondaryContainer from "@components/common/layout/account/SecondaryContainer";
import Button from "@components/common/form/button/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import useSelector from "@hooks/useSelector";
import SelectorNextPartnership from "@redux/filters/NextPartnership";
import Style from "@components/pages/account/partnership/dashboard/StatusUpgrade.module.scss";

export interface IProps {}

export const StatusUpgrade: React.FC<IProps> = function (props) {
  const user = useSelector((state) => state.user.user);
  const {} = props;
  const nextPartnership = useSelector(SelectorNextPartnership);
  const requirements = JSON.parse(nextPartnership.requirements);
  const requirementsItems = [];

  for (const key in requirements) {
    let title;

    switch (key) {
      case "games":
        title = "Спинов";
        break;
      case "activeUsers":
        title = "Активных клиентов";
        break;
    }

    const requireValue = requirements[key];
    const userHave = 5;
    const have = Math.min(userHave, requireValue);
    const variant =
      have === requireValue
        ? ` ${Style.progressBar_success}`
        : ` ${Style.progressBar_primary}`;

    requirementsItems.push(
      <div className={"mb-1"} key={`requirements-item-${key}`}>
        {title}
        <ProgressBar
          now={(have / requireValue) * 100}
          label={`${have}/${requireValue}`}
          variant={variant}
          className={Style.progressBar}
        />
      </div>
    );
  }

  return (
    <SecondaryContainer
      header={"Повышение статус"}
      className={"h-100 d-flex flex-column"}
    >
      <div className={"mb-3"}>
        <div className={"d-flex mb-2"}>
          <span>Текущий статус</span>
          <span className={"flex-grow-1"}></span>
          <span>{user.partnership.name}</span>
        </div>

        <div className={"d-flex"}>
          <span>Следущий статус</span>
          <span className={"flex-grow-1"}></span>
          <span>{nextPartnership?.name}</span>
        </div>
      </div>

      {requirementsItems}

      <Button className={"mt-4"} disabled={true}>Повысить</Button>
    </SecondaryContainer>
  );
};

export default StatusUpgrade;
