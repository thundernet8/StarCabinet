Promise.prototype.finally = function(finaliser) {
    return this.then(
        result => {
            finaliser();
            return result;
        },
        reason => {
            finaliser();
            throw new Error(reason);
        }
    );
};
