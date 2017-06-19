'use strict';
module.exports = function(sequelize, DataTypes) {
  var summary = sequelize.define('summary', {
    organization: DataTypes.STRING,
    division: DataTypes.STRING,
    job_title: DataTypes.STRING,
    name: DataTypes.STRING,
    totals: DataTypes.INTEGER,
    tengibles: DataTypes.INTEGER,
    tengible_estates: DataTypes.INTEGER,
    tengible_estate_amounts: DataTypes.INTEGER,
    financials: DataTypes.INTEGER,
    relations: DataTypes.INTEGER,
    fluctuates: DataTypes.INTEGER,
    year_of_investigating: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
         summary.belongsTo(models.officer, {
          foreignKey: 'officer_id',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return summary;
};