import { Router } from "express";
import { allowedTo, protectRoutes } from "../controllers/Auth";
import {
	deleteBill,
	getBills,
	makeBill,
	setBillAsPaid,
} from "../controllers/Bill";
import {
	deleteBillValidator,
	makeBillValidator,
	setBillAsPaidValidator,
} from "../validators/Bill";

const Bill = Router();

Bill.use(protectRoutes, allowedTo("admin"));

Bill.get("/", getBills);

Bill.post("/", makeBillValidator, makeBill);

Bill.delete("/:id", deleteBillValidator, deleteBill);

Bill.patch("/:id", setBillAsPaidValidator, setBillAsPaid);

export default Bill;
