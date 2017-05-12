'use strict';
module.exports = function(sequelize, DataTypes) {
  var political_asset = sequelize.define('political_asset', {
    category: DataTypes.INTEGER,
    relation: DataTypes.INTEGER,
    type_of_property: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    previous_price: DataTypes.INTEGER,
    increase_price: DataTypes.INTEGER,
    increase_deal_price: DataTypes.INTEGER,
    decrease_price: DataTypes.INTEGER,
    decrease_deal_price: DataTypes.INTEGER,
    present_price: DataTypes.INTEGER,
    reason_for_change: DataTypes.TEXT,
    year_of_investigating: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        political_asset.belongsTo(models.officer, {
          foreignKey: 'officer_id',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return political_asset;
};