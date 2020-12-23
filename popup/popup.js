$(() => {

    const applyCheck = msg => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, msg);
        });
    };
    
    $('input#sidebar').on('change', function() {
        applyCheck({
            which: "sidebar",
            checked: this.checked
        });
    });

    $('input#meta').on('change', function() {
        applyCheck({
            which: "meta",
            checked: this.checked
        });
    });

    $('input#merch').on('change', function() {
        applyCheck({
            which: "merch",
            checked: this.checked
        });
    });

    // Get status of elements from content.js
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { which: 'status' }, states => {
            if (states) {
                $('input#sidebar')[0].checked = states.sidebar;
                $('input#merch')[0].checked = states.merch;
                $('input#meta')[0].checked = states.meta;
            }
        });
    });

});