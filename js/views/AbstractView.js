export default class AbstractView {
    constructor() {
        this.params = {};
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }

    // Called after the HTML is injected into the DOM
    init() {
        // Override in subclasses for event listeners etc.
    }

    // Optional cleanup logic
    cleanup() {
        // Override in subclasses to remove listeners etc.
    }
}
