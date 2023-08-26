module.exports = (sequelize, DataTypes) => {
    const EndUser = sequelize.define('EndUser', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    // Define associations here
    EndUser.associate = models => {
      EndUser.hasMany(models.Conversation);
    };
  
    return EndUser;
  };
  