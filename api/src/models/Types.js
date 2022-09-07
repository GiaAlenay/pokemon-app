const { DataTypes } = require('sequelize');
module.exports=(sequelize)=>{
    sequelize.define('type',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            validate:{
              notString(value){
                if(typeof value!=='number'){
                  throw new Error('Error, el id del type solo puede ser integer')
              }
              }
            }
      
          },
          name: {
            type: DataTypes.STRING(12),
            allowNull: false,
          }
    })
}
