import { chain } from "@nimpl/proxy-chain";
import { basicAuthMiddleware } from "./basicAuthMiddleware";

export default chain([
    basicAuthMiddleware,
    (req) => {
        console.log("Request summary", req.summary);
    },
]);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.well-known).*)"],
};
