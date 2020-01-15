module.exports = (sequelize, Sequelize) => {
  const Dev = sequelize.define("Dev", {
    name: {
      type: Sequelize.STRING
    },
    github_username: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    avatar_url: {
      type: Sequelize.STRING
    },
    techs: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.GEOMETRY("POINT", 6371)
    }
  });

  return Dev;
};
