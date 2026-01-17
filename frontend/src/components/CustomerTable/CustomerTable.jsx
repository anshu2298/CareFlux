import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Card from "../Card/Card";
import { GET_TOP_CUSTOMERS } from "../../graphql/queries";
import "./CustomerTable.css";

const CustomerTable = ({ filters }) => {
  const {
    data: apiData,
    loading,
    error,
  } = useQuery(GET_TOP_CUSTOMERS, {
    variables: {
      storeId:
        filters.store === "all"
          ? null
          : parseInt(filters.store),
      startDate: filters.startDate,
      endDate: filters.endDate,
    },
  });

  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (apiData?.getTopCustomers) {
      const customers = [...apiData.getTopCustomers].sort(
        (a, b) => b.totalSpent - a.totalSpent,
      );
      setData(customers);
      setSortOrder("desc");
    }
  }, [apiData]);

  const handleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    const sortedData = [...data].sort((a, b) => {
      return newOrder === "desc"
        ? b.totalSpent - a.totalSpent
        : a.totalSpent - b.totalSpent;
    });
    setData(sortedData);
    setSortOrder(newOrder);
  };

  return (
    <Card>
      <div className='table-header-section'>
        <h3>Top Customers</h3>
        <button
          className='sort-btn'
          onClick={handleSort}
          disabled={loading}
        >
          Sort by Spent {sortOrder === "desc" ? "↓" : "↑"}
        </button>
      </div>
      <div
        className={`table-container ${
          loading ? "fade-updating" : ""
        }`}
      >
        {error && (
          <div className='error'>
            Error loading customers
          </div>
        )}
        <table className='customer-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Rentals</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td className='customer-name'>
                  {customer.fullName}
                </td>
                <td>{customer.totalRentals}</td>
                <td className='spent-cell'>
                  ${customer.totalSpent.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CustomerTable;
