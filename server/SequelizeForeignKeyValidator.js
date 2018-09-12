'use strict';

/**
 * The argument 'value' is considered valid, if and only if it is among the
 * identifiers (argument 'referencedPrimaryKey') in the referenced table
 * (argument 'referencedSequelizeModel'). An undefined or null argument 'value'
 * is also considered valid!
 *
 * @param {string} value - The value to be validated
 * @param {object} referencedSequelizeModel - The Sequelize model instance of
 * the referenced table.
 * @param {string} referencedPrimaryKey - The name of the column implementing
 * the PRIMARY KEY of the referenced table.
 *
 * @returns {boolean} true, if and only if the argument value is valid. Throws
 * an error otherwise.
 */
module.exports = async function(value, referencedSequelizeModel,
  referencedPrimaryKey) {
  if (value === undefined || value === null || value === '')
    return true
  if (referencedPrimaryKey === undefined)
    referencedPrimaryKey = 'id'
  let q = {}
  q[referencedPrimaryKey] = value
  let records = await referencedSequelizeModel.find({
    where: q
  })
  if (records === null || records.length === 0)
    throw new Error(
      `Unmatched associated record: ${value} is not among the primary keys (${referencedPrimaryKey}) of ${referencedSequelizeModel.name}`
    )
  // else
  return true
}
