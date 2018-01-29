import GlobalStore from "./GlobalStore";
import MainStore from "./MainStore";

export default function getStore() {
    const globalStore = new GlobalStore();
    const store = {
        global: globalStore,
        main: new MainStore(globalStore)
    };

    return store;
}
