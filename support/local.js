var tl;
function onLoad() {
	
	var theme = Timeline.ClassicTheme.create();
	theme.event.track.gap = 15.0;
	theme.event.tape.height = 3.0;
	theme.event.instant.icon = 'support/debian_sm.png';
	theme.event.duration.color = '#FF6666';

	var events = new Timeline.DefaultEventSource();
	var releases = new Timeline.DefaultEventSource();
	var updates = new Timeline.DefaultEventSource();

	var date = '01 Jan 2008';
	var bandInfos = [
		Timeline.createBandInfo({
			eventSource:    events,
			width:          "55%", 
			intervalUnit:   Timeline.DateTime.MONTH, 
			intervalPixels: 100,
			date:		date,
			theme:		theme
		}),
		Timeline.createBandInfo({
			eventSource:    releases,
			width:          "10%", 
			intervalUnit:   Timeline.DateTime.YEAR, 
			intervalPixels: 500,
			date:		date,
			theme:		theme
		}),
		Timeline.createBandInfo({
			eventSource:    updates,
			width:          "45%", 
			intervalUnit:   Timeline.DateTime.YEAR, 
			intervalPixels: 500,
			date:		date,
			theme:		theme
		})
	];
	bandInfos[1].highlight = true;
	bandInfos[1].syncWith = 0;
	bandInfos[2].highlight = true;
	bandInfos[2].syncWith = 0;

	tl = Timeline.create(document.getElementById("the-timeline"), bandInfos);
	Timeline.loadXML("data/events.xml", function(xml, url) { events.loadXML(xml, url); });
	Timeline.loadXML("data/releases.xml", function(xml, url) { releases.loadXML(xml, url); });
	Timeline.loadXML("data/updates.xml", function(xml, url) { updates.loadXML(xml, url); });
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
