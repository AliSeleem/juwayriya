import mongoose, { ConnectOptions } from "mongoose";

const clientOptions: ConnectOptions = {
	serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// database connection
const DBInit = () => {
	mongoose.connect(process.env.DB!, clientOptions).then(() => {
		console.log(`Database connected to : ${process.env.DB}`);
	});
};

export default DBInit;
