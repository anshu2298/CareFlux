import React from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BiBox } from "react-icons/bi";
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

const KPISection = ({ isLoading }) => {
  // Mock data that would normally come from props or API based on filters
  const data = {
    revenue: "$45,231",
    activeRentals: "1,240",
  };

  return (
    <div className='kpi-section'>
      <KPICard
        label='Total Revenue'
        value={data.revenue}
        icon={<HiOutlineCurrencyDollar />}
        isLoading={isLoading}
      />
      <KPICard
        label='Active Rentals'
        value={data.activeRentals}
        icon={<BiBox />}
        isLoading={isLoading}
      />
    </div>
  );
};

export default KPISection;
