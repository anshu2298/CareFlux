import { useState, useEffect } from "react";
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

  const [isLoading, setIsLoading] = useState(false);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Simulate data update when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // Simulate network delay

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className='App'>
      <FilterBar
        initialFilters={filters}
        onApply={handleApplyFilters}
      />

      <main className='content'>
        {isLoading && (
          <div className='loading-overlay'>
            <div className='spinner'></div>
            <span>Updating Data...</span>
          </div>
        )}

        <KPISection isLoading={isLoading} />

        <div
          className='dashboard-grid'
          style={{
            opacity: isLoading ? 0.5 : 1,
            transition: "opacity 0.3s",
          }}
        >
          <TopFilmsChart />
          <RevenueCategoryChart />
        </div>

        <div
          className='bottom-grid'
          style={{
            opacity: isLoading ? 0.5 : 1,
            transition: "opacity 0.3s",
            marginTop: "2rem",
          }}
        >
          <div className='table-col'>
            <CustomerTable isLoading={isLoading} />
          </div>
          <div className='feed-col'>
            <RecentTransactions isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
