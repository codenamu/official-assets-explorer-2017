'use strict';
module.exports = (sequelize, DataTypes) => {
  const officer = sequelize.define('officer', {
    organization: DataTypes.STRING,
    division: DataTypes.STRING,
    job_title: DataTypes.STRING,
    name: DataTypes.STRING,
    year_of_investigating: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        officer.hasMany(models.tengible_asset, {
          foreignKey: 'officer_id',
        });
        officer.hasMany(models.tengible_estate_asset, {
          foreignKey: 'officer_id',
        });
        officer.hasMany(models.political_asset, {
          foreignKey: 'officer_id',
        });
        officer.hasMany(models.financial_asset, {
          foreignKey: 'officer_id',
        });
        officer.hasMany(models.liability_asset, {
          foreignKey: 'officer_id',
        });
        officer.hasMany(models.summary, {
          foreignKey: 'officer_id',
        });
      }
    }
  });
  return officer;
};