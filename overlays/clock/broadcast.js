const overlayRevision = 4;
const overlayRevisionTimestamp = 1713293906193;

const settingsEventChannel = new BroadcastChannel("settings_overlay");

function postToSettingsEventChannel(event, data) {
	let message = {
		event: event
	};
	if(data) {
		message.data = data;
	}

	console.log(message);
	settingsEventChannel.postMessage(message);
}

broadcastFuncs = {
	reload: function(message) {
		setTimeout(function() {
			location.reload();
		}, 100);
	},

	settingsOverlayLoaded: function(message) {
		postToSettingsEventChannel("ClockOverlayExists", {version: overlayRevision});
	},

	settingsKeysClock: function(message) {
		for(const setting of message.data) {
			updateSetting(`setting_${setting}`, localStorage.getItem(`setting_${setting}`));
		}

		onTwitchReady();
	}
}

settingsEventChannel.onmessage = function(message) {
	console.log(message);
	message = message.data;

	if(message.event in broadcastFuncs) {
		broadcastFuncs[message.event](message);
	}
};

postToSettingsEventChannel("ClockOverlayExists", {version: overlayRevision});

async function onTwitchReady() {
	currentClock = -1;
	switchClock();
	
	await getBroadcasterData();
	await getTwitchStreamData();
	await adTimer();
}

const twitchEventChannel = new BroadcastChannel("twitch_chat");
function postToTwitchEventChannel(event, data) {
	let message = {
		event: event
	};
	if(data) {
		message.data = data;
	}

	console.log(message);
	twitchEventChannel.postMessage(message);
}

const twitchFuncs = {
	OAuthTokenRefreshed: function() {
		adTimer();
	}
}

twitchEventChannel.onmessage = function(message) {
	message = message.data;

	if(message.event in twitchFuncs) {
		console.log(message);
		twitchFuncs[message.event](message);
	}
};