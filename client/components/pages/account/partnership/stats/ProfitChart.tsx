import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function getData(size: number) {
  const dayTime = 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const data = [];

  for (let i = 0; i < size; i++) {
    const date = new Date(now - dayTime * i);

    data.unshift({
      date: date.toLocaleDateString(),
      value: 500 * Math.round(Math.random() * 6),
    });
  }

  return data;
}

interface IProps {
  size: number;
}

export const ProfitChart: React.FC<IProps> = function (props) {
  const { size } = props;
  const data = getData(size);

  const styleAxis = {
    fontSize: "12px",
    fontWeight: 600,
    color: "#20004a",
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" style={styleAxis} key={"foo"}/>

        <YAxis tickCount={3} width={20} style={styleAxis} />

        <Tooltip
          formatter={(...args: any) => {
            args[1] = "Прибыль";
            return args;
          }}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#4c1d95"
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProfitChart;
