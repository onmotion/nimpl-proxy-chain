import { NextResponse } from "next/server";

import { type Summary } from "./types";
import { NEXT_PROXY_HEADER } from "./constants";

type MiddlewareResponseInit = Parameters<typeof NextResponse.next>[0];

export const formatResponse = (summary: Summary) => {
    const nextConfig: MiddlewareResponseInit = {
        status: summary.status,
        statusText: summary.statusText,
        headers: summary.headers,
        request: {
            headers: summary.requestHeaders,
        },
    };
    let next: NextResponse;
    if (summary.type === "json") {
        next = NextResponse.json(summary.body);
    } else if (summary.type === "redirect") {
        next = NextResponse.redirect(summary.destination!, nextConfig);
    } else if (summary.type === "rewrite") {
        next = NextResponse.rewrite(summary.destination!, nextConfig);
    } else if (summary.type === "custom") {
        next = new NextResponse(summary.body, nextConfig);
        next.headers.delete(NEXT_PROXY_HEADER); // Stop proxying the custom response to the next middleware
        summary.headers.delete(NEXT_PROXY_HEADER);
    } else {
        next = NextResponse.next(nextConfig);
    }

    summary.cookies.forEach((cookie) => {
        next.cookies.set(cookie.name, cookie.value, cookie);
    });

    return next;
};
