import * as React from "react";
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ReactElement } from "react";
import RBForm from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import cn from "classnames";
import SecondaryContainer from "@components/common/layout/account/SecondaryContainer";
import useSelector from "@hooks/useSelector";
import _ from "lodash";

export interface IProps {
  className: any;
}

//todo: квартальная прибыль требует разделителя в таблице как минимум, а то и вообще другой график
// графики можно разделить на 3 типа уже -- про деньги, про пользователей, про спины, надо массив charts сделать так:
// [{groupName: "деньги", charts: [{}, {}]}, {groupName: "пользователи", charts: [{}, {}]}, {groupName: "спины", charts: [{}]}]
export const Chart: React.FC<IProps> = function (props) {
  const { className } = props;
  let data = React.useState(_.range(0, 90, 0));
  const now = new Date().getTime();
  const [charts, setCharts] = React.useState([
    // {
    //   slug: "revenue",
    //   name: "Квартальная прибыль",
    //   color: "#fcd554",
    //   active: false,
    // },
    // {
    //   slug: "registrations",
    //   name: "регистрации",
    //   color: "#aaaaaa",
    //   active: true,
    // },
    // {
    //   slug: "activeClients",
    //   name: "активне клиенты",
    //   color: "#05ac50",
    //   active: true,
    // },
    {
      slug: "spins",
      name: "спины",
      color: "#6d20cb",
      active: true,
    },
  ]);
  const initialValues: any = {};
  const user = useSelector((state) => state.user.user);
  const dayMs = 1000 * 60 * 60 * 24;
  const dateNow = new Date();

  for (const chart of charts) {
    initialValues[chart.slug] = chart.active;
  }

  for (let i = 90; i >= 0; i--) {
    const day = new Date(now - 1000 * 60 * 60 * 24 * i);
    const date = day.getDate();
    const month = day.toLocaleDateString("ru-RU", { month: "short" });
    const name = date + " " + month;
    const dataItem: any = { name };

    for (const chart of charts) {
      if (!chart.active) {
        continue;
      }

      //todo: debug
      // dataItem[chart.name] = Math.round(Math.random() * 10);
    }

    data.push(dataItem);
  }

  for (let i = 0; i < 90; i++) {
    const previousDay = new Date(dateNow - dayMs * i);
    let games = 0;

    for (const referral of user.referrals) {
      for (const game of referral.games) {
        const dateCreated = new Date(game.created);

        //compere dates ignoring time
        if (
          previousDay.getDate() === dateCreated.getDate() &&
          previousDay.getFullYear() === dateCreated.getFullYear() &&
          previousDay.getMonth() === dateCreated.getMonth()
        ) {
          games++;
        }
      }
    }

    // data[i].push({ spins: games });
    data[i]["спины"] = games;
  }

  data = data.reverse();

  const colorItems = [];
  const areaItems: ReactElement<Area>[] = [];

  for (const chart of charts) {
    colorItems.push(
      <linearGradient
        id={"color_" + chart.slug}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
        key={`chart-color-${chart.slug}`}
      >
        <stop offset="5%" stopColor={chart.color} stopOpacity={0.8} />
        <stop offset="95%" stopColor={chart.color} stopOpacity={0} />
      </linearGradient>
    );

    if (!chart.active) {
      continue;
    }

    areaItems.push(
      <Area
        type="monotone"
        dataKey={chart.name}
        stroke={chart.color}
        fillOpacity={1}
        fill={`url(#color_${chart.slug})`}
        key={`chart-area-${chart.slug}`}
      />
    );
  }

  const checkToggles: any = [];

  for (const i in charts) {
    const chart = charts[i];

    checkToggles.push(
      <InputGroup key={`chart-toggle-${chart.slug}`}>
        <RBForm.Check
          type={"checkbox"}
          id={chart.slug}
          onChange={(e) => {
            chart.active = e.target.checked;
            setCharts([...charts]);
          }}
          checked={chart.active}
        />
        <RBForm.Label
          htmlFor={chart.slug}
          className={cn("text-capitalize", "ps-2", {
            "mb-0": parseInt(i) === charts.length - 1,
          })}
        >
          {chart.name}
        </RBForm.Label>
      </InputGroup>
    );
  }

  return (
    <div className={cn(className)}>
      <div className="row">
        <div className="col">
          <AreaChart
            width={760}
            height={250}
            data={data.slice()}
            margin={{ top: 0, right: 0, left: -15, bottom: 0 }}
          >
            <defs>{colorItems}</defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Brush dataKey="name" height={30} startIndex={data.length - 10} />
            <Legend />
            {areaItems}
          </AreaChart>
        </div>
        <div className="col">
          <SecondaryContainer header={"Чарты"} className={"h-100"}>
            {checkToggles}
          </SecondaryContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart;
