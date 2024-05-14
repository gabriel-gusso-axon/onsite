function parseName(name) {
	return name.trim().toLowerCase().replace(" ", "_");
}

class CSVDataGenerator {
	_oldData = "";
	_daysPresenceRelation = {};
	_dataToAdd = "";
	_completeData = "";

	constructor(csvData, dataToAdd) {
		this._oldData = csvData;
		this._dataToAdd = dataToAdd;
		this._daysPresenceRelation = this._createDaysPresenceRelation();
	}

	_createDaysPresenceRelation() {
		const obj = {};

		if (this._oldData) {
			const splitted = this._oldData.split("\n");
			for (let i = 1; i < splitted.length - 1; i++) {
				const row = splitted[i].split(",");
				obj[row[0]] = row[1];
			}
		}

		Object.assign(obj, this._dataToAdd);

		return obj;
	}

	_getTotalPresence() {
		let total = 0;
		for (const d in this._daysPresenceRelation) {
			if (this._daysPresenceRelation[d] === "Sim") {
				total++;
			}
		}

		return total;
	}

	generateCompleteData() {
		let data = "Data,Presente";
		let total = 0;

		for (const d in this._daysPresenceRelation) {
			data += `\n${d},${this._daysPresenceRelation[d]}`;

			if (this._daysPresenceRelation[d] === "Sim") {
				total++;
			}
		}

		data += `\nTotal: ${total}`;

		return data;
	}
}
class DateManager {
	today;
	constructor() {
		this.today = new Date();
	}

	longMonth() {
		return Intl.DateTimeFormat("pt-BR", { month: "long" }).format(this.today);
	}

	formattedDate() {
		return Intl.DateTimeFormat("pt-BR").format(this.today);
	}

	month() {
		return this.today.getMonth();
	}

	year() {
		return this.today.getFullYear();
	}
}

export { parseName, DateManager, CSVDataGenerator };
