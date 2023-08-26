module.exports = (sequelize, DataTypes) => {
    const Chatbot = sequelize.define('Chatbot', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    });
  
    // Define associations here
    Chatbot.associate = models => {
      Chatbot.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      Chatbot.hasMany(models.Conversation);
    };
  
    return Chatbot;
  };
  