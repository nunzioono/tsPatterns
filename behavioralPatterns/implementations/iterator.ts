export interface IteratorInterface {
    getNext();
    hasMore();
}

export interface IterableCollection {
    createIterator();
}

