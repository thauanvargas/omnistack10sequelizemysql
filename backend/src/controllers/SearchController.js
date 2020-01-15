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

    // const location = sequelize.literal(
    //   `ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)`
    // );

    // const devs = Dev.findAll({
    //   limit: 15,
    //   attributes: [
    //     [
    //       sequelize.fn(
    //         "ST_Distance_Sphere",
    //         sequelize.literal("location"),
    //         location
    //       ),
    //       "distance"
    //     ]
    //   ],
    //   where: {
    //     techs: {
    //       [Op.like]: `%${techs}%`
    //     }
    //   }
    // }).catch(err => {
    //   res.status(404).writeHead({
    //     message:
    //       err.message ||
    //       `Não foi encontrado nenhum Dev com a Tech '${techs.trim()}' .`
    //   });
    // });

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
      where: sequelize.where(distance, { [Op.lte]: 10000 }),
      limit: 10,
      logging: console.log
    });

    return res.json(devs);
  }
};
