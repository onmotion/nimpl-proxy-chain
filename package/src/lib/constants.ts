export const REWRITE_HEADER = "x-middleware-rewrite";
export const NEXT_PROXY_HEADER = "x-middleware-next";
export const REDIRECT_HEADER = "location";
export const INTERNAL_HEADERS = [REWRITE_HEADER, REDIRECT_HEADER];
export const FINAL_SYMBOL = Symbol("final-next-response");
