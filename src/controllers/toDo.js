const { HttpError } = require('http-errors');
const httpStatusCodes = require('http-status-codes');

const toDoServices = require('../services/toDoServices');

/**
 * Search todos : If a query q is present, a case-insensitive search is made on database.
 * Else all the rows are returned.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const search = async (req, res, next) => {
  const searchQuery = req.query['q'];

  try {
    const toDos = await toDoServices.getToDos(searchQuery);

    if (!toDos) {
      throw new HttpError('Unable to fetch database');
    }

    res.json({ success: true, data: toDos });
  } catch (err) {
    next(err);
  }
};

/**
 * Add todo.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const add = async (req, res, next) => {
  try {
    const result = await toDoServices.addToDo(req.body);

    if (!result) {
      throw new HttpError('Unable to insert into database');
    }

    res.status(httpStatusCodes.CREATED).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const row = await toDoServices.readToDo(req.params);

    res.json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const result = await toDoServices.deleteToDo(req.params);

    if (!result) {
      throw new HttpError('Unable to delete from database');
    }

    res.status(httpStatusCodes.NO_CONTENT).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await toDoServices.updateToDo({ ...req.params, ...req.body });

    if (!result) {
      throw new HttpError('Unable to update the row');
    }

    res.status(httpStatusCodes.CREATED).json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
  del,
  read,
  search,
  update,
};
