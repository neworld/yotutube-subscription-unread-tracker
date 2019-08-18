publish: clean
	zip -r youtube-subscription-unread-tracker.zip * -x screenshots/* -x *.git*

clean:
	rm youtube-subscription-unread-tracker.zip
