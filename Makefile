INPUT	:= $(wildcard data/*)
OUTPUT	:= $(addsuffix .xml,$(subst data/,xml/,$(basename $(INPUT))))
DESTDIR := /
TARGET  := $(DESTDIR)/usr/share/debian-timeline

all: build check

check:
	@set -e; for LIBS in ajax js; do \
	  if [ ! -e media/timeline_$$LIBS ]; then \
	    echo "Warning - media/timeline_$$LIBS does not exist or is an invalid symlink."; \
	  fi \
	done

xml/%.xml: data/%
	@mkdir -p xml
	./build.py $< >$@

build: $(OUTPUT)

clean:
	rm -rf xml

install: build
	install -d $(TARGET)
	install -m644 -t $(TARGET) index.html __history__.html
	set -e; for DIR in media xml; do \
		install -d $(TARGET)/$$DIR; \
		install -m644 -t $(TARGET)/$$DIR `find $$DIR -mindepth 1 -type f`; \
	done

.PHONY: install clean install check
