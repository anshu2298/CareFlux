import { useQuery } from "@apollo/client";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BiBox } from "react-icons/bi";
import { GET_KEY_METRICS } from "../../graphql/queries";
import "./KPISection.css";

const KPICard = ({ label, value, icon, isLoading }) => (
  <div
    className={`kpi-card ${
      isLoading ? "fade-updating" : ""
    }`}
  >
    <div className='kpi-icon'>{icon}</div>
    <div className='kpi-info'>
      <span className='kpi-label'>{label}</span>
      <h3 className='kpi-value'>{value}</h3>
    </div>
  </div>
);

const KPISection = ({ filters }) => {
  const { data, loading, error } = useQuery(
    GET_KEY_METRICS,
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

  if (error)
    return (
      <div className='error'>Error loading metrics</div>
    );

  const metrics = data?.getKeyMetrics || {
    totalRevenue: 0,
    activeRentals: 0,
  };

  return (
    <div className='kpi-section'>
      <KPICard
        label='Total Revenue'
        value={`$${metrics.totalRevenue.toLocaleString()}`}
        icon={<HiOutlineCurrencyDollar />}
        isLoading={loading}
      />
      <KPICard
        label='Active Rentals'
        value={metrics.activeRentals.toLocaleString()}
        icon={<BiBox />}
        isLoading={loading}
      />
    </div>
  );
};

export default KPISection;
