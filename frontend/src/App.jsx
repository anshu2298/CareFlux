import { useState } from "react";
import FilterBar from "./components/FilterBar/FilterBar";
import KPISection from "./components/KPISection/KPISection";
import TopFilmsChart from "./components/TopFilmsCharts/TopFilmsChart";
import RevenueCategoryChart from "./components/RevenueCategoryChart/RevenueCategoryChart";
import CustomerTable from "./components/CustomerTable/CustomerTable";
import RecentTransactions from "./components/RecentTransactions/RecentTransactions";
import "./App.css";

function App() {
  const [filters, setFilters] = useState({
    store: "all",
    startDate: "2005-01-01",
    endDate: "2006-12-31",
  });

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className='App'>
      <FilterBar
        initialFilters={filters}
        onApply={handleApplyFilters}
      />

      <main className='content'>
        <KPISection filters={filters} />

        <div className='dashboard-grid'>
          <TopFilmsChart filters={filters} />
          <RevenueCategoryChart filters={filters} />
        </div>

        <div
          className='bottom-grid'
          style={{ marginTop: "2rem" }}
        >
          <div className='table-col'>
            <CustomerTable filters={filters} />
          </div>
          <div className='feed-col'>
            <RecentTransactions filters={filters} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
