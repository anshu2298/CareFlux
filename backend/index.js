import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import FilmAnalyticsService from "./services/FilmAnalyticsService.js";
import RevenueService from "./services/RevenueService.js";
import CustomerAnalyticsService from "./services/CustomerAnalyticsService.js";
import dotenv from "dotenv";

dotenv.config();

const typeDefs = `#graphql
  type FilmStats {
    id: ID!
    title: String!
    rentalCount: Int!
  }

  type CategoryRevenue {
    name: String!
    revenue: Float!
  }

  type CustomerStats {
    id: ID!
    fullName: String!
    totalRentals: Int!
    totalSpent: Float!
  }

  type KeyMetrics {
    totalRevenue: Float!
    activeRentals: Int!
  }

  type Transaction {
    customerName: String!
    filmTitle: String!
    amount: Float!
    timestamp: String!
  }

  type Query {
    getTopRentedFilms(storeId: Int, startDate: String, endDate: String): [FilmStats]
    getRevenueByCategory(storeId: Int, startDate: String, endDate: String): [CategoryRevenue]
    getTopCustomers(storeId: Int, startDate: String, endDate: String): [CustomerStats]
    getKeyMetrics(storeId: Int, startDate: String, endDate: String): KeyMetrics
    getRecentTransactions(storeId: Int, startDate: String, endDate: String, limit: Int): [Transaction]
  }
`;

const resolvers = {
  Query: {
    getTopRentedFilms: (_, args) =>
      FilmAnalyticsService.getTopRentedFilms(args),
    getRevenueByCategory: (_, args) =>
      RevenueService.getRevenueByCategory(args),
    getTopCustomers: (_, args) =>
      CustomerAnalyticsService.getTopCustomers(args),
    getKeyMetrics: (_, args) =>
      RevenueService.getKeyMetrics(args),
    getRecentTransactions: (_, args) =>
      CustomerAnalyticsService.getRecentTransactions(args),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 5000 },
});

console.log(`🚀 Server ready at ${url}`);
