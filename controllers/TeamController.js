const { objectCleaner } = require("../helpers/objectHelper")
const { Team } = require("../models/Team")

exports.TeamController = {
    async create(req, res)
    {
        const team = await Team.create({
            name: req.body.name,
            department: req.body.department
        })

        res.send(team)
    },

    async update(req, res)
    {

        const body = objectCleaner(req.body)

        const team = await Team.update(body, {where: {
            id: req.params.id
        }})

        res.send({message: "Team info updated successfully"})
    },


    async delete(req, res)
    {
        const team = await Team.destroy({
            where: {
                id: req.params.id
            }
        })

        res.send({message: "Team deleted successfully"})
    },

    async getTeam(req, res)
    {
        const team = Team.findByPk(req.params.id)
        res.send(team)
    }
}