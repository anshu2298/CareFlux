import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "../Card/Card";
import "./RevenueCategoryChart.css";

const data = [
  { name: "Sports", value: 4500 },
  { name: "Sci-Fi", value: 3800 },
  { name: "Animation", value: 3200 },
  { name: "Drama", value: 2900 },
  { name: "Comedy", value: 2700 },
  { name: "Action", value: 2500 },
];

const COLORS = [
  "#3182ce",
  "#38a169",
  "#d53f8c",
  "#805ad5",
  "#dd6b20",
  "#319795",
];

const RevenueCategoryChart = () => {
  return (
    <Card>
      <div className='chart-header'>
        <h2>Revenue by Category</h2>
      </div>
      <div style={{ height: 450, width: "100%" }}>
        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={80}
              outerRadius={120}
              fill='#8884d8'
              paddingAngle={5}
              dataKey='value'
              stroke='none'
              activeShape={{
                stroke: "#fff",
                strokeWidth: 2,
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => {
                const total = data.reduce(
                  (acc, curr) => acc + curr.value,
                  0
                );
                const percent = (
                  (value / total) *
                  100
                ).toFixed(1);
                return [
                  `$${value.toLocaleString()} (${percent}%)`,
                  name,
                ];
              }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            />
            <Legend
              verticalAlign='bottom'
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueCategoryChart;
