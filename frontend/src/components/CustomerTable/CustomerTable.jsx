import React, { useState } from "react";
import Card from "../Card/Card";
import "./CustomerTable.css";

const initialData = [
  { id: 1, name: "MARY SMITH", rentals: 32, spent: 118.68 },
  {
    id: 2,
    name: "PATRICIA JOHNSON",
    rentals: 28,
    spent: 128.72,
  },
  {
    id: 3,
    name: "LINDA WILLIAMS",
    rentals: 33,
    spent: 135.67,
  },
  {
    id: 4,
    name: "BARBARA JONES",
    rentals: 30,
    spent: 140.3,
  },
  {
    id: 5,
    name: "ELIZABETH BROWN",
    rentals: 27,
    spent: 105.73,
  },
  {
    id: 6,
    name: "JENNIFER DAVIS",
    rentals: 31,
    spent: 115.69,
  },
  {
    id: 7,
    name: "MARIA GARCIA",
    rentals: 29,
    spent: 120.71,
  },
  {
    id: 8,
    name: "SUSAN WILSON",
    rentals: 35,
    spent: 155.65,
  },
  {
    id: 9,
    name: "MARGARET MOORE",
    rentals: 30,
    spent: 110.7,
  },
  {
    id: 10,
    name: "DOROTHY TAYLOR",
    rentals: 26,
    spent: 100.74,
  },
];

const CustomerTable = ({ isLoading }) => {
  const [data, setData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    const sortedData = [...data].sort((a, b) => {
      return newOrder === "desc"
        ? b.spent - a.spent
        : a.spent - b.spent;
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
        >
          Sort by Spent {sortOrder === "desc" ? "↓" : "↑"}
        </button>
      </div>
      <div
        className={`table-container ${
          isLoading ? "fade-updating" : ""
        }`}
      >
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
                  {customer.name}
                </td>
                <td>{customer.rentals}</td>
                <td className='spent-cell'>
                  ${customer.spent.toFixed(2)}
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
