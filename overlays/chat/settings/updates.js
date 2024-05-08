const properOverlayNames = {
	"spotify": "Spotify Now Playing Overlay",
	"settings": "Settings Panel",
	"chat": "Twitch Chat Overlay",
	"clock": "Clock Overlay",
	"bsvas": "Beat Saber VOD Audio System",
	"text": "Text Rotation Overlay",
	"bs": "Beat Saber Overlay",
	"clips": "Twitch Clip Overlay",
	"all": "All Overlays",
	"customizer": "Chat Customizer"
};

var mostRecentUpdate = 0;
var lastSettingReset = parseInt(localStorage.getItem("_lastSettingReset")) || 0;

$.get(`./changelog.json?sigh=${Date.now()}`, function(data) {
	console.log(data);

	for(let timestamp in data) {
		timestamp = parseInt(timestamp);

		if(timestamp !== 9999999999999) {
			if(timestamp > mostRecentUpdate) {
				mostRecentUpdate = timestamp;
			}
		}

		let updates = data[timestamp].updates;
		let dateObj = new Date(parseInt(timestamp));

		let rootElement = $(`<div class="part" data-timestamp="${timestamp}"></div>`);

		let headerElement = $(`<h1></h1>`);
		if(timestamp === 9999999999999) {
			headerElement.text("(next update)");
		} else {
			headerElement.text(`${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}, ${dateObj.toLocaleTimeString()}`);
		}
		rootElement.append(headerElement);

		for(const which in updates) {
			let updateData = updates[which];
			
			let updateElement = $(`<div class="setting settingOnlyText"></div>`);
			let categoryElement = $(`<h2>${properOverlayNames[which]}</h2>`);
			if("revision" in updateData) {
				categoryElement.append(`<em> (r${updateData.revision})</em>`);
			}
			updateElement.append(categoryElement);

			let mainListElement = $(`<ol></ol>`);
			for(const note of updateData.notes) {
				let rootNoteElement = $("<li></li>");

				for(const notePart of note) {
					if(typeof notePart === "string") {
						rootNoteElement.text(notePart);
					} else {
						let noteElement = $(`<ol></ol>`);
						for(const noteSubPart of notePart) {
							noteElement.append($(`<li>${noteSubPart}</li>`));
						}
						rootNoteElement.append(noteElement);
					}
				}

				mainListElement.append(rootNoteElement);
			}

			updateElement.append(mainListElement);
			rootElement.append(updateElement);
			rootElement.append($("<hr/>"));
		}

		$("#updatesSection").append(rootElement);

		if("reset" in data[timestamp] && timestamp !== 9999999999999) {
			const resetData = data[timestamp].reset;
			if(resetData.check > lastSettingReset) {
				localStorage.setItem("_lastSettingReset", resetData.check);

				for(const setting of resetData.settings) {
					console.log(`reset setting_${setting} to defaults (${defaultConfig[setting]}) due to update`);
					localStorage.setItem(`setting_${setting}`, defaultConfig[setting]);
				}
			}
		}
	}

	let lastClickedUpdateTab = parseInt(localStorage.getItem("_lastClickedUpdateTab"));
	if(mostRecentUpdate > lastClickedUpdateTab || isNaN(lastClickedUpdateTab)) {
		$(".newUpdates").text("(new!)");
	}

	$("#updatesSection hr:last-child").remove();
});