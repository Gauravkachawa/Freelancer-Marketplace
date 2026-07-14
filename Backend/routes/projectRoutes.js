const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {

    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject

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

router.put(

    "/:id",

    protect,

    authorizeRoles("client"),

    updateProject

);

router.delete(

    "/:id",

    protect,

    authorizeRoles("client"),

    deleteProject

);


module.exports = router;