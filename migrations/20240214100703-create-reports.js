'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'users',
          key: 'id'
        }
      },
      incomeId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'incomes',
          key: 'id'
        }
      },
      outcomeId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'outcomes',
          key: 'id'
        }
      },
      transferId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'transfers',
          key: 'id'
        }
      },
      reportDate: {
        type: Sequelize.DATE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reports');
  }
};