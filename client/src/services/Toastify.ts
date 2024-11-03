import { Slide, toast } from "react-toastify";

const Toastify = (text: string) =>
	toast(text, {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Slide,
	});

export default Toastify;
