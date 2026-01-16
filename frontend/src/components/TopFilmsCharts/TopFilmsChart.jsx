import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../Card/Card";
import "./TopFilmsChart.css";

const data = [
  { title: "Academy Dinosaur", count: 34 },
  { title: "Bucket Brotherhood", count: 32 },
  { title: "Rocketeer Mother", count: 31 },
  { title: "Forward Temple", count: 30 },
  { title: "Grit Clockwork", count: 29 },
];

const TopFilmsChart = () => {
  return (
    <Card>
      <div className='chart-header'>
        <h2>Top 5 Rented Films</h2>
      </div>
      <div style={{ height: 450, width: "100%" }}>
        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 40,
            }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#eee'
            />
            <XAxis
              dataKey='title'
              angle={-15}
              textAnchor='end'
              interval={0}
              stroke='#666'
              fontSize={11}
              tick={(props) => {
                const { x, y, payload } = props;
                const truncatedTitle =
                  payload.value.length > 12
                    ? payload.value.substring(0, 10) + "..."
                    : payload.value;
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={0}
                      y={0}
                      dy={16}
                      textAnchor='end'
                      fill='#666'
                      transform='rotate(-20)'
                      fontSize={11}
                    >
                      {truncatedTitle}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis
              stroke='#666'
              fontSize={12}
              tick={{ fill: "#666" }}
            />
            <Tooltip
              cursor={{ fill: "#f8f9fa" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "10px",
              }}
              formatter={(value, name, props) => [
                value,
                "Rentals",
              ]}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Bar
              dataKey='count'
              fill='#3182ce'
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TopFilmsChart;
