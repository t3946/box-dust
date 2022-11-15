import * as React from "react";
import SecondaryContainer from "@components/common/layout/account/SecondaryContainer";
import Style from "@components/pages/account/partnership/dashboard/ReferalsList.module.scss";
import Table from "antd/lib/table";
import useSelector from "@hooks/useSelector";
import { ColumnType } from "antd/lib/table/interface";

export interface IProps {}

const columns: ColumnType<Record<any, any>>[] = [
  {
    title: "#",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: "Последний вход",
    dataIndex: "last_login",
    key: "last_login",
  },
  {
    title: "Дата регистрации",
    dataIndex: "created",
    key: "created",
  },
];

const ReferralsList: React.FC<IProps> = function (props) {
  const {} = props;
  const user = useSelector((state) => state.user.user);

  const dataSource = user.referrals.map((value: Record<any, any>) => {
    return {
      ...value,
      last_login: new Date(value.last_login).toLocaleDateString("en-US"),
      created: new Date(value.created).toLocaleDateString("en-US"),
      key: `refer-table-row-${value.user_id}`,
    };
  });

  return (
    <SecondaryContainer
      header={"Пользователи"}
      className={"h-100 d-flex flex-column"}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showSorterTooltip={false}
      />
    </SecondaryContainer>
  );
};

export default ReferralsList;
