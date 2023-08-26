module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.TEXT,
      },
    });
  
    // Define associations here
    Conversation.associate = models => {
      Conversation.belongsTo(models.Chatbot, {
        foreignKey: {
          allowNull: false,
        },
      });
      Conversation.belongsTo(models.EndUser, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    return Conversation;
  };
  