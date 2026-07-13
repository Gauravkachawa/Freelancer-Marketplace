const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {

    createProject,
    getAllProjects,
    getProjectById

} = require("../controllers/projectController");

router.get("/", getAllProjects);

router.get(

    "/:id",

    getProjectById

);

router.post(

    "/",

    protect,

    authorizeRoles("client"),

    createProject

);

module.exports = router;