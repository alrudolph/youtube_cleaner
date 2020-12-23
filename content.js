$(() => {

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
    
    // Remove on start up
    removeSidebar(true);
    removeMerch(true);
    removeMeta(true);

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        switch (msg.which) {
            // popup requesting status
            case 'status': {
                sendResponse({
                    sidebar: $('#secondary').is(':hidden'),
                    merch: $('#merch-shelf').is(':hidden'),
                    meta: $('ytd-metadata-row-container-renderer').is(':hidden') 
                });
            } break;
            // popup clicked sidebar
            case 'sidebar': {
                removeSidebar(msg.checked);
            } break;
            // popup clicked merch
            case 'merch': {
                removeMerch(msg.checked);
            } break;
            // popup clicked meta
            case 'meta': {
                removeMeta(msg.checked);
            } break;
        }
    });
    
});