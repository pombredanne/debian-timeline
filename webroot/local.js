var tl;
var bandInfos;
function onLoad() {
  var eventSource = new Timeline.DefaultEventSource();
  bandInfos = [
    Timeline.createBandInfo({
        eventSource:    eventSource,
        date:           "Jan 1 2008 00:00:00 GMT",
        width:          "70%", 
        intervalUnit:   Timeline.DateTime.MONTH, 
        intervalPixels: 100
    }),
    Timeline.createBandInfo({
        eventSource:    eventSource,
        date:           "Jan 1 2008 00:00:00 GMT",
        width:          "30%", 
        intervalUnit:   Timeline.DateTime.YEAR, 
        intervalPixels: 200,
	overview:       true
    })
  ];
  bandInfos[1].syncWith = 0;
  bandInfos[1].highlight = true;


	var releases = [
		["buzz", "June 17 1996"],
		["rex", "December 12 1996"],
		["bo", "June 5 1997"],
		["hamm", "July 24 1998"],
		["slink", "March 9 1999"],
		["potato", "August 15 2000"],
		["woody", "July 19 2002"],
		["sarge", "June 6 2005"],
		["etch", "April 8 2007"],
		["lenny", "December 1 2008"],
	];

	var release_decorators = []
	for (var i = 0; i < releases.length - 1; i++) {
		release_decorators.push(new Timeline.SpanHighlightDecorator({
			startDate:  releases[i][1] + " 00:00:00 GMT+000",
			endDate:    releases[i + 1][1] + " 00:00:00 GMT+0000",
			color:      "#FFC080",
			opacity:    (i % 2) ? 20 : 0,
			startLabel: releases[i][0],
			endLabel:   "",
			theme:      theme
		}));
	}

	var theme = Timeline.ClassicTheme.create();
	for (var i = 0; i < bandInfos.length; i++) {
		bandInfos[i].decorators = release_decorators;
	}

	tl = Timeline.create(document.getElementById("the-timeline"), bandInfos);
	Timeline.loadXML("data.xml", function(xml, url) { eventSource.loadXML(xml, url); });
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
