export const ezBridge = {
    submit_response: function(response) {
        window.parent.postMessage(JSON.stringify(response), '*')
    },
    get_response: function() {
        window.parent.postMessage('response', '*')
    },
    reset_response: function() {
        window.parent.postMessage('reset', '*')
    },
    request_fullscreen: function() {
        window.parent.postMessage('fullscreen', '*')
    },
    exit_fullscreen: function() {
        window.parent.postMessage('exitfullscreen', '*')
    },
    get_question: function() {
        window.parent.postMessage('question', '*')
    }
}