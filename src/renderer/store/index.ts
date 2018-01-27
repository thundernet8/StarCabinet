import GlobalStore from "./GlobalStore";

export default function getStore() {
    const store = {
        global: new GlobalStore()
    };

    return store;
}
