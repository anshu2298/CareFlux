import db from "../db.js";

class FilmAnalyticsService {
  static async getTopRentedFilms({
    storeId,
    startDate,
    endDate,
  }) {
    let query = db("film")
      .select(
        "film.film_id as id",
        "film.title",
        db.raw("count(rental.rental_id) as rentalCount"),
      )
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
      .groupBy("film.film_id", "film.title")
      .orderBy("rentalCount", "desc")
      .limit(10);

    if (storeId) {
      query = query.where("inventory.store_id", storeId);
    }

    if (startDate) {
      query = query.where(
        "rental.rental_date",
        ">=",
        startDate,
      );
    }

    if (endDate) {
      query = query.where(
        "rental.rental_date",
        "<=",
        endDate,
      );
    }

    return await query;
  }
}

export default FilmAnalyticsService;
