var callTwitchQueue = [];

var lastAsk = Infinity;
function callTwitch(data, callback) {
	if(!allowedToProceed) {
		console.log("No Client ID or Secret is set.");
		return;
	}

	$.ajax({
		type: "GET",
		url: `https://api.twitch.tv/helix/${data.endpoint}`,
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("twitch_accessToken")}`,
			"Client-Id": twitchClientId
		},

		data: data.args,

		error: function(data) {
			setTwitchHelixReachable(false);
		},

		statusCode: {
			200: function(data) {
				if(typeof callback === "function") {
					callback(data);
				}

				setTwitchHelixReachable(true);				
			},

			401: function() {
				console.log("token unauthorized");
				systemMessage("Twitch authentication token error, fetching a new one...");

				if(Date.now() < lastAsk) {
					postToTwitchEventChannel("RefreshAuthenticationToken");
					lastAsk = Date.now();
				}

				if(typeof callback === "function") {
					let queueObj = {
						callback: callback
					};

					if(typeof data !== "undefined") {
						queueObj.data = data;
					}

					callTwitchQueue.push(queueObj);
				}
			}
		}
	})	
}

function systemMessage(msg) {
	let tagsObject = {
		"username": "<system>",
		"display-name": `Overlay (r${overlayRevision})`,
		"user-id": "-1",
		"is-overlay-message": true,
		"message-type": "system",
		"emotes": null,
		"id": `system-${Date.now()}`,
		"color": "#ffffff"
	}

	prepareMessage(tagsObject, msg, false, false);
}

function formatTime(val) {
	let secs = val % 60;
	let mins = Math.floor(val / 60);

	return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function parse7TVColor(color) {
	if(!color) {
		return "#000";
	}

	let red = (color >> 24) & 0xFF;
	let green = (color >> 16) & 0xFF;
	let blue = (color >> 8) & 0xFF;
	let alpha = (color & 0xFF);

	return `rgba(${red}, ${green}, ${blue}, ${alpha/255})`;
}

function parseFFZModifiers(value) {
	let out = [];

	for(let modifier in ffzModifiers) {
		let modValue = ffzModifiers[modifier];
		if((value & modValue) === modValue) {
			out.push(modifier);
		}
	}

	return out;
}

function set7TVPaint(nameBlock, which, userID) {
	let paint = sevenTVPaints[which];
	let css = "";
	let bgColor = parse7TVColor(paint.color);

	if(paint.function === "url") {
		css = `url(${paint.image_url})`;
	} else {
		let stops = [];
		for(let i in paint.stops) {
			let stop = paint.stops[i];
			stops.push(`${parse7TVColor(stop.color)} ${stop.at*100}%`);
		}
		
		let func = paint.function;
		if(paint.repeat) {
			func = `repeating-${paint.function}`;
		}

		let angle = `${paint.angle}deg`
		if(paint.function === "radial-gradient") {
			angle = `${paint.shape} at ${paint.angle}%`;
		}

		css = `${func}(${angle}, ${stops.join(",")})`;
	}

	let shadows = "";
	if("drop_shadows" in paint) {
		let shadowsArr = [];
		if(paint.drop_shadows.length) {
			for(let i in paint.drop_shadows) {
				let s = paint.drop_shadows[i];
				shadowsArr.push(`drop-shadow(${s.x_offset}px ${s.y_offset}px ${s.radius}px ${parse7TVColor(s.color)})`);
			}
			shadows = shadowsArr.join(" ");
		}
	}

	if(paint.color !== null) {
		nameBlock.children().css("background-color", bgColor);
	}

	nameBlock.children().css("background-image", css).css("background-size", "contain");
	nameBlock.children(".displayName").css("filter", `var(--nameEffects${userID})${shadows}`);
	nameBlock.children(".internationalName").css("filter", `var(--nameEffects${userID})${shadows} saturate(var(--internationalNameSaturation))`);
}

function getTwitchUserInfo(id, callback) {
	if(typeof id === "undefined") {
		return;
	}
	if(id === "undefined") {
		return;
	}
	if(!("id" in broadcasterData)) {
		return;
	}

	if(id === "-1") {
		id = broadcasterData.id;
	}

	if(!sessionStorage.getItem(`cache_twitch${id}`)) {
		console.log(`info for ${id} not cached`);

		callTwitch({
			"endpoint": "users",
			"args": {
				"id": id
			}
		}, function(rawUserResponse) {
			if("data" in rawUserResponse) {
				if(rawUserResponse.data.length) {
					if(localStorage.getItem("setting_chatNameUsesProminentColor") === "true") {
						Vibrant.from(rawUserResponse.data[0].profile_image_url).maxDimension(120).maxColorCount(80).getPalette().then(function(swatches) {
							console.log(swatches);

							let wantedSwatch = swatches["Vibrant"];
							if(wantedSwatch._population === 0) {
								let maxPop = 0;

								for(let i in swatches) {
									let swatch = swatches[i];

									if(!swatch._population) {
										continue;
									}

									if(swatch._population > maxPop) {
										wantedSwatch = swatch;
									}
								}
							}

							rawUserResponse.data[0].profile_image_url_color = wantedSwatch.getHex();
							sessionStorage.setItem(`cache_twitch${id}`, JSON.stringify(rawUserResponse.data[0]));

							if(typeof callback === "function") {
								callback(rawUserResponse.data[0]);
							}
						});
					} else {
						sessionStorage.setItem(`cache_twitch${id}`, JSON.stringify(rawUserResponse.data[0]));

						if(typeof callback === "function") {
							callback(rawUserResponse.data[0]);
						}
					}
				} else {
					if(typeof callback === "function") {
						return callback(null);
					}
				}
			} else {
				if(typeof callback === "function") {
					return callback(null);
				}
			}
		});
	} else {
		if(typeof callback === "function") {
			return callback(JSON.parse(sessionStorage.getItem(`cache_twitch${id}`)));
		}
	}
}

function getUserPronouns(username, callback) {
	if(username === "<overlay>") {
		username = broadcasterData.login;
	}

	if(!sessionStorage.getItem(`cache_pronouns${username}`)) {
		console.log(`pronouns for ${username} not cached`);

		let resp = $.get(`https://pronouns.alejo.io/api/users/${username}`, function(pnData) {
			let fetched = { pronoun_id: "NONE" };
			if(pnData.length) {
				fetched = pnData[0];
			}

			sessionStorage.setItem(`cache_pronouns${username}`, JSON.stringify(fetched));
			if(typeof callback === "function") {
				return callback(fetched);
			}
		});
	} else {
		if(typeof callback === "function") {
			return callback(JSON.parse(sessionStorage.getItem(`cache_pronouns${username}`)));
		}
	}
}

function linearInterpolate(a, b, val) {
	return a + (b - a) * val;
};

function colorObjectToHex(obj) {
	let r = Math.round(obj.r).toString(16).padStart(2, "0");
	let g = Math.round(obj.g).toString(16).padStart(2, "0");
	let b = Math.round(obj.b).toString(16).padStart(2, "0");
	let a = Math.round(obj.a).toString(16).padStart(2, "0");

	return `#${r}${g}${b}${a}`;
}

function interpolateColor(colorA, colorB, amount) {
	if(colorA[0] !== "#") { return "#FF00FFFF"; }
	if(colorA.length === 7) { colorA = `${colorA}FF`; }
	if(colorB[0] !== "#") { return "#FF00FFFF"; }
	if(colorB.length === 7) { colorB = `${colorB}FF`; }

	amount = parseFloat(amount);
	if(amount < 0) { amount = 0; }
	if(amount > 100) { amount = 100; }

	let colorIntA = parseInt(colorA.replace("#", ""), 16);
	let colorIntB = parseInt(colorB.replace("#", ""), 16);

	let originalA = {
		r: (colorIntA >> 24) & 0xFF,
		g: (colorIntA >> 16) & 0xFF,
		b: (colorIntA >> 8) & 0xFF,
		a: (colorIntA & 0xFF),
	}
	if(amount === 0) { return colorObjectToHex(originalA); }
	let originalB = {
		r: (colorIntB >> 24) & 0xFF,
		g: (colorIntB >> 16) & 0xFF,
		b: (colorIntB >> 8) & 0xFF,
		a: (colorIntB & 0xFF),
	}
	if(amount === 100) { return colorObjectToHex(originalB); }

	let adjusted = {
		r: linearInterpolate(originalA.r, originalB.r, amount / 100),
		g: linearInterpolate(originalA.g, originalB.g, amount / 100),
		b: linearInterpolate(originalA.b, originalB.b, amount / 100),
		a: originalA.a
	};
	return colorObjectToHex(adjusted);
}

function getYIQ(rawColor) {
	if(rawColor[0] !== "#") { return 0; }
	if(rawColor.length > 7) { rawColor = rawColor.substring(0, 7); }

	let colorInt = parseInt(rawColor.replace("#", ""), 16);
	let color = {
		r: (colorInt >> 16) & 0xFF,
		g: (colorInt >> 8) & 0xFF,
		b: (colorInt & 0xFF)
	}

	return ((color.r*299)+(color.g*587)+(color.b*114))/1000;
}

function ensureSafeColor(color) {
	let minBrightness = (parseFloat(localStorage.getItem("setting_nameColorMinBrightness"))/100) * 255;
	let maxBrightness = (parseFloat(localStorage.getItem("setting_nameColorMaxBrightness"))/100) * 255;

	if(color !== "var(--defaultNameColor)") {
		let brightness = getYIQ(color);
		console.log(`brightness for ${color} is ${brightness}`);

		if(brightness < minBrightness) {
			console.log(`${color} is too dark`);
			color = interpolateColor(color, "#FFFFFF", (minBrightness/255)*100);
			console.log(`set to ${color}`);
		} else if(brightness > maxBrightness) {
			console.log(`${color} is too bright`);
			color = interpolateColor("#000000", color, (maxBrightness/255)*100);
			console.log(`set to ${color}`);
		}
	}

	return color;
}

function rootCSS() {
	return document.querySelector("html").style;
}

function randomFloat(min, max) {
	if(typeof min === "undefined") { min = 0; }
	if(typeof max === "undefined") { max = 1; }

	if(min > max) { return NaN; }
	else if(min === max) { return min; }

	return min + (Math.random() * (max - min));
}

function randomInt(min, max) {
	return Math.round(randomFloat(min, max));
}

var knownBots = [];
function getKnownBotsList(callback) {
	console.log("getting known bots list...");

	if(sessionStorage.getItem("cache_lastGrabbedKnownBots") === null) {
		console.log("known bot list hasn't been cached recently");

		$.ajax({
			type: "GET",
			url: "https://api.twitchinsights.net/v1/bots/all",

			error: function(data) {
				console.log("couldn't fetch known bot list, trying previous cache...");

				knownBots = JSON.parse(localStorage.getItem("cache_knownBots"));
				if(knownBots === null) {
					console.log("never fetched a known bot list successfully before. Welp.");
					knownBots = [];
				}

				if(typeof callback === "function") {
					callback(knownBots);
				}
			},

			statusCode: {
				200: function(data) {
					console.log("fetched known bot list");

					if(!data) {
						if(typeof callback === "function") {
							callback([]);
						}
						return;
					}
					if(!("bots" in data)) {
						if(typeof callback === "function") {
							callback([]);
						}
						return;
					}

					if(data) {
						// seems like twitch insights is caching, some other account ID? wtf
						// names work though
						knownBots = [];
						for(let i in data.bots) {
							let botInfo = data.bots[i];
							knownBots.push(botInfo[0]);
						}

						sessionStorage.setItem("cache_lastGrabbedKnownBots", Date.now());
						localStorage.setItem("cache_knownBots", JSON.stringify(knownBots));

						if(typeof callback === "function") {
							callback(knownBots);
						}
					}
				}
			}
		});
	} else {
		console.log("using cached known bot list");

		knownBots = JSON.parse(localStorage.getItem("cache_knownBots"));
		if(knownBots === null) {
			console.log("last known bot cache was empty? uh");
			knownBots = [];
		}
		if(typeof callback === "function") {
			callback(knownBots);
		}
	}
}

function isUserBot(username) {
	if(knownBots.indexOf(username) !== -1) { return true; }
	return false;
}