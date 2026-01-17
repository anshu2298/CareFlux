import { useQuery } from "@apollo/client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "../Card/Card";
import { GET_REVENUE_BY_CATEGORY } from "../../graphql/queries";
import "./RevenueCategoryChart.css";

const COLORS = [
  "#3182ce",
  "#38a169",
  "#d53f8c",
  "#805ad5",
  "#dd6b20",
  "#319795",
];

const RevenueCategoryChart = ({ filters }) => {
  const { data, loading, error } = useQuery(
    GET_REVENUE_BY_CATEGORY,
    {
      variables: {
        storeId:
          filters.store === "all"
            ? null
            : parseInt(filters.store),
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
    },
  );

  const chartData = (data?.getRevenueByCategory || []).map(
    (item) => ({
      name: item.name,
      value: item.revenue,
    }),
  );

  return (
    <Card>
      <div className='chart-header'>
        <h2>Revenue by Category</h2>
      </div>
      <div
        style={{
          height: 450,
          width: "100%",
          position: "relative",
        }}
      >
        {loading && (
          <div className='chart-loading-overlay'>
            Loading...
          </div>
        )}
        {error && (
          <div className='error'>
            Error loading chart data
          </div>
        )}

        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          <PieChart>
            <Pie
              data={chartData}
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
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => {
                const total = chartData.reduce(
                  (acc, curr) => acc + curr.value,
                  0,
                );
                const percent =
                  total > 0
                    ? ((value / total) * 100).toFixed(1)
                    : 0;
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
