
webroot/data.xml: data.txt
	awk -F'\t' ' \
		BEGIN { print "<data>" } \
		/^[^#]/ { printf "<event start=\"" $$1 "\" "; \
			if ($$2) { printf "end=\"" $$2 "\" "; } \
			gsub(/\"/, "\&quot;", $$3); \
			print "title=\"" $$3 "\"/>" } \
		END { print "</data>" }' data.txt > webroot/data.xml

all: webroot/data.xml

libs:
	rm -rf webroot/timeline
	svn co http://simile.mit.edu/repository/timeline/trunk/src/webapp/api/ webroot/timeline
	find webroot/timeline -name ".svn" -type d -print0 | xargs -0 rm -rf
