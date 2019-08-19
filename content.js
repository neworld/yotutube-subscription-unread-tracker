function markReadContent() {
    chrome.storage.sync.get("boundary", function(result) {
        var boundaryList = result.boundary;
        if (!Array.isArray(boundaryList)) {
            return;
        }

        var markedZone = false;
        $('a#thumbnail').each(function() {
            if (!markedZone) {
                var url = $(this).attr("href");
                if (url != undefined) {
                    var id = url.split("?v=")[1];
                    if (boundaryList.includes(id)) {
                        markedZone = true;
                    }
                }
            }

            if (markedZone) {
                $(this).css({ opacity: 0.2 });
            }
        });
    });
}

function addButton() {
    cleanup();

    var button = $('<a class="style-scope ytd-button-renderer style-blue-text size-default"/>');
    button.text("MARK AS READ");
    button.attr({id: "mark-as-read" });
    button.css({ 
        color: "rgb(62, 166, 255)",
        padding: "0.7em 0.57em",
        size: "1.8rem",
        fontFamily: "Roboto, Arial, sans-serif",
        cursor: "pointer",
        position: "absolute"
    });
    button.prependTo($('#page-manager'));
    button.click(save);
}

function save() {
    var list = [];
    var views = $('a#thumbnail').slice(0, 10).each(function() {
        var url = $(this).attr("href");
        var id = url.split("?v=")[1];
        list.push(id);
    });

    chrome.storage.sync.set({boundary : list}, function() {
        markReadContent();
    });
}

function listenMutations() {
    var targetNodes         = $("#primary");
    var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver;
    var myObserver          = new MutationObserver (mutationHandler);
    var obsConfig           = { childList: true, characterData: false, attributes: false, subtree: true };

    //--- Add a target node to the observer. Can only add one node at a time.
    targetNodes.each ( function () {
        myObserver.observe (this, obsConfig);
    } );

    function mutationHandler (mutationRecords) {
        if (!isEnabled()) return;

        var found = false;

        mutationRecords.forEach ( function (mutation) {
            if (typeof mutation.addedNodes == "object") {
                var added = $(mutation.addedNodes);

                if (added.is('ytd-grid-video-renderer')) {
                    found = true;
                }
            }
        } );

        if (found) {
            markReadContent();
        }
    }
}

function isEnabled() {
    return window.location.pathname == '/feed/subscriptions'
}

function enableIfNeeded() {
    if (isEnabled()) {
        addButton();
        markReadContent();
    } else {
        cleanup();
    }
}

function cleanup() {
    $('#mark-as-read').remove();
}

$(document).ready(function () {
    listenMutations();

    enableIfNeeded();

    window.addEventListener("spfdone", enableIfNeeded); // old youtube design
    window.addEventListener("yt-navigate-finish", enableIfNeeded); // new youtube design
});
