
INPUT	:= $(wildcard data/*.txt)
OUTPUT	:= $(addsuffix .xml,$(basename $(INPUT)))

all: update

data/%.xml: data/%.txt
	awk -F'\t' ' \
		BEGIN { print "<data>" } \
		/^[^#]/ { printf "<event start=\"" $$1 "\" "; \
			if ($$2) { printf "end=\"" $$2 "\" isDuration=\"true\" "; } \
			gsub(/\"/, "\\&quot;", $$3); \
			printf "title=\"" $$3 "\">"; \
			if ($$4) { printf "&lt;a href=\"" $$4 "\"&gt;Source&lt;/a&gt;"; } \
			print "</event>"; } \
		END { print "</data>" }' $< > $@ 

update: $(OUTPUT)

clean:
	rm -rf data/*.xml

libs:
	rm -rf support/timeline support/simile-ajax
	svn co http://simile.mit.edu/repository/timeline/trunk/src/webapp/api/ support/timeline
	svn co http://simile.mit.edu/repository/ajax/trunk/src/webapp/api/ support/simile-ajax
	find support/ -name ".svn" -type d -print0 | xargs -0 rm -rf
