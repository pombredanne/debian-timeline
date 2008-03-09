
webroot/%.xml: data/%.txt
	awk -F'\t' ' \
		BEGIN { print "<data>" } \
		/^[^#]/ { printf "<event start=\"" $$1 "\" "; \
			if ($$2) { printf "end=\"" $$2 "\" isDuration=\"true\" "; } \
			gsub(/\"/, "\&quot;", $$3); \
			printf "title=\"" $$3 "\">"; \
			if ($$4) { printf "&lt;a href=\"" $$4 "\"&gt;Source&lt;/a&gt;"; } \
			print "</event>"; } \
		END { print "</data>" }' $< > $@ 

all: webroot/events.xml webroot/releases.xml webroot/updates.xml

libs:
	rm -rf webroot/timeline
	svn co http://simile.mit.edu/repository/timeline/trunk/src/webapp/api/ webroot/timeline
	find webroot/timeline -name ".svn" -type d -print0 | xargs -0 rm -rf
