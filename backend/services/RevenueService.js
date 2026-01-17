import db from "../db.js";

class RevenueService {
  static async getRevenueByCategory({
    storeId,
    startDate,
    endDate,
  }) {
    let query = db("category")
      .select(
        "category.name",
        db.raw("sum(payment.amount) as revenue"),
      )
      .join(
        "film_category",
        "category.category_id",
        "film_category.category_id",
      )
      .join("film", "film_category.film_id", "film.film_id")
      .join(
        "inventory",
        "film.film_id",
        "inventory.film_id",
      )
      .join(
        "rental",
        "inventory.inventory_id",
        "rental.inventory_id",
      )
      .join(
        "payment",
        "rental.rental_id",
        "payment.rental_id",
      )
      .groupBy("category.name");

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

  static async getKeyMetrics({
    storeId,
    startDate,
    endDate,
  }) {
    // Total Revenue
    let revenueQuery = db("payment").sum(
      "amount as totalRevenue",
    );

    // Active Rentals Count (where return_date is null)
    let activeRentalsQuery = db("rental")
      .count("rental_id as activeRentals")
      .whereNull("return_date");

    if (storeId) {
      revenueQuery = revenueQuery
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
        .where("inventory.store_id", storeId);

      activeRentalsQuery = activeRentalsQuery
        .join(
          "inventory",
          "rental.inventory_id",
          "inventory.inventory_id",
        )
        .where("inventory.store_id", storeId);
    }

    if (startDate) {
      revenueQuery = revenueQuery.where(
        "payment.payment_date",
        ">=",
        startDate,
      );
      activeRentalsQuery = activeRentalsQuery.where(
        "rental.rental_date",
        ">=",
        startDate,
      );
    }

    if (endDate) {
      revenueQuery = revenueQuery.where(
        "payment.payment_date",
        "<=",
        endDate,
      );
      activeRentalsQuery = activeRentalsQuery.where(
        "rental.rental_date",
        "<=",
        endDate,
      );
    }

    const [revenueRes] = await revenueQuery;
    const [activeRes] = await activeRentalsQuery;

    return {
      totalRevenue: revenueRes.totalRevenue || 0,
      activeRentals: activeRes.activeRentals || 0,
    };
  }
}

export default RevenueService;
