const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const nonPublicSettings = [
	"twitchClientID",
	"twitchClientSecret",
	"streamlabsSocketToken",
	"streamelementsJWTToken",
	"spotifyClientID",
	"obs_usePassword",
	"obs_password",
	"chatHideAccounts",
	"twitchChannel",
	"debugRawMessages",
	"debugFreezeChat",
	"ajaxTimeout",
	"obs_ip",
	"obs_port",
	"bsvodaudio_audioSource",
	"bsvodaudio_vodAudioTrack",
	"bsvodaudio_syncRemoteDBs",
	"bsvodaudio_remoteDBURLs",
	"bsplus_ip",
	"bsplus_port",
	"bsvodaudio_muteOnConflict",
	"bsvodaudio_muteOnUnknown",
	"bsvodaudio_muteOnMenu",
	"autoHideAllKnownBots",
	"allowConsoleMessages",
	"useLowQualityImages",
	"chatRemoveMessageDelay",
	"chatRemoveSystemMessageDelay",
	"chatParseMarkdown",
	"enable7TV",
	"enable7TVBadges",
	"enable7TVChannelEmotes",
	"enable7TVGlobalEmotes",
	"enable7TVUserPaints",
	"enableBTTV",
	"enableBTTVBadges",
	"enableBTTVChannelEmotes",
	"enableBTTVGlobalEmotes",
	"enableFFZ",
	"enableFFZBadges",
	"enableFFZChannelEmotes",
	"enableFFZGlobalEmotes",
	"use3dTransformsOnAnimations",
	"chatMessagesHardCap",
	"chatHideCommands",
	"chatCommandCharacter",
	"avatarAllowedModerators",
	"avatarAllowedVIPs",
	"avatarAllowedSubscribers",
	"avatarAllowedTurbo",
	"avatarAllowedPrime",
	"avatarAllowedArtist",
	"avatarAllowedPartner",
	"avatarAllowedStaff",
	"avatarAllowedEveryone",
	"avatarAllowedIncludeBits",
	"avatarAllowedBitsMinimum",
	"avatarAllowedAffiliates",
	"avatarAllowedIncludeGifts",
	"avatarAllowedGiftsMinimum",
	"avatarAllowedIncludeTotalMessages",
	"avatarAllowedMessageThreshold",
	"applyBorderRadiusToSubBadges",
	"badgeBorderRadius",
	"enableTwitchBadges",
	"enableTwitchRoleBadges",
	"enableTwitchGameBadges",
	"enableTwitchPartnerBadges",
	"enableTwitchBitsBadges",
	"enableTwitchSubGiftsBadges",
	"enableTwitchLeaderboardBadges",
	"enableTwitchFounderBadges",
	"enableTwitchStaffBadges",
	"enableTwitchMomentsBadges",
	"enableTwitchStatusBadges",
	"enableTwitchPredictionsBadges",
	"enableTwitchPrimeGamingBadges",
	"enableTwitchTurboBadges",
	"enableTwitchSubscriberBadges",
	"enableTwitchConBadges",
	"enableTwitchCharityBadges",
	"enableTwitchHypeTrainBadges",
	"enableAffiliateBadges",
	"enableBotBadges",
	"enableEmotes",
	"emotesParseToImage",
	"chatShowCommonEmotes",
	"useNewerEmojiRegex",
	"keepAmountOfBackups",
	"spotify_enableScannable",
	"spotify_enableArt",
	"spotify_enableArtOutline",
	"spotify_refreshInterval",
	"spotify_progressInterval",
	"spotify_enableMarquee",
	"spotify_marqueeDelay",
	"spotify_marqueeGap",
	"spotify_marqueeSpeed",
	"allowModeratorsToRefresh",
	"allowParrotToRefresh",
	"bigNoNoWords",
	"spotify_hideOnPause",
	"cmdEnableBSR",
	"spotify_enableArtistAlbumCycle",
	"spotify_artistAlbumCycleDelay",
	"clock_overrideHeader",
	"clock_overrideHeaderString",
	"clock_use12Hour",
	"enableTwitchEventBadges",
	"enableCustomBadges_subscriber",
	"enableCustomBadges_bits",
	"channelIsOwn",
	"enableEventTagsWatchStreaks",
	"delayChat",
	"datapuller_port",
	"beatSaberDataMod",
	"bs_forceBeatSaverData",
	"bs_maxCollaborators",
	"clips_durationPreferenceMin",
	"clips_durationPreferenceMax",
	"clips_onlyFetchFeatured",
	"clips_listSize",
	"clips_useRandom",
	"clips_triggerCommand",
	"clips_preferredResolution",
	"clips_allowRaidersToUse"
];

const defaultConfig = {
	"enableBTTVGlobalEmotes": "true",
	"enableFFZBadges": "true",
	"chatMessageFont": "Manrope",
	"chatMaxBigEmotes": "8",
	"chatShadows": "true",
	"enable7TVBadges": "true",
	"chatHighlightBackgroundColor": "#FFFFCC",
	"chatFadeHistory": "true",
	"chatOutlineStyle": "solid",
	"chatFadeHistoryStep": "15",
	"chatOutlinesSize": "1",
	"enableFFZGlobalEmotes": "true",
	"enableFFZ": "true",
	"chatBackgroundColor": "#00000000",
	"chatMessageColor": "#ffffff",
	"enable7TVChannelEmotes": "true",
	"chatDefaultNameColor": "#aaaaaa",
	"chatMessageFontWeight": "600",
	"enable7TVGlobalEmotes": "true",
	"chatRemoveMessageDelay": "45",
	"chatRemoveSystemMessageDelay": "10",
	"enableBTTV": "true",
	"enableBTTVBadges": "true",
	"twitchClientSecret": "",
	"chatParseMarkdown": "true",
	"chatHideAccounts": "",
	"twitchChannel": "",
	"chatOutlinesColor": "#ffffff",
	"chatMessageFontSize": "15",
	"chatOutlinesFilter": "true",
	"twitchClientID": "",
	"chatNameFontWeight": "900",
	"enable7TV": "true",
	"chatHideCommands": "true",
	"chatCommandCharacter": "!",
	"chatBigEmoteSize": "48",
	"enable7TVUserPaints": "true",
	"chatNameFontSize": "15",
	"chatBlockBorderRadius": "0",
	"chatShowBigEmotes": "true",
	"chatBlockPaddingVertical": "16",
	"chatBlockPaddingHorizontal": "16",
	"enableFFZChannelEmotes": "true",
	"chatOutlines": "false",
	"enableBTTVChannelEmotes": "true",
	"chatNameFont": "Manrope",
	"chatBlockIndividualPaddingVertical": "0",
	"chatBlockIndividualPaddingHorizontal": "0",
	"debugRawMessages": "false",
	"chatCornerAlignment": "bottom,left",
	"chatMessageLineHeight": "24",
	"enableAvatars": "true",
	"avatarAllowedModerators": "true",
	"avatarAllowedVIPs": "true",
	"avatarAllowedSubscribers": "true",
	"avatarAllowedTurbo": "true",
	"avatarAllowedPrime": "false",
	"avatarAllowedArtist": "true",
	"avatarAllowedPartner": "true",
	"avatarAllowedStaff": "true",
	"avatarAllowedEveryone": "false",
	"avatarAllowedIncludeBits": "true",
	"avatarAllowedBitsMinimum": "1000",
	"enablePronouns": "true",
	"avatarSize": "32",
	"avatarShape": "circle",
	"chatDefaultNameColorForced": "false",
	"chatMessageUserInfoElementSpacing": "11",
	"overlayShadowColor": "#000000",
	"overlayShadowXOffset": "0",
	"overlayShadowYOffset": "1",
	"overlayShadowBlurRadius": "2",
	"overlayOutlineColor": "#000000",
	"pronounsSeparator": " / ",
	"enableTwitchBadges": "true",
	"enableTwitchRoleBadges": "true",
	"enableTwitchGameBadges": "true",
	"enableTwitchPartnerBadges": "true",
	"enableTwitchBitsBadges": "true",
	"enableTwitchSubGiftsBadges": "true",
	"enableTwitchLeaderboardBadges": "true",
	"enableTwitchFounderBadges": "true",
	"enableTwitchStaffBadges": "true",
	"enableTwitchMomentsBadges": "false",
	"enableTwitchStatusBadges": "false",
	"enableTwitchPredictionsBadges": "true",
	"enableTwitchPrimeGamingBadges": "true",
	"enableTwitchTurboBadges": "true",
	"enableTwitchSubscriberBadges": "true",
	"enableTwitchConBadges": "true",
	"enableTwitchCharityBadges": "true",
	"enableTwitchHypeTrainBadges": "true",
	"badgeBorderRadius": "4",
	"badgeSpacing": "1",
	"badgeSize": "22",
	"chatNameFontWeightExtra": "1.15",
	"chatNameUsesGradient": "true",
	"chatDefaultNameColorSecondary": "#FFFFFF",
	"chatNameGradientAngle": "170",
	"chatNameLetterSpacing": "0.8",
	"messageLetterSpacing": "0",
	"pronounsColor": "#808080",
	"pronounsUsesGradient": "true",
	"pronounsColorSecondary": "#FFFFFF",
	"pronounsGradientAngle": "170",
	"pronounsFont": "Manrope",
	"pronounsFontSize": "11",
	"pronounsFontWeight": "900",
	"pronounsFontWeightExtra": "0.5",
	"pronounsLetterSpacing": "0",
	"chatNameTransform": "uppercase",
	"messageTransform": "none",
	"pronounsTransform": "uppercase",
	"enableFlags": "true",
	"flagsBorderRadius": "4",
	"flagsSize": "18",
	"flagsSpacing": "-5",
	"chatBlockSpacing": "10",
	"messageBoldAmount": "1.2",
	"chatShowCommonEmotes": "true",
	"maxFlagCount": "6",
	"enableMessageTimestamps": "false",
	"timestampUsesGradient": "true",
	"timestampColor": "#808080",
	"timestampColorSecondary": "#FFFFFF",
	"timestampGradientAngle": "170",
	"timestampFont": "Manrope",
	"timestampFontSize": "12",
	"timestampFontWeight": "900",
	"timestampFontWeightExtra": "0.5",
	"timestampLetterSpacing": "0",
	"timestampPadding": "10",
	"timestampFormat": "H:mm:ss",
	"timestampTracksUptime": "false",
	"chatBlurHistory": "false",
	"chatBlurHistoryStep": "0.2",
	"chatHistoryStartAfter": "4",
	"hideTimestampsOnBigEmotes": "true",
	"chatMessageUserInfoBackgroundColor": "#00000000",
	"chatMessageUserInfoElementPaddingVertical": "0",
	"chatMessageUserInfoElementPaddingHorizontal": "0",
	"chatMessageUserInfoElementBorderRadius": "0",
	"chatBlockWidth": "-webkit-fill-available",
	"allowUserCustomizations": "true",
	"avatarAllowedAffiliates": "false",
	"applyBorderRadiusToSubBadges": "false",
	"chatOutlinesReflectUserColor": "false",
	"chatOutlinesUserColorAmount": "50",
	"chatBackgroundReflectUserColor": "false",
	"chatBackgroundUserColorAmount": "50",
	"nameColorMinBrightness": "30",
	"nameColorMaxBrightness": "100",
	"ensureNameColorsAreBrightEnough": "true",
	"chatMessageUserInfoBackgroundReflectUserColor": "false",
	"chatMessageUserInfoBackgroundUserColorAmount": "50",
	"chatMessageUserInfoOutlines": "false",
	"chatMessageUserInfoOutlinesColor": "#ffffff",
	"chatMessageUserInfoOutlinesReflectUserColor": "false",
	"chatMessageUserInfoOutlinesUserColorAmount": "100",
	"chatMessageUserInfoOutlinesSize": "1",
	"chatMessageUserInfoOutlineStyle": "solid",
	"pronounsReflectUserColor": "false",
	"pronounsUserColorAmount": "50",
	"chatMessageReflectUserColor": "true",
	"chatMessageUserColorAmount": "17.5",
	"chatMessageUserInfoBottomMargin": "0",
	"chatMessagesHardCap": "30",
	"debugFreezeChat": "false",
	"enableEmotes": "true",
	"emotesParseToImage": "true",
	"emotesBorderRadius": "0",
	"chatBigEmoteMargin": "0",
	"chatBigEmoteMarginVertical": "4",
	"overlayForceWidth": "false",
	"overlayWidth": "700",
	"chatMessageEnableSeparators": "false",
	"chatMessageSeparatorColor": "#ffffff20",
	"chatMessageSeparatorWidth": "1",
	"chatMessageSeparatorSpacing": "0",
	"chatMessageSeparatorStyle": "solid",
	"hideDefaultAvatars": "true",
	"avatarAllowedIncludeGifts": "true",
	"avatarAllowedGiftsMinimum": "5",
	"chatHighlightGlowRadius": "3",
	"chatShowCheermotes": "true",
	"chatShowCheermotesColor": "true",
	"chatShowCheermotesAnimated": "true",
	"chatScaleHistory": "false",
	"chatScaleHistoryAmount": "-3",
	"chatAnimationsIn": "true",
	"chatAnimationsOut": "true",
	"animationsInDuration": "0.33",
	"animationsOutDuration": "0.75",
	"animationsInOriginPoint": "center center",
	"animationsOutOriginPoint": "left center",
	"animationsInTimingFunc": "EaseOutCubic",
	"animationsOutTimingFunc": "EaseInBack",
	"messageInOpacityStart": "0",
	"messageInOpacityEnd": "100",
	"messageInXTransformStart": "0",
	"messageInXTransformEnd": "0",
	"messageInYTransformStart": "3",
	"messageInYTransformEnd": "0",
	"messageInBlurStart": "0",
	"messageInBlurEnd": "0",
	"messageInScaleXStart": "100",
	"messageInScaleXEnd": "100",
	"messageInScaleYStart": "100",
	"messageInScaleYEnd": "100",
	"messageInSkewXStart": "0",
	"messageInSkewXEnd": "0",
	"messageInSkewYStart": "0",
	"messageInSkewYEnd": "0",
	"messageInRotateStart": "0",
	"messageInRotateEnd": "0",
	"messageInBrightnessStart": "100",
	"messageInBrightnessEnd": "100",
	"messageInContrastStart": "100",
	"messageInContrastEnd": "100",
	"messageInSaturateStart": "100",
	"messageInSaturateEnd": "100",
	"messageInHueRotateStart": "0",
	"messageInHueRotateEnd": "0",
	"messageOutOpacityStart": "100",
	"messageOutOpacityEnd": "0",
	"messageOutXTransformStart": "0",
	"messageOutXTransformEnd": "-100",
	"messageOutYTransformStart": "0",
	"messageOutYTransformEnd": "0",
	"messageOutBlurStart": "0",
	"messageOutBlurEnd": "0",
	"messageOutScaleXStart": "100",
	"messageOutScaleXEnd": "100",
	"messageOutScaleYStart": "100",
	"messageOutScaleYEnd": "100",
	"messageOutSkewXStart": "0",
	"messageOutSkewXEnd": "0",
	"messageOutSkewYStart": "0",
	"messageOutSkewYEnd": "0",
	"messageOutRotateStart": "0",
	"messageOutRotateEnd": "0",
	"messageOutBrightnessStart": "100",
	"messageOutBrightnessEnd": "100",
	"messageOutContrastStart": "100",
	"messageOutContrastEnd": "100",
	"messageOutSaturateStart": "100",
	"messageOutSaturateEnd": "100",
	"messageOutHueRotateStart": "0",
	"messageOutHueRotateEnd": "0",
	"chatHistoryOriginPoint": "center center",
	"sound_newMsg_URL": "sounds/woosh-1.ogg",
	"sound_newMsg_Volume": "50",
	"sound_newMsg_Delay": "0.15",
	"sound_newMsg_PitchRandMin": "85",
	"sound_newMsg_PitchRandMax": "150",
	"sound_newMsg_Enabled": "false",
	"playSoundOnSystemMessages": "false",
	"playSoundOnEmoteOnlyMessages": "false",
	"enableConstantNoiseToFixCEFBeingWeird": "false",
	"noiseLowpassHz": "400",
	"noiseVolume": "5",
	"ajaxTimeout": "4",
	"sound_newMsg_CustomURLs": "",
	"avatarAllowedIncludeTotalMessages": "false",
	"avatarAllowedMessageThreshold": "200",
	"obs_ip": "127.0.0.1",
	"obs_port": "4455",
	"obs_password": "",
	"obs_usePassword": "false",
	"bsvodaudio_audioSource": "",
	"bsvodaudio_vodAudioTrack": "2",
	"bsvodaudio_syncRemoteDBs": "true",
	"bsvodaudio_remoteDBURLs": "https://gist.githubusercontent.com/TheBlackParrot/ea2126f4f2af4f47455cd072d2e975e5/raw/db.json",
	"bsplus_ip": "127.0.0.1",
	"bsplus_port": "2947",
	"bsvodaudio_muteOnConflict": "true",
	"bsvodaudio_muteOnUnknown": "true",
	"bsvodaudio_muteOnMenu": "true",
	"enableAvatarsAsBackground": "false",
	"avatarsBGSize": "400",
	"avatarsBGHorizontalPadding": "5",
	"avatarsBGVerticalPadding": "5",
	"avatarsBGBorderRadius": "8",
	"avatarsBGStartOpacity": "100",
	"avatarsBGEndOpacity": "0",
	"avatarsBGStartFadeAt": "5",
	"avatarsBGEndFadeAt": "60",
	"avatarsBGFadeAngle": "155",
	"avatarsBGAnimateAppearance": "false",
	"avatarsBGAnimationDuration": "1",
	"avatarsBGAnimationDelay": "0.2",
	"avatarsBGAnimationTimingFunc": "EaseOutCubic",
	"applyGradientToBadges": "false",
	"badgeGradientColorStart": "#777777",
	"badgeGradientColorEnd": "#000000",
	"badgeGradientAngle": "150",
	"badgeGradientStart": "0",
	"badgeGradientEnd": "80",
	"badgeGradientBlendMode": "plus-lighter",
	"enableEventTagsSubs": "true",
	"enableEventTagsBits": "true",
	"eventTagsResubFormat": "%tier resubscription (%amount months)",
	"eventTagsCheerFormat": "cheered %amount bits",
	"eventTagsNewSubFormat": "new %tier subscription",
	"eventTagsColor": "#FFFFFF",
	"eventTagsFont": "Manrope",
	"eventTagsFontSize": "12",
	"eventTagsFontWeight": "900",
	"eventTagsFontWeightExtra": "0.6",
	"eventTagsLetterSpacing": "0.4",
	"eventTagsTransform": "uppercase",
	"eventTagsLineHeight": "28",
	"useNewerEmojiRegex": "false",
	"use3dTransformsOnAnimations": "true",
	"enableAffiliateBadges": "false",
	"enableBotBadges": "true",
	"autoHideAllKnownBots": "true",
	"chatNameUsesProminentColor": "false",
	"avatarsBGBorder": "false",
	"avatarsBGBorderColor": "#FFFFFF40",
	"avatarsBGBorderSize": "1",
	"avatarsBGBorderStyle": "solid",
	"allowConsoleMessages": "false",
	"useLowQualityImages": "false",
	"gradientFadeMaskEnabled": "false",
	"gradientFadeMaskAngle": "0",
	"gradientFadeMaskStart": "67",
	"gradientFadeMaskEnd": "99",
	"messageBlockDirection": "false",
	"eventTagsPlanNamePrime": "Twitch Prime",
	"eventTagsPlanNameTier1": "Tier 1",
	"eventTagsPlanNameTier2": "Tier 2",
	"eventTagsPlanNameTier3": "Tier 3",
	"keepAmountOfBackups": "100",
	"messageOffsetVertical": "0",
	"messageOffsetHorizontal": "0",
	"userInfoOffsetVertical": "0",
	"userInfoOffsetHorizontal": "0",
	"spotify_enableScannable": "true",
	"spotify_enableArt": "true",
	"spotify_artSize": "52",
	"spotify_enableArtOutline": "true",
	"spotify_artOutlineSize": "2",
	"spotify_overlayMargin": "12",
	"spotify_elementSpacing": "12",
	"spotify_enableArtOutlineProgress": "true",
	"spotify_titleFontFamily": "Manrope",
	"spotify_titleFontSize": "19",
	"spotify_titleFontWeight": "900",
	"spotify_titleAdditionalFontWeight": "0.2",
	"spotify_titleTransform": "none",
	"spotify_artistFontFamily": "Manrope",
	"spotify_artistFontSize": "12",
	"spotify_artistFontWeight": "900",
	"spotify_artistAdditionalFontWeight": "0",
	"spotify_artistTransform": "none",
	"spotify_enableOutlineEffects": "true",
	"spotify_outlineColor": "#000000",
	"spotify_enableShadowEffects": "true",
	"spotify_shadowColor": "#000000",
	"spotify_shadowXOffset": "0",
	"spotify_shadowYOffset": "1",
	"spotify_shadowBlurRadius": "2",
	"spotify_enableBoxShadowEffects": "true",
	"spotify_boxShadowColor": "#000000DD",
	"spotify_boxShadowXOffset": "0",
	"spotify_boxShadowYOffset": "8",
	"spotify_boxShadowBlurRadius": "9",
	"spotify_boxShadowBlurInset": "-5",
	"spotify_refreshInterval": "15",
	"spotify_progressInterval": "1",
	"spotify_enableMarquee": "true",
	"spotify_marqueeDelay": "7",
	"spotify_marqueeGap": "100",
	"spotify_marqueeSpeed": "20",
	"spotify_titleColor": "#FFFFFF",
	"spotify_artistColor": "#AAAAAA",
	"spotify_artistColorReflectsArtColor": "true",
	"spotify_artistGradient": "true",
	"spotify_artistGradientColor": "#FFFFFF",
	"spotify_artistGradientAngle": "170",
	"spotify_scannableUseBlack": "false",
	"spotify_artistColorReflectsArtColorDarker": "false",
	"chatNameFontItalic": "false",
	"chatMessageFontItalic": "false",
	"eventTagsFontItalic": "false",
	"pronounsFontItalic": "false",
	"spotify_titleFontItalic": "false",
	"spotify_artistFontItalic": "false",
	"timestampFontItalic": "false",
	"chatMessageBackgroundColor": "#00000000",
	"chatMessageBackgroundReflectUserColor": "false",
	"chatMessageBackgroundUserColorAmount": "20",
	"chatMessagePaddingVertical": "0",
	"chatMessagePaddingHorizontal": "0",
	"chatMessageBorderRadius": "0",
	"chatMessageOutlines": "false",
	"chatMessageOutlinesColor": "#FFFFFF",
	"chatMessageOutlinesReflectUserColor": "false",
	"chatMessageOutlinesUserColorAmount": "100",
	"chatMessageOutlinesSize": "1",
	"chatMessageOutlinesStyle": "solid",
	"allowModeratorsToRefresh": "false",
	"allowParrotToRefresh": "false",
	"bigNoNoWords": "faggot\nhermie\nmongol\nmongoloid\nnigga\nnigger\nraghead\nretard\nretarded\nshemale\ntrannie\ntranny\ntransexual\ntranssexual\nphaggot",
	"bigNoNoWordsWordSpecific": "fag\nnig\nrape\ntard\nphag\nmong",
	"spotify_hideOnPause": "true",
	"spotify_artBorderRadius": "4",
	"spotify_scannableBorderRadius": "16",
	"spotify_scannableGradientAngle": "170",
	"spotify_scannableGradientColorStart": "#FFFFFF",
	"spotify_scannableGradientPercentStart": "10",
	"spotify_scannableGradientColorEnd": "#333333",
	"spotify_scannableGradientPercentEnd": "80",
	"spotify_scannableGradientBlendMode": "soft-light",
	"spotify_enableScannableGradient": "true",
	"cmdEnableBSR": "true",
	"spotify_enableArtistAlbumCycle": "true",
	"spotify_artistAlbumCycleDelay": "10",
	"spotify_enableAnimations": "true",
	"clock_overlayMarginHorizontal": "8",
	"clock_overlayMarginVertical": "8",
	"clock_elementSpacing": "4",
	"clock_enableShadowEffects": "true",
	"clock_shadowColor": "#000000",
	"clock_shadowXOffset": "0",
	"clock_shadowYOffset": "1",
	"clock_shadowBlurRadius": "2",
	"clock_enableOutlineEffects": "true",
	"clock_outlineColor": "#000000",
	"clock_headerFont": "Manrope",
	"clock_headerFontItalic": "false",
	"clock_headerFontSize": "12",
	"clock_headerFontWeight": "900",
	"clock_headerFontWeightExtra": "0.7",
	"clock_headerLetterSpacing": "0",
	"clock_clockFont": "Manrope",
	"clock_clockFontItalic": "false",
	"clock_clockFontSize": "27",
	"clock_clockFontWeight": "900",
	"clock_clockFontWeightExtra": "1",
	"clock_clockLetterSpacing": "-1",
	"clock_secondsFont": "Manrope",
	"clock_secondsFontItalic": "false",
	"clock_secondsFontSize": "21",
	"clock_secondsFontWeight": "900",
	"clock_secondsFontWeightExtra": "0.9",
	"clock_secondsLetterSpacing": "-1",
	"clock_headerColor": "#A695FF",
	"clock_headerAdaptColor": "false",
	"clock_use12Hour": "false",
	"clock_clockColor": "#FFFFFF",
	"clock_clockAdaptColor": "false",
	"clock_meridiemFont": "Manrope",
	"clock_meridiemFontItalic": "false",
	"clock_meridiemFontSize": "12",
	"clock_meridiemFontWeight": "900",
	"clock_meridiemFontWeightExtra": "0.5",
	"clock_meridiemLetterSpacing": "1",
	"clock_padHour": "true",
	"internationalNameMargin": "12",
	"internationalNameSize": "75",
	"internationalNameWeightScaling": "50",
	"internationalNameSaturation": "33",
	"panel_primaryColor": "#cbadff",
	"spotify_scannableHeight": "48",
	"spotify_lineHeight": "24",
	"spotify_useRTL": "false",
	"spotify_flipDetails": "false",
	"spotify_artOutlineBrightness": "155",
	"spotify_showSingleIfSingle": "true",
	"enableTwitchEventBadges": "true",
	"chatNameUsesProminentColorAsFallback": "true",
	"enableBadgeBorder": "false",
	"badgeBorderColor": "#ffffff50",
	"badgeBorderSize": "1",
	"badgeBorderStyle": "solid",
	"hideCustomRewardMessages": "false",
	"enableCustomBadges_subscriber": "true",
	"enableCustomBadges_bits": "true",
	"clock_elementWidth": "192",
	"clock_elementJustify": "center",
	"clock_headerTransform": "uppercase",
	"clock_showLocalTime": "true",
	"clock_showStreamUptime": "false",
	"clock_showAdTimer": "false",
	"clock_condenseClocks": "true",
	"clock_showClocksFor": "7",
	"clock_fadeDuration": "0.5",
	"clock_ignoreHour": "true",
	"clock_localTimeHeaderString": "%zi / GMT%zo",
	"clock_streamUptimeHeaderString": "Uptime",
	"clock_nextAdHeaderString": "Next Ad In",
	"enableEventTagsChannelPoints": "true",
	"eventTagsChannelPointFormat": "%name (%amount)",
	"channelIsOwn": "false",
	"spotify_waitCheck": "0.5",
	"alternateCornerAlignment": "false",
	"enableEventTagsWatchStreaks": "true",
	"eventTagsWatchStreakFormat": "watched %amount streams in a row (%reward)",
	"spotify_scannableUsesCustomBGColor": "false",
	"spotify_scannableCustomBGColor": "#333333",
	"spotify_scannableFGColor": "#FFFFFF",
	"spotify_scannableFGDark": "false",
	"spotify_enableArtBackground": "false",
	"spotify_artBackgroundMaskWidth": "100",
	"spotify_artBackgroundMaskHeight": "100",
	"spotify_artBackgroundMaskStart": "25",
	"spotify_artBackgroundMaskEnd": "100",
	"spotify_artBackgroundBlurAmount": "12",
	"spotify_artBackgroundFadeInDuration": "4",
	"spotify_artBackgroundOpacity": "75",
	"delayChat": "2",
	"spotify_enableArtBackgroundMask": "true",
	"spotify_ensureColorIsBrightEnough": "true",
	"spotify_colorMinBrightness": "30",
	"spotify_colorMaxBrightness": "100",
	"enableEventTagsAnnouncements": "true",
	"eventTagsAnnouncementFormat": "announcement",
	"avatarsBGBlurAmount": "6",
	"spotify_invertFGThreshold": "56",
	"spotify_useInvertedFGIfNeeded": "true",
	"bs_easyDiffName": "Easy",
	"bs_normalDiffName": "Normal",
	"bs_hardDiffName": "Hard",
	"bs_expertDiffName": "Expert",
	"bs_expertPlusDiffName": "Expert+",
	"bs_expertPlusDiffColor": "#A695FF",
	"bs_expertDiffColor": "#FF95A6",
	"bs_hardDiffColor": "#FFB74D",
	"bs_normalDiffColor": "#00EEFF",
	"bs_easyDiffColor": "#81C784",
	"bs_elementOrder": "misc,art,metadata,hitmiss,acc",
	"bs_elementSpacing": "12",
	"bs_overlayMarginHorizontal": "12",
	"bs_overlayMarginVertical": "12",
	"bs_overlayHeight": "56",
	"bs_artSize": "52",
	"bs_artBorderRadius": "4",
	"bs_enableArtOutline": "true",
	"bs_enableArtOutlineProgress": "true",
	"bs_artOutlineSize": "2",
	"bs_artOutlineBrightness": "155",
	"bs_enableArtBackground": "false",
	"bs_enableArtBackgroundMask": "true",
	"bs_artBackgroundMaskWidth": "80",
	"bs_artBackgroundMaskHeight": "100",
	"bs_artBackgroundMaskStart": "25",
	"bs_artBackgroundMaskEnd": "100",
	"bs_artBackgroundOpacity": "75",
	"bs_artBackgroundBlurAmount": "12",
	"bs_artBackgroundFadeInDuration": "5",
	"bs_flipMetadataDetails": "false",
	"bs_flipMiscInfoDetails": "false",
	"bs_useRemoteArtURL": "false",
	"bs_titleColor": "#FFFFFF",
	"bs_titleFontFamily": "Manrope",
	"bs_titleFontItalic": "false",
	"bs_titleFontSize": "19",
	"bs_titleFontWeight": "900",
	"bs_titleAdditionalFontWeight": "0.2",
	"bs_titleTransform": "none",
	"bs_artistColorReflectsArtColor": "true",
	"bs_artistColorReflectsArtColorDarker": "false",
	"bs_artistColor": "#AAAAAA",
	"bs_ensureColorIsBrightEnough": "true",
	"bs_colorMinBrightness": "30",
	"bs_colorMaxBrightness": "100",
	"bs_enableArtistMapperCycle": "true",
	"bs_artistMapperCycleDelay": "10",
	"bs_artistFontFamily": "Manrope",
	"bs_artistFontItalic": "false",
	"bs_artistFontSize": "12",
	"bs_artistFontWeight": "700",
	"bs_artistAdditionalFontWeight": "0",
	"bs_artistTransform": "none",
	"bs_miscInfoWidth": "120",
	"bs_hitMissWidth": "100",
	"bs_flipHitMissDetails": "false",
	"bs_accWidth": "120",
	"bs_flipAccDetails": "false",
	"bs_enableOutlineEffects": "true",
	"bs_outlineColor": "#000000",
	"bs_enableShadowEffects": "true",
	"bs_shadowColor": "#000000",
	"bs_shadowXOffset": "0",
	"bs_shadowYOffset": "1",
	"bs_shadowBlurRadius": "2",
	"bs_enableBoxShadowEffects": "true",
	"bs_boxShadowColor": "#000000DD",
	"bs_boxShadowXOffset": "0",
	"bs_boxShadowYOffset": "8",
	"bs_boxShadowBlurRadius": "9",
	"bs_boxShadowBlurInset": "-5",
	"bs_diffFontSize": "15",
	"bs_timeFontSize": "12",
	"bs_miscInfoColor": "#FFFFFF",
	"bs_miscInfoFontFamily": "Manrope",
	"bs_miscInfoFontItalic": "false",
	"bs_hitMissColor": "#FFFFFF",
	"bs_hitMissFontFamily": "Manrope",
	"bs_hitMissFontItalic": "false",
	"bs_hitMissFontSize": "12",
	"bs_hitMissFontWeight": "900",
	"bs_FCIconColor": "#DDAA00",
	"bs_hitIconColor": "#33AA55",
	"bs_missIconColor": "#DD1133",
	"bs_accColor": "#FFFFFF",
	"bs_accFontFamily": "Manrope",
	"bs_accFontItalic": "false",
	"bs_accFontSize": "27",
	"bs_accFontWeight": "900",
	"bs_accFontAdditionalWeight": "0",
	"bs_accLetterSpacing": "-1",
	"bs_comboColor": "#FFFFFF",
	"bs_comboFontFamily": "Manrope",
	"bs_comboFontItalic": "false",
	"bs_comboFontSize": "12",
	"bs_comboFontWeight": "900",
	"bs_animateAccChanges": "true",
	"bs_animateAccInterval": "10",
	"bs_enableMarquee": "true",
	"bs_marqueeDelay": "7",
	"bs_marqueeSpeed": "20",
	"bs_marqueeGap": "100",
	"bs_desaturateOnPause": "true",
	"bs_desaturateAmount": "100",
	"bs_desaturateFadeInDuration": "0.5",
	"bs_desaturateFadeOutDuration": "2",
	"bs_hideOnMenu": "true",
	"panel_minWidth": "500",
	"bs_miscInfoAlignment": "center",
	"bs_metadataAlignment": "start",
	"bs_hitMissAlignment": "left",
	"bs_accAlignment": "center",
	"bs_miscInfoFontWeight": "900",
	"bs_hitMissFontAdditionalWeight": "0",
	"bs_secondaryGradient": "true",
	"bs_secondaryGradientColor": "#FFFFFF",
	"bs_secondaryGradientAngle": "170",
	"spotify_showLabel": "false",
	"spotify_showYear": "false",
	"spotify_enableScannableOutlines": "false",
	"spotify_scannableOutlinesColor": "#FFFFFF40",
	"spotify_scannableOutlinesSize": "1",
	"spotify_scannableOutlinesStyle": "solid",
	"spotify_renderArtLower": "false",
	"bs_comboFontAdditionalWeight": "0",
	"datapuller_port": "2946",
	"beatSaberDataMod": "bsplus",
	"bs_forceBeatSaverData": "false",
	"bs_maxCollaborators": "5",
	"bs_renderArtLower": "false",
	"clips_durationPreferenceMin": "10",
	"clips_durationPreferenceMax": "30",
	"clips_onlyFetchFeatured": "true",
	"clips_listSize": "20",
	"clips_useRandom": "true",
	"clips_videoHeight": "360",
	"clips_enableAnimations": "true",
	"clips_triggerCommand": "!clip",
	"clips_videoRadius": "8",
	"clips_preferredResolution": "480",
	"clips_detailsAlignment": "center",
	"clips_streamerFont": "Manrope",
	"clips_streamerFontItalic": "false",
	"clips_streamerFontSize": "24",
	"clips_streamerFontWeight": "900",
	"clips_streamerFontAdditionalWeight": "0",
	"clips_titleFont": "Manrope",
	"clips_titleFontItalic": "false",
	"clips_titleFontSize": "18",
	"clips_titleFontWeight": "900",
	"clips_titleFontAdditionalWeight": "0",
	"clips_detailsFont": "Manrope",
	"clips_detailsFontItalic": "false",
	"clips_detailsFontSize": "12",
	"clips_detailsFontWeight": "900",
	"clips_enableShadowEffects": "true",
	"clips_shadowColor": "#000000FF",
	"clips_shadowXOffset": "0",
	"clips_shadowYOffset": "1",
	"clips_shadowBlurRadius": "2",
	"clips_enableOutlineEffects": "true",
	"clips_outlineColor": "#000000FF",
	"clips_enableBoxShadowEffects": "true",
	"clips_boxShadowColor": "#000000",
	"clips_boxShadowXOffset": "0",
	"clips_boxShadowYOffset": "12",
	"clips_boxShadowBlurRadius": "20",
	"clips_boxShadowBlurInset": "-10",
	"clips_enableVideoBorder": "true",
	"clips_borderColor": "#FFFFFF50",
	"clips_borderSize": "1",
	"clips_borderStyle": "solid",
	"clips_streamerUsesGradient": "true",
	"clips_streamerColor": "#CBADFF",
	"clips_streamerGradientColor": "#FFFFFF",
	"clips_streamerGradientAngle": "170",
	"clips_titleUsesGradient": "true",
	"clips_titleColor": "#999999",
	"clips_titleGradientColor": "#FFFFFF",
	"clips_titleGradientAngle": "170",
	"clips_detailsColor": "#FFFFFF",
	"clips_showDetails": "true",
	"clips_overlayMargin": "16",
	"clips_elementSpacing": "12",
	"clips_blurStreamerBG": "true",
	"clips_blurStreamerBGAmount": "16",
	"clips_blurDetailsBG": "true",
	"clips_blurDetailsBGAmount": "16",
	"clips_allowRaidersToUse": "true",
	"bs_metadataLineHeight": "26",
	"bs_miscInfoLineHeight": "24",
	"bs_hitMissLineHeight": "16",
	"bs_accLineHeight": "21",
	"overlayOutlineOrder": "5",
	"overlayOutlineDivisor": "3",
	"overlayOutlineStripCorners": "true",
	"overlayOutlineThreshold": "0.2",
	"bs_outlineOrder": "5",
	"bs_outlineDivisor": "3",
	"bs_outlineStripCorners": "true",
	"bs_outlineThreshold": "0.2",
	"clips_outlineOrder": "5",
	"clips_outlineDivisor": "3",
	"clips_outlineStripCorners": "true",
	"clips_outlineThreshold": "0.2",
	"spotify_outlineOrder": "5",
	"spotify_outlineDivisor": "3",
	"spotify_outlineStripCorners": "true",
	"spotify_outlineThreshold": "0.2",
	"clock_outlineOrder": "5",
	"clock_outlineDivisor": "3",
	"clock_outlineStripCorners": "true",
	"clock_outlineThreshold": "0.2"
};
// i typed out the bigNoNoWords so you don't have to, i'm sorry :(
// it's gotta know what to remove

for(let setting in defaultConfig) {
	if(localStorage.getItem(`setting_${setting}`) === null) {
		console.log(`saving default value for setting ${setting}`);
		localStorage.setItem(`setting_${setting}`, defaultConfig[setting]);
	}
}