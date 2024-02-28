var isPaused = false;

function formatTime(val) {
	let secs = val % 60;
	let mins = Math.floor(val / 60);

	return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getHTTP(url, callback) {
	let xH = new XMLHttpRequest();

	xH.onreadystatechange = function() {
		if(xH.readyState === 4 && xH.status === 200) {
			callback(xH.responseText);
		}
	}

	xH.open("GET", url, true);
	xH.send(null);
}

function togglePause(state) {
	if(localStorage.getItem("setting_bs_desaturateOnPause") === "true") {
		if(state) {
			console.log("PAUSED");
			$("body").addClass("pause");
		} else {
			console.log("RESUMED");
			$("body").removeClass("pause");
		}
	} else {
		$("body").removeClass("pause");
	}

	isPaused = state;
}

var songLength = 1;
var currentScene = "Menu";
var oldScene;
var previousState = "";
var activeMap = {};

function setArt() {
	let artData;

	if(!("cover" in activeMap)) {
		return;
	}

	if(localStorage.getItem("setting_bs_useRemoteArtURL") === "true" || localStorage.getItem("setting_beatSaberDataMod") === "datapuller") {
		artData = activeMap.cover.external.image;
		if(activeMap.cover.external.image === null && activeMap.cover.internal.image !== null) {
			artData = activeMap.cover.internal.image;
		}
	} else {
		artData = activeMap.cover.internal.image;
	}

	if(artData === null) {
		artData = 'placeholder.png';
	}

	rootCSS().setProperty("--art-url", `url('${artData}')`);
	$("#art, #artDoppleganger").attr("src", artData);

	$("#artDoppleganger").on("load", function() {
		$("#artWrapper").removeClass("fadeOut").addClass("fadeIn");
		$("#bgWrapper").removeClass("fadeOut").addClass("fadeInLong");
	});

	let darkColor = activeMap.cover.colors.dark;
	let lightColor = activeMap.cover.colors.light;

	if(localStorage.getItem("setting_bs_ensureColorIsBrightEnough") === "true") {
		darkColor = ensureSafeColor(darkColor);
		lightColor = ensureSafeColor(lightColor);
	}

	localStorage.setItem("art_darkColor", darkColor);
	localStorage.setItem("art_lightColor", lightColor);
	$(":root").get(0).style.setProperty("--colorDark", darkColor);
	$(":root").get(0).style.setProperty("--colorLight", lightColor);
}

function updateMarquee() {
	if($("#titleString").text() === "") {
		return;
	}

	console.log("marquee update called");
	$("#titleString").marquee('destroy');

	if(localStorage.getItem("setting_bs_enableMarquee") === "true") {
		let parentWidth = $("#title").width();
		let childWidth = $("#titleString").width();
		let delayAmount = parseFloat(localStorage.getItem("setting_bs_marqueeDelay")) * 1000;

		if(childWidth > parentWidth) {
			$("#titleString").bind('finished', function() {
				$("#titleString").marquee('pause');
				setTimeout(function() {
					$("#titleString").marquee('resume');
				}, delayAmount);
			})
			.marquee({
				speed: parseInt(localStorage.getItem("setting_bs_marqueeSpeed")),
				pauseOnCycle: true,
				startVisible: true,
				delayBeforeStart: delayAmount,
				duplicated: true,
				gap: parseInt(localStorage.getItem("setting_bs_marqueeGap"))
			});
			rootCSS().setProperty("--titleAlignment", "start");
		} else {
			rootCSS().setProperty("--titleAlignment", "var(--metadataAlignment)");
		}
	} else {
		rootCSS().setProperty("--titleAlignment", "var(--metadataAlignment)");
	}
}

function updateSecondaryMarquee() {
	let childElement = ($("#mapperContainer").is(":visible") ? $("#mapperContainer") : $("#artist"));
	let parentElement = childElement.parent();
	let childWidth = childElement.width();
	let parentWidth = parentElement.width();

	parentElement.children().removeClass("cssScroll");
	parentElement.removeClass("cssScrollClippingWorkaround").removeClass("slideIn");

	if(localStorage.getItem("setting_bs_enableMarquee") === "false") {
		secondaryTimer = setTimeout(switchSecondary, parseInt(localStorage.getItem("setting_bs_artistMapperCycleDelay")) * 1000);
		return;
	}

	if(childWidth > parentWidth) {
		console.log(`${childWidth} > ${parentWidth}`);

		const extra = childWidth - parentWidth;
		const speed = extra / (parseInt(localStorage.getItem("setting_bs_marqueeSpeed")) * 2);
		rootCSS().setProperty("--cssScrollAmount", `-${extra}px`);
		rootCSS().setProperty("--cssScrollDuration", `${speed}s`);

		console.log(`amount: ${extra}px, speed: ${speed}s`);

		childElement.addClass("cssScroll");
		parentElement.addClass("cssScrollClippingWorkaround");
		secondaryTimer = setTimeout(switchSecondary, (parseInt(localStorage.getItem("setting_bs_artistMapperCycleDelay")) * 1333) + (speed * 1000)); // yeah idk either
	} else {
		console.log(`${childWidth} < ${parentWidth}`);
		secondaryTimer = setTimeout(switchSecondary, parseInt(localStorage.getItem("setting_bs_artistMapperCycleDelay")) * 1000);
	}
}

function toggleOverlay(show) {
	if(localStorage.getItem("setting_bs_hideOnMenu") === "false") {
		show = true;
	}

	if(show) {
		$("#miscInfoCell, #hitMissCell, #accCell").removeClass("fadeOut").addClass("fadeIn");
		$("#bgWrapper").removeClass("fadeOut").addClass("fadeInLong");
		$("#title").removeClass("slideOut").addClass("slideIn");

		setTimeout(function() {
			$("#secondaryWrap").addClass("slideIn").removeClass("slideOut");
			$("#artWrapper").removeClass("fadeOut").addClass("fadeIn");
		}, 100);
	} else {
		$("#miscInfoCell, #hitMissCell, #accCell").removeClass("fadeIn").addClass("fadeOut");
		$("#bgWrapper").removeClass("fadeInLong").addClass("fadeOut");
		$("#title").removeClass("slideIn").addClass("slideOut");

		setTimeout(function() {
			$("#secondaryWrap").addClass("slideOut").removeClass("slideIn");
			$("#artWrapper").removeClass("fadeIn").addClass("fadeOut");
		}, 100);
	}
}

currentState = {};
const eventFuncs = {
	"state": function(data) {
		elapsed = Math.floor(data.elapsed);
		currentState = data;

		if(previousState !== data.state) {
			previousState = data.state;
			togglePause(previousState !== "playing");
		}

		if(data.acc === 1 && !hits) {
			$("#acc").text("00.00");
		} else {
			setAcc(data.acc * 100);
		}

		$("#combo").text(data.combo.toLocaleString());

		if(!isNaN(data.score)) {
			setHitMiss(data);
		}

		timerFunction();

		if(data.state === "stopped") {
			toggleOverlay(false);
		}
	},

	"map": function(map) {
		toggleOverlay(true);
		activeMap = map;

		switchSecondary(true);

		setArt();

		$(":root").get(0).style.setProperty("--diffIconURL", `url("icons/${map.map.characteristic}.svg")`);
		$(":root").get(0).style.setProperty("--currentDiffColor", `var(--color${map.map.difficulty})`);
		setDiff();

		songLength = Math.ceil(map.song.duration/1000);
		$("#duration").text(formatTime(songLength));

		$("#titleString").text(map.song.title + (map.song.subtitle !== "" ? ` - ${map.song.subtitle}` : ""));

		updateMarquee();

		$("#artist").text(map.song.artist);
		if(!map.map.bsr) {
			$("#codeWrap").hide();
			$("#diffWrap").show();
		} else {
			$("#bsrCode").text(map.map.bsr);
		}

		$("#mapperContainer").empty();
		if(localStorage.getItem("setting_bs_forceBeatSaverData") === "true") {
			if(map.map.uploaders.length) {
				for(const mapper of map.map.uploaders) {
					let mapperElement = $(`<div class="mapper showComma"></div>`);
					if(mapper.avatar) {
						mapperElement.append($(`<img class="mapperAvatar" src="${mapper.avatar}"/>`))
					}
					mapperElement.append(mapper.name);
					$("#mapperContainer").append(mapperElement);				
				}
				$(".mapper:last-child").removeClass("showComma");
			} else {
				// fallback to internal data, probably a base game map
				$("#mapperContainer").append($(`<div class="mapper">${map.map.author}</div>`));
			}
		} else {
			let mapperElement = $(`<div class="mapper"></div>`);
			if(map.map.uploaders.length) {
				if(map.map.uploaders[0].avatar) {
					mapperElement.append($(`<img class="mapperAvatar" src="${map.map.uploaders[0].avatar}"/>`))
				}
			}
			mapperElement.append(map.map.author);
			$("#mapperContainer").append(mapperElement);
		}

		if(map.map.pack) {
			$("#mapperContainer").append($(`<div class="basePack">${map.map.pack}</div>`));
		}

		updateSecondaryMarquee();

		$("#combo").text(0);
		$("#hitValue").text(0);
		$("#FCCell").show();
		$("#missCell").hide();
		oldCombo = 0;
	}
};
function processMessage(data) {
	console.log(data);

	if(data.type in eventFuncs) {
		eventFuncs[data.type](data.data);
	}
}

var secondaryTimer;
function switchSecondary(force) {
	clearTimeout(secondaryTimer);

	if(force) {
		$("#mapperContainer").hide();
		$("#artist").show();

		updateSecondaryMarquee();
		return;
	}

	if(localStorage.getItem("setting_bs_enableArtistMapperCycle") === "true") {
		if($("#artist").is(":visible")) {
			$("#artist").fadeOut(250, function() {
				$("#mapperContainer").fadeIn(250);
				updateSecondaryMarquee();
			})
		} else {
			$("#mapperContainer").fadeOut(250, function() {
				$("#artist").fadeIn(250);
				updateSecondaryMarquee();
			})
		}
	}
}

setInterval(function() {
	if("map" in activeMap) {
		if(!activeMap.map.bsr) {
			$("#codeWrap").hide();
			$("#diffWrap").show();
			return;
		}
	}

	if($("#codeWrap").is(":visible")) {
		$("#codeWrap").fadeOut(250, function() {
			$("#diffWrap").fadeIn(250);
		})
	} else {
		$("#diffWrap").fadeOut(250, function() {
			$("#codeWrap").fadeIn(250);
		})
	}
}, 7000);

var elapsedTimers = [];
var elapsed = 0;
var timerInterval = 500;

function timerFunction() {
	elapsed += timerInterval / 1000;

	let perc = (elapsed / songLength);
	if(perc > 1 || localStorage.getItem("setting_bs_enableArtOutlineProgress") === "false") {
		perc = 1;
	}

	$(":root").get(0).style.setProperty("--currentProgressAngle", `${perc * 360}deg`);

	$("#time").text(formatTime(Math.floor(elapsed)));
}

var finalAcc = 100;
var curAcc = 100;
function setAcc(acc) {
	finalAcc = parseFloat(acc.toFixed(2));

	if(localStorage.getItem("setting_bs_animateAccChanges") === "true") {
		if(!isAnimating) {
			animateAccChange();
		}
	} else {
		curAcc = finalAcc;
		$("#acc").text(finalAcc.toFixed(2));
	}
}

var currentAccInterval = parseInt(localStorage.getItem("setting_bs_animateAccInterval"));
var isAnimating = false;
function animateAccChange() {
	isAnimating = true;

	if(curAcc === finalAcc) {
		isAnimating = false;
		return;
	}

	let toChange = parseFloat((Math.round((finalAcc - curAcc)*100)/100).toFixed(2));
	if(!toChange) {
		isAnimating = false;
		return;
	}

	if(toChange > 0) {
		curAcc += Math.ceil((toChange*100) / 10) / 100;
	} else if(toChange < 0) {
		curAcc += Math.floor((toChange*100) / 10) / 100;
	}

	$("#acc").text(curAcc.toFixed(2));

	setTimeout(animateAccChange, currentAccInterval);
}

function setCombo(combo) {
	let comboStr = combo.toString();
	let len = comboStr.length;

	for(let i = 0; i < len; i++) {
		if(i >= currentComboSpans) {
			$("#comboNums").append($(`<span class="comboNum" id="comboNum${i}">`));
			currentComboSpans++;
		}

		$(`#comboNum${i}`).text(comboStr[i]);
	}

	for(let i = currentComboSpans-1; i >= len; i--) {
		$(`#comboNum${i}`).remove();
		currentComboSpans--;
	}
}

var oldCombo = 0;
var hits = 0;
function setHitMiss(state) {
	$("#missValue").text(state.misses.toLocaleString());
	$("#hitValue").text(state.hits.toLocaleString());

	if(state.misses !== 0) {
		$("#FCCell").hide();
		$("#missCell").show();	
	}

	if(state.combo === oldCombo) {
		return;
	}

	if(state.combo < oldCombo) {
		oldCombo = state.combo;
		return;
	}
	oldCombo = state.combo;

	if(state.hits === state.combo) {
		$("#FCCell").show();
		$("#missCell").hide();	
	} else {
		$("#FCCell").hide();
		$("#missCell").show();
	}
}

rootCSS().setProperty("--background-art-height", `${$("#wrapper").outerHeight(true)}px`);