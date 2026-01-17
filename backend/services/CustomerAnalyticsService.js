import db from "../db.js";

class CustomerAnalyticsService {
  static async getTopCustomers({
    storeId,
    startDate,
    endDate,
  }) {
    let query = db("customer")
      .select(
        "customer.customer_id as id",
        db.raw(
          "concat(customer.first_name, ' ', customer.last_name) as fullName",
        ),
        db.raw("count(rental.rental_id) as totalRentals"),
        db.raw("sum(payment.amount) as totalSpent"),
      )
      .join(
        "rental",
        "customer.customer_id",
        "rental.customer_id",
      )
      .join(
        "payment",
        "rental.rental_id",
        "payment.rental_id",
      )
      .groupBy(
        "customer.customer_id",
        "customer.first_name",
        "customer.last_name",
      )
      .orderBy("totalSpent", "desc")
      .limit(10);

    if (storeId) {
      query = query.where("customer.store_id", storeId);
    }

    if (startDate) {
      query = query.where(
        "payment.payment_date",
        ">=",
        startDate,
      );
    }

    if (endDate) {
      query = query.where(
        "payment.payment_date",
        "<=",
        endDate,
      );
    }

    return await query;
  }

  static async getRecentTransactions({
    storeId,
    startDate,
    endDate,
    limit = 10,
  }) {
    let query = db("payment")
      .select(
        db.raw(
          "concat(customer.first_name, ' ', customer.last_name) as customerName",
        ),
        "film.title as filmTitle",
        "payment.amount",
        "payment.payment_date as timestamp",
      )
      .join(
        "customer",
        "payment.customer_id",
        "customer.customer_id",
      )
      .join(
        "rental",
        "payment.rental_id",
        "rental.rental_id",
      )
      .join(
        "inventory",
        "rental.inventory_id",
        "inventory.inventory_id",
      )
      .join("film", "inventory.film_id", "film.film_id")
      .orderBy("payment.payment_date", "desc")
      .limit(limit);

    if (storeId) {
      query = query.where("inventory.store_id", storeId);
    }

    if (startDate) {
      query = query.where(
        "payment.payment_date",
        ">=",
        startDate,
      );
    }

    if (endDate) {
      query = query.where(
        "payment.payment_date",
        "<=",
        endDate,
      );
    }

    return await query;
  }
}

export default CustomerAnalyticsService;
