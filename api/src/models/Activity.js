const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,     
      unique: true, 
    },
    difficulty:{
      type: DataTypes.ENUM('1', '2', '3', '4', '5')
    },
    duration:{
        type: DataTypes.STRING,
        validate:{
          min: 30,
          max: 180,
        }
    },
    season:{
        type: DataTypes.ENUM('Summer', 'Autumn', 'Spring', 'Winter')
    },    
  },
  {timestamps:false,
    freezeTableName: true,
  }
  );
};