const url = new URL(location);

export function getSearchParam(key) {
    return url.searchParams.get(key);
}

export function removeSearchParam(key) {
    return url.searchParams.delete(key);
}
