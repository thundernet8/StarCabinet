declare var window;

const SCLogger = log => {
    // only on debug mode
    if (!window._DEBUG_) { return; }

    typeof log === "object" ? console.dir(log) : console.log(log);
};

export default SCLogger;
