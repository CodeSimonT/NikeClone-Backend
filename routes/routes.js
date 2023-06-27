import express from "express";
const router = express.Router();
// men controller import
import {
  getAllAddidasMen,
  getSingleAddidasMen,
  getAllNewbalanceMen,
  getSingleNewbalanceMen,
  getAllNikeMen,
  getSingleNikeMen,
  getAllUnderArmourMen,
  getSingleUnderArmourMen,
} from "../controllers/allMenShoes.js";
// women controller import
import {
  getAllAddidasWomen,
  getSingleAddidasWomen,
  getAllNewbalanceWomen,
  getSingleNewbalanceWomen,
  getAllNikeWomen,
  getSingleNikeWomen,
  getAllUnderArmourWomen,
  getSingleUnderArmourWomen,
} from "../controllers/allWomenShoes.js";
// all shoes import
import { getAllShoes, getSingleShoes } from "../controllers/allShoes.js";

// routes for men
router.get("/getAllAddidasMen", getAllAddidasMen);
router.get("/getSingleAddidasMen/:id", getSingleAddidasMen);
router.get("/getAllNewbalanceMen", getAllNewbalanceMen);
router.get("/getSingleNewbalanceMen/:id", getSingleNewbalanceMen);
router.get("/getAllNikeMen", getAllNikeMen);
router.get("/getSingleNikeMen/:id", getSingleNikeMen);
router.get("/getAllUnderArmourMen", getAllUnderArmourMen);
router.get("/getSingleUnderArmourMen/:id", getSingleUnderArmourMen);

// routes for women
router.get("/getAllAddidasWomen", getAllAddidasWomen);
router.get("/getSingleAddidasWomen/:id", getSingleAddidasWomen);
router.get("/getAllNewbalanceWomen", getAllNewbalanceWomen);
router.get("/getSingleNewbalanceWomen/:id", getSingleNewbalanceWomen);
router.get("/getAllNikeWomen", getAllNikeWomen);
router.get("/getSingleNikeWomen/:id", getSingleNikeWomen);
router.get("/getAllUnderArmourWomen", getAllUnderArmourWomen);
router.get("/getSingleUnderArmourWomen/:id", getSingleUnderArmourWomen);

// routes for all shoes
router.get("/getAllShoes", getAllShoes);
router.get("/getSingleShoes/:id", getSingleShoes);
// import { signup, signin } from "../controllers/controller.js";

// route.post("/signup", signup);
// route.post("/signin", signin);

// router.route("/api").get(getAllItem).post(createitem);

export default router;
