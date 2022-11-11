const { Op } = require("sequelize");
const { objectCleaner } = require("../helpers/objectHelper");
const { Project } = require("../models/Project");

exports.ProjectController = {
  async create(req, res) {
    const project = await Project.create({
      name: req.body.name, 
    });

    res.send(project);
  },

  async update(req, res) {
    const body = objectCleaner(req.body);

    const project = await Project.update(body, {
      where: {
        id: req.params.id,
      },
    });

    res.send({ message: "Project info updated successfully" });
  },

  async delete(req, res) {
    const project = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send({ message: "Project deleted successfully" });
  },

  async getProjectById(req, res) {
    const project = await Project.findByPk(req.params.id);
    res.send(project);
  },

  async getProjectsByTeam(req, res) {
    const projects = await Project.findAll({
      where: {
        teamId: req.params.team_id,
      },
    });
    res.send(projects);
  },

  async getAllProjects(req, res)
  {
        res.send(await Project.findAll())
  },

  async searchProject(req, res) {
    // const projects = await Project.findAll({
    //   where: {
    //     [Op.and]: [
    //       {
    //         teamId: req.params.team_id,
    //         name: {
    //           [Op.like]: `%${req.query.search}%`,
    //         },
    //       },
    //     ],
    //   },
    // });

    const projects = await Project.findAll({
      where: {
        name: {
            [Op.like]: `%${req.query.name}%`,
          },
      },
    });
    
    res.send(projects);
  },
};
