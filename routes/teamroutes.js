const { TeamController } = require("../controllers/TeamController")
const { teamValidator } = require("../validators/teamValidator")

const router = require("express").Router()

router.post("/", teamValidator, TeamController.create)
router.put("/:id", TeamController.update)
router.delete("/:id", TeamController.delete)
router.get("/:id", TeamController.getTeam)

module.exports = router