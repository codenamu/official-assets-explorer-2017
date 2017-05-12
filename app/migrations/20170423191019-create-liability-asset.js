'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('liability_assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.INTEGER
      },
      relation: {
        type: Sequelize.INTEGER
      },
      type_of_property: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      previous_price: {
        type: Sequelize.INTEGER
      },
      increase_price: {
        type: Sequelize.INTEGER
      },
      increase_deal_price: {
        type: Sequelize.INTEGER
      },
      decrease_price: {
        type: Sequelize.INTEGER
      },
      decrease_deal_price: {
        type: Sequelize.INTEGER
      },
      present_price: {
        type: Sequelize.INTEGER
      },
      reason_for_change: {
        type: Sequelize.TEXT
      },
      year_of_investigating: {
        type: Sequelize.INTEGER
      },
      officer_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'officers',
          key: 'id',
          as: 'officer_id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('liability_assets');
  }
};