INPUT	:= $(wildcard data/*)
OUTPUT	:= $(addsuffix .xml,$(subst data/,xml/,$(basename $(INPUT))))
DESTDIR := /
TARGET  := $(DESTDIR)/usr/share/debian-timeline

all: build

xml/%.xml: data/%
	@mkdir -p xml
	./build.py $< >$@

build: $(OUTPUT)

clean:
	rm -rf xml

install: build
	install -d $(TARGET)
	install -m644 -t $(TARGET) index.html 
	set -e; for DIR in media xml; do \
		install -d $(TARGET)/$$DIR; \
		install -m644 -t $(TARGET)/$$DIR $$DIR/*; \
	done

libs:
	rm -rf support/timeline support/simile-ajax
	svn co http://simile.mit.edu/repository/timeline/trunk/src/webapp/api/ support/timeline
	svn co http://simile.mit.edu/repository/ajax/trunk/src/webapp/api/ support/simile-ajax
	find support/ -name ".svn" -type d -print0 | xargs -0 rm -rf
