const axios = require("axios");
const db = require("../../app/models");
const Dev = db.dev;
const parseStringAsArray = require("../utils/parseStringAsArray");
const Op = db.sequelize.Op;

module.exports = {
  async index(req, res) {
    const devs = await Dev.findAll();

    return res.json(devs);
  },

  async store(req, res) {
    const {
      github_username,
      techs,
      latitude = parseFloat(latitude),
      longitude = parseFloat(longitude)
    } = req.body;

    let developer = await Dev.findOne({ where: { github_username } });

    if (!developer) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      // no need to parse as array
      //   const techsArray = parseStringAsArray(techs);

      const location = { type: "Point", coordinates: [longitude, latitude] };

      developer = {
        name,
        github_username,
        avatar_url,
        bio,
        techs: techs.trim(),
        location
      };

      await Dev.create(developer)
        .then(data => {
          console.table(`Dev Created - ${data.github_username}`);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Ocorreu um erro a criar o Dev."
          });
        });
    }

    return res.json(developer);
  }
};
