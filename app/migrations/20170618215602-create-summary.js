'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('summaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization: {
        type: Sequelize.STRING
      },
      division: {
        type: Sequelize.STRING
      },
      job_title: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      totals: {
        type: Sequelize.INTEGER
      },
      tengibles: {
        type: Sequelize.INTEGER
      },
      tengible_estates: {
        type: Sequelize.INTEGER
      },
      tengible_estate_amounts: {
        type: Sequelize.INTEGER
      },
      financials: {
        type: Sequelize.INTEGER
      },
      relations: {
        type: Sequelize.INTEGER
      },
      fluctuates: {
        type: Sequelize.INTEGER
      },
      year_of_investigating: {
        type: Sequelize.INTEGER
      },
      officer_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('summaries');
  }
};