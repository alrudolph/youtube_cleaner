$(() => {

    /*
        Toggle elements on/off:
    */

    const toggle = (elem, state) => {
        if (state) {
            $(elem).hide();
        }
        else {
            $(elem).show();
        }
    }
    
    const removeSidebar = state => {
        toggle('#secondary', state);
    };
    
    const removeMerch = state => {
        toggle('#merch-shelf', state);
    };
    
    const removeMeta = state => {
        toggle('ytd-metadata-row-container-renderer', state);
    }
    
    /*
        Load saved settings:
    */

    const getState = (which, callback) => {
        chrome.storage.sync.get(which, callback)
    }

    getState('sidebar', ({ sidebar }) => {
        removeSidebar(sidebar);
    });

    getState('merch', ({ merch }) => {
        removeMerch(merch);
    });

    getState('meta', ({ meta }) => {
        removeMeta(meta);
    });

    /*
        Listen to popup:
    */

    chrome.runtime.onMessage.addListener(msg => {
        switch (msg.which) {
            case 'sidebar': {
                removeSidebar(msg.checked);
            } break;
            case 'merch': {
                removeMerch(msg.checked);
            } break;
            case 'meta': {
                removeMeta(msg.checked);
            } break;
        }
    });

});