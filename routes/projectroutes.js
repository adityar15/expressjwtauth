const { ProjectController } = require("../controllers/ProjectController")
const { projectValidator } = require("../validators/projectValidator")

const router = require("express").Router()


router.post("/", projectValidator, ProjectController.create)
router.get("/", ProjectController.getAllProjects)
router.get("/search", ProjectController.searchProject)
router.get("/by_team/:team_id", ProjectController.getProjectsByTeam)
router.put("/:id", ProjectController.update)
router.delete("/:id", ProjectController.delete)
router.get("/:id", ProjectController.getProjectById)

module.exports = router