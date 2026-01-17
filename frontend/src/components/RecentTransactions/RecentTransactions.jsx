import { useQuery } from "@apollo/client";
import Card from "../Card/Card";
import { GET_RECENT_TRANSACTIONS } from "../../graphql/queries";
import "./RecentTransactions.css";

const RecentTransactions = ({ filters }) => {
  const { data, loading, error } = useQuery(
    GET_RECENT_TRANSACTIONS,
    {
      variables: {
        storeId:
          filters.store === "all"
            ? null
            : parseInt(filters.store),
        startDate: filters.startDate,
        endDate: filters.endDate,
        limit: 10,
      },
    },
  );

  const transactions = data?.getRecentTransactions || [];

  const formatDateTime = (timestamp) => {
    const dateObj = new Date(timestamp);
    return {
      date: dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <Card>
      <div className='transactions-header'>
        <h3>Recent Transactions</h3>
      </div>
      <div
        className={`transactions-list ${
          loading ? "fade-updating" : ""
        }`}
      >
        {error && (
          <div className='error'>
            Error loading transactions
          </div>
        )}
        {transactions.map((tx, idx) => {
          const { date, time } = formatDateTime(
            tx.timestamp,
          );
          return (
            <div
              key={idx}
              className='transaction-item'
            >
              <div className='transaction-main'>
                <span className='tx-customer'>
                  {tx.customerName}
                </span>
                <span className='tx-action'> rented </span>
                <span className='tx-film'>
                  {tx.filmTitle}
                </span>
                <span className='tx-action'> for </span>
                <span className='tx-price'>
                  ${tx.amount.toFixed(2)}
                </span>
              </div>
              <div className='transaction-meta'>
                {date} – {time}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecentTransactions;
