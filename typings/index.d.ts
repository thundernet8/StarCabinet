interface Promise<T> {
    finally: (callback) => Promise<T>;
}
