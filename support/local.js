var tl;
function onLoad() {
	
	var theme = Timeline.ClassicTheme.create();
	theme.event.track.gap = 15.0;
	theme.event.tape.height = 3.0;
	theme.event.instant.icon = 'support/debian_sm.png';
	theme.event.duration.color = '#FF6666';
	theme.ether.backgroundColors[3] = "#E8E8F4";

	var events = new Timeline.DefaultEventSource();
	var releases = new Timeline.DefaultEventSource();
	var release_eras = new Timeline.DefaultEventSource();

	// TODO: Make this always be 'last month'
	var date = '01 July 2008';
	var bandInfos = [
		Timeline.createBandInfo({
			eventSource:    events,
			width:          "57%", 
			intervalUnit:   Timeline.DateTime.MONTH, 
			intervalPixels: 100,
			date:		date,
			theme:		theme
		}),
		Timeline.createBandInfo({
			eventSource:    release_eras,
			width:          "10%", 
			intervalUnit:   Timeline.DateTime.YEAR, 
			intervalPixels: 500,
			date:		date,
			theme:		theme
		}),
		Timeline.createBandInfo({
			eventSource:    releases,
			width:          "26%", 
			intervalUnit:   Timeline.DateTime.YEAR, 
			intervalPixels: 500,
			date:		date,
			theme:		theme
		}),
		Timeline.createBandInfo({
			eventSource:    releases,
			width:          "7%", 
			intervalUnit:   Timeline.DateTime.YEAR, 
			intervalPixels: 70,
			date:		date,
			theme:		theme,
			overview:	true
		})
	];
	bandInfos[1].highlight = true;
	bandInfos[1].syncWith = 0;
	bandInfos[2].highlight = true;
	bandInfos[2].syncWith = 0;
	bandInfos[3].highlight = true;
	bandInfos[3].syncWith = 0;

	tl = Timeline.create(document.getElementById("the-timeline"), bandInfos);
	Timeline.loadXML("xml/events.xml", function(xml, url) { events.loadXML(xml, url); });
	Timeline.loadXML("xml/releases.xml", function(xml, url) { releases.loadXML(xml, url); });
	Timeline.loadXML("xml/release_eras.xml", function(xml, url) { release_eras.loadXML(xml, url); });
}

var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}
