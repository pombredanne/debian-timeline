INPUT	:= $(wildcard data/*)
OUTPUT	:= $(addsuffix .xml,$(subst data/,xml/,$(basename $(INPUT))))

all: build

xml/%.xml: data/%
	@mkdir -p xml
	./build.py $< >$@

build: $(OUTPUT)

clean:
	rm -rf xml

libs:
	rm -rf support/timeline support/simile-ajax
	svn co http://simile.mit.edu/repository/timeline/trunk/src/webapp/api/ support/timeline
	svn co http://simile.mit.edu/repository/ajax/trunk/src/webapp/api/ support/simile-ajax
	find support/ -name ".svn" -type d -print0 | xargs -0 rm -rf
