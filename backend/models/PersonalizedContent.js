const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class PersonalizedContent extends Model {}

PersonalizedContent.init(
  {
    content_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blog_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content_type: {
      type: DataTypes.ENUM('product', 'blog'),
      allowNull: false,
    },
    personalized_benefits: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    personalized_side_effects: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 10,
      },
    },
    generated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'PersonalizedContent',
    tableName: 'personalized_contents',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'product_id'],
        where: {
          product_id: {
            [sequelize.Op.ne]: null,
          },
        },
      },
      {
        unique: true,
        fields: ['user_id', 'blog_id'],
        where: {
          blog_id: {
            [sequelize.Op.ne]: null,
          },
        },
      },
    ],
  }
);

module.exports = PersonalizedContent;