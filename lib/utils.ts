export const getTodayString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDay()}`;
};

export const getFetchUrl = (url: string, query: Object) => {
    const fetchUrl = new URL(url);
    if (query) {
        for (let [key, value] of Object.entries(query)) {
            if (key === "page") {
                fetchUrl.searchParams.set(
                    "skip",
                    (Number.parseInt(value) * 12 - 12).toString()
                );
                fetchUrl.searchParams.set("limit", "12");
            } else {
                fetchUrl.searchParams.set(key, value);
            }
        }
    }
    return fetchUrl;
};

export const mergeQueryString = (
    query = {},
    name: string,
    value: string | null
) => {
    const searchParams = new URLSearchParams(query);
    if (!value && searchParams.has(name)) {
        searchParams.delete(name);
    } else if (value) {
        searchParams.set(name, value);
    }
    return "?" + searchParams.toString();
};

export const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
