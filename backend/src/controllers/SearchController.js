const axios = require("axios");
const db = require("../../app/models");
const Dev = db.dev;
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    // const techsArray = parseStringAsArray(techs);

    const location = sequelize.literal(
      `ST_GeomFromText('POINT(${longitude} ${latitude})')`
    );
    const distance = sequelize.fn(
      "ST_Distance_Sphere",
      sequelize.col("location"),
      location
    );

    const devs = await Dev.findAll({
      order: distance,
      where: {
        [Op.and]: [
          sequelize.where(distance, {
            [Op.lte]: 10000
            // [Op.and]: [sequelize.where({ techs: { [Op.like]: techsArray } })]
          }),
          { techs: { [Op.like]: "%" + techs + "%" } }
          //   {
          //     [Op.and]:
          //   }
        ]
      },

      //   sequelize.where(distance, {
      //     [Op.lte]: 10000
      //     // [Op.and]: [sequelize.where({ techs: { [Op.like]: techsArray } })]
      //   }),
      limit: 10,
      logging: console.log
    });

    console.log(devs);

    return res.json(devs);
  }
};
