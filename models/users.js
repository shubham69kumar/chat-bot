module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    // Define associations here
    User.associate = models => {
      User.hasMany(models.Chatbot);
    };
  
    return User;
  };
  