import React from "react";
import Card from "../Card/Card";
import "./RecentTransactions.css";

const transactions = [
  {
    id: 1,
    customer: "John Doe",
    film: "Matrix Reloaded",
    price: 2.99,
    date: "Jan 14, 2006",
    time: "10:32 AM",
  },
  {
    id: 2,
    customer: "Mary Smith",
    film: "Academy Dinosaur",
    price: 0.99,
    date: "Jan 14, 2006",
    time: "09:15 AM",
  },
  {
    id: 3,
    customer: "Robert Brown",
    film: "Inception",
    price: 4.99,
    date: "Jan 13, 2006",
    time: "04:45 PM",
  },
  {
    id: 4,
    customer: "Linda Williams",
    film: "Forward Temple",
    price: 2.99,
    date: "Jan 13, 2006",
    time: "02:20 PM",
  },
  {
    id: 5,
    customer: "Michael Miller",
    film: "Grit Clockwork",
    price: 3.99,
    date: "Jan 13, 2006",
    time: "11:10 AM",
  },
  {
    id: 6,
    customer: "Barbara Jones",
    rentals: 30,
    film: "Dark City",
    price: 1.99,
    date: "Jan 12, 2006",
    time: "08:50 PM",
  },
];

const RecentTransactions = ({ isLoading }) => {
  return (
    <Card>
      <div className='transactions-header'>
        <h3>Recent Transactions</h3>
      </div>
      <div
        className={`transactions-list ${
          isLoading ? "fade-updating" : ""
        }`}
      >
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className='transaction-item'
          >
            <div className='transaction-main'>
              <span className='tx-customer'>
                {tx.customer}
              </span>
              <span className='tx-action'> rented </span>
              <span className='tx-film'>{tx.film}</span>
              <span className='tx-action'> for </span>
              <span className='tx-price'>
                ${tx.price.toFixed(2)}
              </span>
            </div>
            <div className='transaction-meta'>
              {tx.date} – {tx.time}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
