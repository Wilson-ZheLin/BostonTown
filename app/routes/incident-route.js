import express from 'express';
import * as incidentController from "../controllers/incident-controller.js";

const router = express.Router();

router.route("/")
    .get(incidentController.find)
    .put(incidentController.updateUserDetails)
    .post(incidentController.post)
    .delete(incidentController.remove);

export default router;