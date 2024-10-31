// import { Request } from "express";
// import multer from "multer";
// import ApiError from "../utils/ApiError";
// import { ImageFields } from "../interfaces/uploadFields";

// const uploadOptions = (): multer.Multer => {
// 	const multerStorage: multer.StorageEngine = multer.memoryStorage();

// 	const multerFilter = function (
// 		req: Request,
// 		file: Express.Multer.File,
// 		cb: multer.FileFilterCallback
// 	) {
// 		if (file.mimetype.startsWith("image")) {
// 			cb(null, true);
// 		} else {
// 			cb(new ApiError("file Not an image", 400));
// 		}
// 	};

// 	const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
// 	return upload;
// };

// export const uploadSingleImage = (fieldName: string) =>
// 	uploadOptions().single(fieldName);
// export const uploadMultiImages = (fields: ImageFields[]) =>
// 	uploadOptions().fields(fields);
