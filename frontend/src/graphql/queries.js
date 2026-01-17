import { gql } from "@apollo/client";

export const GET_TOP_RENTED_FILMS = gql`
  query GetTopRentedFilms(
    $storeId: Int
    $startDate: String
    $endDate: String
  ) {
    getTopRentedFilms(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      title
      rentalCount
    }
  }
`;

export const GET_REVENUE_BY_CATEGORY = gql`
  query GetRevenueByCategory(
    $storeId: Int
    $startDate: String
    $endDate: String
  ) {
    getRevenueByCategory(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      name
      revenue
    }
  }
`;

export const GET_TOP_CUSTOMERS = gql`
  query GetTopCustomers(
    $storeId: Int
    $startDate: String
    $endDate: String
  ) {
    getTopCustomers(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      fullName
      totalRentals
      totalSpent
    }
  }
`;

export const GET_KEY_METRICS = gql`
  query GetKeyMetrics(
    $storeId: Int
    $startDate: String
    $endDate: String
  ) {
    getKeyMetrics(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
    ) {
      totalRevenue
      activeRentals
    }
  }
`;

export const GET_RECENT_TRANSACTIONS = gql`
  query GetRecentTransactions(
    $storeId: Int
    $startDate: String
    $endDate: String
    $limit: Int
  ) {
    getRecentTransactions(
      storeId: $storeId
      startDate: $startDate
      endDate: $endDate
      limit: $limit
    ) {
      customerName
      filmTitle
      amount
      timestamp
    }
  }
`;
