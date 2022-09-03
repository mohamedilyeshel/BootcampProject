const ErrorHandler = require("../utils/errorHandClass.utils");

module.exports = (model) => {
  return async (req, res, next) => {
    let querySelect = req.query.select
      ? req.query.select.split(",").join(" ")
      : "";
    let querySort = req.query.sort ? req.query.sort.split(",").join(" ") : "";
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 25;
    let skip = (page - 1) * limit;
    let nextDocs = page * limit;

    let pagination = {};
    let totalDocs = await model.countDocuments(req.query);
    let totalPages = Math.ceil(totalDocs / limit);

    if (totalPages < page) {
      return next(new ErrorHandler("No results in this page", 404));
    }

    if (nextDocs < totalDocs) {
      pagination.next = {
        page: page + 1,
        totalPages,
        limit: limit,
      };
    }

    if (skip > 0) {
      pagination.prev = {
        page: page - 1,
        totalPages,
        limit: limit,
      };
    }

    pagination.currentPage = page;

    req.pagination = pagination;
    req.limit = limit;
    req.skip = skip;
    req.querySelect = querySelect;
    req.querySort = querySort;

    next();
  };
};
