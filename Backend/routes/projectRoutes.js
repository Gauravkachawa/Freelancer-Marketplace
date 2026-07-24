const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {

    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    completeProject

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

router.put(

    "/complete/:id",

    protect,

    authorizeRoles("client"),

    completeProject

);


module.exports = router;