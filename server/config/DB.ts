import mongoose from "mongoose";

// database connection
const DBInit = () => {
	mongoose.connect(process.env.DB!).then(() => {
		console.log(`Database connected to : ${process.env.DB}`);
	});
};

export default DBInit;
