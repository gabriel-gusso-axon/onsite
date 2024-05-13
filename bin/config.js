import path from "node:path";
const config = {
	WIFI_NAME: "Axon",
	SAVE_PATH: path.join(process.env.USERPROFILE, "Documents/onsite"),
};

//SAVE_PATH is the path to the folder in which you want to save the files

export default config;
