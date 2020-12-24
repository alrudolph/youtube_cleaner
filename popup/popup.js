$(() => {

    const applyCheck = (which, checked) => {
        // save settings:
        chrome.storage.sync.set({ [which]: checked });

        // tell content.js to update:
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {which, checked});
        });
    };
    

    $('input#sidebar').on('change', function() {
        applyCheck("sidebar", this.checked);
    });

    $('input#meta').on('change', function() {
        applyCheck("meta", this.checked);
    });

    $('input#merch').on('change', function() {
        applyCheck("merch", this.checked);
    });

    /*
        Load saved settings:
    */

    const getState = (which, callback) => {
        chrome.storage.sync.get(which, callback)
    }
    
    getState('sidebar', ({sidebar}) => {
        $('input#sidebar')[0].checked = sidebar;
        applyCheck('sidebar', sidebar);
    });

    getState('merch', ({merch}) => {
        $('input#merch')[0].checked = merch;
        applyCheck('merch', merch);
    });

    getState('meta', ({meta}) => {
        $('input#meta')[0].checked = meta;
        applyCheck('meta', meta);
    });

});