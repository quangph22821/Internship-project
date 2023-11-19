import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { cancelBill, checkBill, getAllConfirmedBills, getAllDeliveredBills, getAllDeliveringBills, getBills, getOneBill, updateBillStatus } from "../controllers/bill";

const router = express.Router();

// GET ALL BILL
router.get("/bill", getBills);
// GET ONE BILL USER
router.get("/bill/user", authenticate, getOneBill);
// CHECK BILL USER
router.post("/bill/user/add", authenticate, checkBill);
// UPDATE STATUS BILL
router.put("/bill/update/status/:id", updateBillStatus);
// HUỶ ĐƠN HÀNG
router.delete("/bill/cancel/status/:id", authenticate, cancelBill);
// All Confirmed
router.get("/bill/user/confirmed", authenticate, getAllConfirmedBills);
// All Delivering
router.get("/bill/user/delivering", authenticate, getAllDeliveringBills);
// All Delivered
router.get("/bill/user/delivered", authenticate, getAllDeliveredBills);

export default router;