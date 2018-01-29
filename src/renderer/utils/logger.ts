import moment from "moment";

declare var window;

const ConsoleWrapper = {
    log: (...args) => {
        // only on debug mode
        if (!window._DEBUG_) {
            return;
        }
        console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`, ...args);
    },

    error: (...args) => {
        // only on debug mode
        if (!window._DEBUG_) {
            return;
        }
        console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`);
        console.error(...args);
    }
};

export default ConsoleWrapper;
