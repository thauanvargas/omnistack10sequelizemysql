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
          console.log(`Dev Created - ${data.github_username}`);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Ocorreu um erro a criar o Dev."
          });
        });
    }
    return res.json(developer);
  },

  async destroy(req, res) {
    const { github_username } = req.params;

    // console.log(github_username);

    await Dev.destroy({
      where: {
        github_username: github_username
      }
    })
      .then(data => {
        console.log(`DEV DELETED - ${github_username}`);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Ocorreu um erro apagando o Dev."
        });
      });

    return res.json({ dev: "Apagou" });
  },

  async update(req, res) {
    //name, avatar, bio, a localização e as tecnologias

    const { github_username } = req.params;

    let { name, avatar_url, bio, latitude, longitude } = req.body;

    latitude ? (latitude = parseFloat(latitude)) : null;
    longitude ? (latitude = parseFloat(longitude)) : null;

    await Dev.update(
      { name, avatar_url, bio, latitude, longitude },
      {
        where: {
          github_username
        }
      }
    ).then(data => {
      console.log(`DEV ALTERADO - ${data.github_username}`);
    });

    return res.json({ dev: "Alterou" });
  }
};
