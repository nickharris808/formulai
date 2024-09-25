const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class TypeformSubmission extends Model {}

TypeformSubmission.init(
  {
    submission_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    genetic_data: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    survey_responses: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'TypeformSubmission',
    tableName: 'typeform_submissions',
    timestamps: false,
    indexes: [
      {
        fields: ['token'],
      },
      {
        fields: ['email'],
      },
    ],
  }
);

module.exports = TypeformSubmission;