[Download from chrome webstore](https://chrome.google.com/webstore/detail/youtube-subscription-unre/imflbglgmnkjkkdmekachdhjhbclljhf)

This plugin helps track read content of subscriptions.
It works best if you are using subscriptions to put new videos to **watch later** list.
This plugin works differently from other plugins because it does not use YouTube API to hide videos.
Read videos are sync between browsers.
It works like marking by timestamp rather than actual videos in the list. 

Some quirks:

- Sometimes plugin does not recognize page. For such cases, page refresh should help.
- The plugin uses ~10 videos as a marker to know boundary for new and old content:
  - If you remove subscriptions, you may lose all marked videos. In such a case, the plugin shows all videos as new.
  - If you subscribe to more channels, then all older videos from this new channel are marked as read as well. 

![screenshow](screenshots/screenshot1.png)