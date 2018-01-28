import GlobalStore from "../store/GlobalStore";
import MainStore from "../store/MainStore";

export default interface IStore {
    global: GlobalStore;
    main: MainStore;
}
