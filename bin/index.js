#! /usr/bin/env node
import config from "./config.js";
import wifiName from "wifi-name";
import { CSVDataGenerator, DateManager, parseName } from "./utils.js";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";
import fs from "node:fs/promises";

function main() {
	const arg = process.argv[2];

	switch (arg) {
		case undefined:
			checkWifi();
			break;
		case "-y":
			writeCSV(true);
			break;
		case "-n":
			writeCSV(false);
			break;
		default:
			break;
	}
}

async function checkWifi() {
	let name = await wifiName();

	if (parseName(name) === parseName(config["WIFI_NAME"])) {
		writeCSV(true);
	} else {
		promptUserAboutPresence();
	}
}

async function promptUserAboutPresence() {
	const rl = readline.createInterface({ input, output });
	const answer = (await rl.question("Você foi para a empresa hoje? (Y/N) \n")).toLowerCase();

	let success = false;

	if (answer === "y" || answer === "n") {
		await writeCSV(true);
		success = true;
	} else {
		console.error("\n==== Opção inválida ====\n");
		rl.close();
		promptUserAboutPresence();
	}

	if (success) {
		await rl.question("Registro atualizado. Pressione qualquer tecla para sair.");
		rl.close();
	}
}

async function writeCSV(onSite) {
	const date = new DateManager();
	const savePath = path.join(config["SAVE_PATH"]);
	const csvPath = path.join(savePath, `${date.longMonth()}-${date.year()}.csv`);

	try {
		let fileData;

		try {
			await fs.stat(csvPath);
			fileData = await fs.readFile(csvPath, "utf-8");
		} catch (err) {
			fileData = "";
		}

		let newData = {};
		newData[date.formattedDate()] = onSite ? "Sim" : "Não";

		//creates complete data to be written
		const completeData = new CSVDataGenerator(fileData, newData).generateCompleteData();

		await fs.writeFile(csvPath, completeData);
	} catch (err) {
		console.log("Não foi possível atualizar o registro", err);
	}
}

main();
