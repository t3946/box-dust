import * as React from "react";
import Table from "antd/lib/table";
import useSelector from "@hooks/useSelector";
import { ColumnType } from "antd/lib/table/interface";

export interface IProps {}
//todo: теперь график
const GamesList: React.FC<IProps> = function (props) {
  const {} = props;
  const user = useSelector((state) => state.user.user);
  const dataSource = [];

  const columns: ColumnType<Record<any, any>>[] = [
    // {
    //   title: "Id Пользователя",
    //   dataIndex: "userId",
    //   key: "userId",
    // },
    {
      title: "Имя Пользователя",
      dataIndex: "userName",
      key: "userName",
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
      title: "Цена игры",
      dataIndex: "gamePrice",
      key: "gamePrice",
    },
    {
      title: "Цена продажи приза",
      dataIndex: "prizePrice",
      key: "prizePrice",
    },
    {
      title: `Доход (${user.partnership.revenue_percent}%)`,
      dataIndex: "revenue",
      key: "revenue",
    },
  ];

  for (const referral of user.referrals) {
    for (const game of referral.games) {
      dataSource.push({
        key: `game-table-row-${game.game_id}`,
        userId: game.user.user_id,
        userName: game.user.name,
        gamePrice: game.game_price,
        prizePrice: game.prize_price / 2,
        revenue: Math.floor(
          ((game.game_price - game.prize_price / 2) *
            user.partnership.revenue_percent) /
            100
        ),
      });
    }
  }

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      showSorterTooltip={false}
    />
  );
};

export default GamesList;
