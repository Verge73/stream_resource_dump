const overlayRevision = 43;
const overlayRevisionTimestamp = 1710491263894;

const enums = {
	weight: {
		thin: 100,
		exlight: 200,
		extralight: 200,
		ultlight: 200,
		ultralight: 200,
		light: 300,
		regular: 400,
		normal: 400,
		default: 400,
		medium: 500,
		semibold: 600,
		demibold: 600,
		bold: 700,
		exbold: 800,
		extrabold: 800,
		ultbold: 800,
		ultrabold: 800,
		black: 900,
		heavy: 900
	}
}

const entityMap = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
	'`': '&#x60;',
	'=': '&#x3D;'
};

var twitchBadgeTypes = {
	role: {
		badges: ["artist-badge", "broadcaster", "extension", "moderator", "vip"],
		setting: "enableTwitchRoleBadges",
		is_solid: true
	},
	staff: {
		badges: ["admin", "global_mod", "staff", "twitchbot", "user-anniversary"],
		setting: "enableTwitchStaffBadges",
		is_solid: true
	},
	partner: {
		badges: ["ambassador", "partner"],
		setting: "enableTwitchPartnerBadges",
		is_solid: true
	},
	bits: {
		badges: ["anonymous-cheerer", "bits"],
		setting: "enableTwitchBitsBadges",
		is_solid: true
	},
	leaderboard: {
		badges: ["bits-leader", "clip-champ", "sub-gift-leader"],
		setting: "enableTwitchLeaderboardBadges",
		is_solid: false
	},
	founder: {
		badges: ["founder"],
		setting: "enableTwitchFounderBadges",
		is_solid: false
	},
	charity: {
		badges: ["glhf-pledge", "bits-charity", "gold-pixel-heart"],
		setting: "enableTwitchCharityBadges",
		is_solid: false
	},
	convention: {
		badges: ["glitchcon2020", "twitchcon2017", "twitchcon2018", "twitchconAmsterdam2020", "twitchconEU2019", 
				 "twitchconEU2022", "twitchconEU2023", "twitchconNA2019", "twitchconNA2020", "twitchconNA2022",
				 "superultracombo-2023", "twitchconNA2023"],
		setting: "enableTwitchConBadges",
		is_solid: false
	},
	hypetrain: {
		badges: ["hype-train"],
		setting: "enableTwitchHypeTrainBadges",
		is_solid: false
	},
	moments: {
		badges: ["moments"],
		setting: "enableTwitchMomentsBadges",
		is_solid: false
	},
	status: {
		badges: ["no_audio", "no_video"],
		setting: "enableTwitchStatusBadges",
		is_solid: true
	},
	predictions: {
		badges: ["predictions"],
		setting: "enableTwitchPredictionsBadges",
		is_solid: false
	},
	prime: {
		badges: ["premium", "samusoffer_beta"],
		setting: "enableTwitchPrimeGamingBadges",
		is_solid: true
	},
	gifter: {
		badges: ["sub-gifter"],
		setting: "enableTwitchSubGiftsBadges",
		is_solid: false
	},
	subscriber: {
		badges: ["subscriber"],
		setting: "enableTwitchSubscriberBadges",
		is_solid: true
	},
	turbo: {
		badges: ["turbo"],
		setting: "enableTwitchTurboBadges",
		is_solid: true
	},
	event: {
		badges: ["rplace-2023", "twitch-recap-2023"],
		setting: "enableTwitchEventBadges",
		is_solid: true
	}
};

const commonEmotes = {
	"catJAM": {service: "default", url: "emotes/catJAM/3x.gif"},
	"Clap": {service: "default", url: "emotes/Clap/3x.gif"},
	"DonoWall": {service: "default", url: "emotes/DonoWall/3x.gif"},
	"HUH": {service: "default", url: "emotes/HUH/3x.webp"},
	"KEKW": {service: "default", url: "emotes/KEKW/3x.png"},
	"modCheck": {service: "default", url: "emotes/modCheck/3x.gif"},
	"OMEGALUL": {service: "default", url: "emotes/OMEGALUL/3x.png"},
	"SourPls": {service: "default", url: "emotes/SourPls/3x.gif"},
	"WAYTOODANK": {service: "default", url: "emotes/WAYTOODANK/3x.webp"}
};

twemoji.base = "twemoji/";

const funnyBeatSaberMapsToRequestToEverySingleStreamerOnTwitchEverIBetEverySingleOneOfThemWillEnjoyThem = [
	"25f", "d1cc", "b", "c32d", "922f", "871a", "10c9b", "1e99", "1eb9", "2a121", "24188", "46d4", "24b58", "557f", "1f89a", "335c", "e621", "2c2f4", "11cf8"
];

const animationFilterFunctions = {
	Contrast: {
		incoming: {
			start: "contrast(var(--messageInContrastStart))",
			end: "contrast(var(--messageInContrastEnd))"
		},
		outgoing: {
			start: "contrast(var(--messageOutContrastStart))",
			end: "contrast(var(--messageOutContrastEnd))"				
		}
	},
	Brightness: {
		incoming: {
			start: "brightness(var(--messageInBrightnessStart))",
			end: "brightness(var(--messageInBrightnessEnd))"
		},
		outgoing: {
			start: "brightness(var(--messageOutBrightnessStart))",
			end: "brightness(var(--messageOutBrightnessEnd))"
		}
	},
	HueRotate: {
		incoming: {
			start: "hue-rotate(var(--messageInHueRotateStart))",
			end: "hue-rotate(var(--messageInHueRotateEnd))"
		},
		outgoing: {
			start: "hue-rotate(var(--messageOutHueRotateStart))",
			end: "hue-rotate(var(--messageOutHueRotateEnd))"
		}
	},
	Saturate: {
		incoming: {
			start: "saturate(var(--messageInSaturateStart))",
			end: "saturate(var(--messageInSaturateEnd))"
		},
		outgoing: {
			start: "saturate(var(--messageOutSaturateStart))",
			end: "saturate(var(--messageOutSaturateEnd))"
		}
	},
	Blur: {
		incoming: {
			start: "blur(var(--messageInBlurStart))",
			end: "blur(var(--messageInBlurEnd))"
		},
		outgoing: {
			start: "blur(var(--messageOutBlurStart))",
			end: "blur(var(--messageOutBlurEnd))"
		}
	}
};

const ffzModifiers = {
	Hidden: 1,
	FlipX: 2,
	FlipY: 4,
	GrowX: 8,
	Rainbow: 2048,
	HyperRed: 4096,
	HyperShake: 8192,
	Cursed: 16384,
	Jam: 32768,
	Bounce: 65536
};

// https://github.com/tyxla/remove-accents/blob/181808eb89732155a3a3352b3643e523ab565594/index.js#L1C1-L461C3 with some modifications
var characterDevolveMap = {
	"À": "A",
	"Á": "A",
	"Â": "A",
	"Ã": "A",
	"Ä": "A",
	"Å": "A",
	"Ấ": "A",
	"Ắ": "A",
	"Ẳ": "A",
	"Ẵ": "A",
	"Ặ": "A",
	"Æ": "AE",
	"Ầ": "A",
	"Ằ": "A",
	"Ȃ": "A",
	"Ả": "A",
	"Ạ": "A",
	"Ẩ": "A",
	"Ẫ": "A",
	"Ậ": "A",
	"Ç": "C",
	"Ḉ": "C",
	"È": "E",
	"É": "E",
	"Ê": "E",
	"Ë": "E",
	"Ế": "E",
	"Ḗ": "E",
	"Ề": "E",
	"Ḕ": "E",
	"Ḝ": "E",
	"Ȇ": "E",
	"Ẻ": "E",
	"Ẽ": "E",
	"Ẹ": "E",
	"Ể": "E",
	"Ễ": "E",
	"Ệ": "E",
	"Ì": "I",
	"Í": "I",
	"Î": "I",
	"Ï": "I",
	"Ḯ": "I",
	"Ȋ": "I",
	"Ỉ": "I",
	"Ị": "I",
	"Ð": "D",
	"Ñ": "N",
	"Ò": "O",
	"Ó": "O",
	"Ô": "O",
	"Õ": "O",
	"Ö": "O",
	"Ø": "O",
	"Ố": "O",
	"Ṍ": "O",
	"Ṓ": "O",
	"Ȏ": "O",
	"Ỏ": "O",
	"Ọ": "O",
	"Ổ": "O",
	"Ỗ": "O",
	"Ộ": "O",
	"Ờ": "O",
	"Ở": "O",
	"Ỡ": "O",
	"Ớ": "O",
	"Ợ": "O",
	"Ù": "U",
	"Ú": "U",
	"Û": "U",
	"Ü": "U",
	"Ủ": "U",
	"Ụ": "U",
	"Ử": "U",
	"Ữ": "U",
	"Ự": "U",
	"Ý": "Y",
	"à": "a",
	"á": "a",
	"â": "a",
	"ã": "a",
	"ä": "a",
	"å": "a",
	"ấ": "a",
	"ắ": "a",
	"ẳ": "a",
	"ẵ": "a",
	"ặ": "a",
	"æ": "ae",
	"ầ": "a",
	"ằ": "a",
	"ȃ": "a",
	"ả": "a",
	"ạ": "a",
	"ẩ": "a",
	"ẫ": "a",
	"ậ": "a",
	"ç": "c",
	"ḉ": "c",
	"è": "e",
	"é": "e",
	"ê": "e",
	"ë": "e",
	"ế": "e",
	"ḗ": "e",
	"ề": "e",
	"ḕ": "e",
	"ḝ": "e",
	"ȇ": "e",
	"ẻ": "e",
	"ẽ": "e",
	"ẹ": "e",
	"ể": "e",
	"ễ": "e",
	"ệ": "e",
	"ì": "i",
	"í": "i",
	"î": "i",
	"ï": "i",
	"ḯ": "i",
	"ȋ": "i",
	"ỉ": "i",
	"ị": "i",
	"ð": "d",
	"ñ": "n",
	"ò": "o",
	"ó": "o",
	"ô": "o",
	"õ": "o",
	"ö": "o",
	"ø": "o",
	"ố": "o",
	"ṍ": "o",
	"ṓ": "o",
	"ȏ": "o",
	"ỏ": "o",
	"ọ": "o",
	"ổ": "o",
	"ỗ": "o",
	"ộ": "o",
	"ờ": "o",
	"ở": "o",
	"ỡ": "o",
	"ớ": "o",
	"ợ": "o",
	"ù": "u",
	"ú": "u",
	"û": "u",
	"ü": "u",
	"ủ": "u",
	"ụ": "u",
	"ử": "u",
	"ữ": "u",
	"ự": "u",
	"ý": "y",
	"ÿ": "y",
	"Ā": "A",
	"ā": "a",
	"Ă": "A",
	"ă": "a",
	"Ą": "A",
	"ą": "a",
	"Ć": "C",
	"ć": "c",
	"Ĉ": "C",
	"ĉ": "c",
	"Ċ": "C",
	"ċ": "c",
	"Č": "C",
	"č": "c",
	"C̆": "C",
	"c̆": "c",
	"Ď": "D",
	"ď": "d",
	"Đ": "D",
	"đ": "d",
	"Ē": "E",
	"ē": "e",
	"Ĕ": "E",
	"ĕ": "e",
	"Ė": "E",
	"ė": "e",
	"Ę": "E",
	"ę": "e",
	"Ě": "E",
	"ě": "e",
	"Ĝ": "G",
	"Ǵ": "G",
	"ĝ": "g",
	"ǵ": "g",
	"Ğ": "G",
	"ğ": "g",
	"Ġ": "G",
	"ġ": "g",
	"Ģ": "G",
	"ģ": "g",
	"Ĥ": "H",
	"ĥ": "h",
	"Ħ": "H",
	"ħ": "h",
	"Ḫ": "H",
	"ḫ": "h",
	"Ĩ": "I",
	"ĩ": "i",
	"Ī": "I",
	"ī": "i",
	"Ĭ": "I",
	"ĭ": "i",
	"Į": "I",
	"į": "i",
	"İ": "I",
	"ı": "i",
	"Ĳ": "IJ",
	"ĳ": "ij",
	"Ĵ": "J",
	"ĵ": "j",
	"Ķ": "K",
	"ķ": "k",
	"Ḱ": "K",
	"ḱ": "k",
	"K̆": "K",
	"k̆": "k",
	"Ĺ": "L",
	"ĺ": "l",
	"Ļ": "L",
	"ļ": "l",
	"Ľ": "L",
	"ľ": "l",
	"Ŀ": "L",
	"ŀ": "l",
	"Ł": "l",
	"ł": "l",
	"Ḿ": "M",
	"ḿ": "m",
	"M̆": "M",
	"m̆": "m",
	"Ń": "N",
	"ń": "n",
	"Ņ": "N",
	"ņ": "n",
	"Ň": "N",
	"ň": "n",
	"ŉ": "n",
	"N̆": "N",
	"n̆": "n",
	"Ō": "O",
	"ō": "o",
	"Ŏ": "O",
	"ŏ": "o",
	"Ő": "O",
	"ő": "o",
	"Œ": "OE",
	"œ": "oe",
	"P̆": "P",
	"p̆": "p",
	"Ŕ": "R",
	"ŕ": "r",
	"Ŗ": "R",
	"ŗ": "r",
	"Ř": "R",
	"ř": "r",
	"R̆": "R",
	"r̆": "r",
	"Ȓ": "R",
	"ȓ": "r",
	"Ś": "S",
	"ś": "s",
	"Ŝ": "S",
	"ŝ": "s",
	"Ş": "S",
	"Ș": "S",
	"ș": "s",
	"ş": "s",
	"Š": "S",
	"š": "s",
	"Ţ": "T",
	"ţ": "t",
	"ț": "t",
	"Ț": "T",
	"Ť": "T",
	"ť": "t",
	"Ŧ": "T",
	"ŧ": "t",
	"T̆": "T",
	"t̆": "t",
	"Ũ": "U",
	"ũ": "u",
	"Ū": "U",
	"ū": "u",
	"Ŭ": "U",
	"ŭ": "u",
	"Ů": "U",
	"ů": "u",
	"Ű": "U",
	"ű": "u",
	"Ų": "U",
	"ų": "u",
	"Ȗ": "U",
	"ȗ": "u",
	"V̆": "V",
	"v̆": "v",
	"Ŵ": "W",
	"ŵ": "w",
	"Ẃ": "W",
	"ẃ": "w",
	"X̆": "X",
	"x̆": "x",
	"Ŷ": "Y",
	"ŷ": "y",
	"Ÿ": "Y",
	"Y̆": "Y",
	"y̆": "y",
	"Ź": "Z",
	"ź": "z",
	"Ż": "Z",
	"ż": "z",
	"Ž": "Z",
	"ž": "z",
	"ſ": "I",
	"ƒ": "f",
	"Ơ": "O",
	"ơ": "o",
	"Ư": "U",
	"ư": "u",
	"Ǎ": "A",
	"ǎ": "a",
	"Ǐ": "I",
	"ǐ": "i",
	"Ǒ": "O",
	"ǒ": "o",
	"Ǔ": "U",
	"ǔ": "u",
	"Ǖ": "U",
	"ǖ": "u",
	"Ǘ": "U",
	"ǘ": "u",
	"Ǚ": "U",
	"ǚ": "u",
	"Ǜ": "U",
	"ǜ": "u",
	"Ứ": "U",
	"ứ": "u",
	"Ṹ": "U",
	"ṹ": "u",
	"Ǻ": "A",
	"ǻ": "a",
	"Ǽ": "AE",
	"ǽ": "ae",
	"Ǿ": "O",
	"ǿ": "o",
	"Þ": "p",
	"þ": "D",
	"Ṕ": "P",
	"ṕ": "p",
	"Ṥ": "S",
	"ṥ": "s",
	"X́": "X",
	"x́": "x",
	"Ѓ": "r",
	"ѓ": "r",
	"Ќ": "K",
	"ќ": "K",
	"A̋": "A",
	"a̋": "a",
	"E̋": "E",
	"e̋": "e",
	"I̋": "I",
	"i̋": "i",
	"Ǹ": "N",
	"ǹ": "n",
	"Ồ": "O",
	"ồ": "o",
	"Ṑ": "O",
	"ṑ": "o",
	"Ừ": "U",
	"ừ": "u",
	"Ẁ": "W",
	"ẁ": "w",
	"Ỳ": "Y",
	"ỳ": "y",
	"Ȁ": "A",
	"ȁ": "a",
	"Ȅ": "E",
	"ȅ": "e",
	"Ȉ": "I",
	"ȉ": "i",
	"Ȍ": "O",
	"ȍ": "o",
	"Ȑ": "R",
	"ȑ": "r",
	"Ȕ": "U",
	"ȕ": "u",
	"B̌": "B",
	"b̌": "b",
	"Č̣": "C",
	"č̣": "c",
	"Ê̌": "E",
	"ê̌": "e",
	"F̌": "F",
	"f̌": "f",
	"Ǧ": "G",
	"ǧ": "g",
	"Ȟ": "H",
	"ȟ": "h",
	"J̌": "J",
	"ǰ": "j",
	"Ǩ": "K",
	"ǩ": "k",
	"M̌": "M",
	"m̌": "m",
	"P̌": "P",
	"p̌": "p",
	"Q̌": "Q",
	"q̌": "q",
	"Ř̩": "R",
	"ř̩": "r",
	"Ṧ": "S",
	"ṧ": "s",
	"V̌": "V",
	"v̌": "v",
	"W̌": "W",
	"w̌": "w",
	"X̌": "X",
	"x̌": "x",
	"Y̌": "Y",
	"y̌": "y",
	"A̧": "A",
	"a̧": "a",
	"B̧": "B",
	"b̧": "b",
	"Ḑ": "D",
	"ḑ": "d",
	"Ȩ": "E",
	"ȩ": "e",
	"Ɛ̧": "E",
	"ɛ̧": "e",
	"Ḩ": "H",
	"ḩ": "h",
	"I̧": "I",
	"i̧": "i",
	"Ɨ̧": "I",
	"ɨ̧": "i",
	"M̧": "M",
	"m̧": "m",
	"O̧": "O",
	"o̧": "o",
	"Q̧": "Q",
	"q̧": "q",
	"U̧": "U",
	"u̧": "u",
	"X̧": "X",
	"x̧": "x",
	"Z̧": "Z",
	"z̧": "z",
	"й":"N",
	"Й":"N",
	"ё":"е",
	"Ё":"Е",
};

const twitchUsers = new UserSet();
const sevenTVEntitlements = new SevenTVEntitlements();

const defaultSubBadgeLengths = [1, 1, 2, 3, 6, 9, 12];

var pronounTags = {};
async function setPronounTags() {
	const response = await fetch("https://api.pronouns.alejo.io/v1/pronouns");
	if(!response.ok) {
		return;
	}

	pronounTags = await response.json();
	console.log("successfully grabbed available pronoun tags");
}
setPronounTags();