import * as React from "react";
import SecondaryContainer from "@components/common/layout/account/SecondaryContainer";

export interface IProps {}

export const ReferralsList: React.FC<IProps> = function (props) {
  const {} = props;

  return (
    <SecondaryContainer
      header={"рефералы"}
      className={"h-100 d-flex flex-column"}
    >
      <p className={"flex-grow-1"}>
        &lt;тут большая таблица с фильтрами по рефералам и их ативности&gt;
      </p>
    </SecondaryContainer>
  );
};

export default ReferralsList;
