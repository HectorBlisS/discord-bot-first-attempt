import express, { Response, Request } from "express";

export type BlissmoReq = Request & {
  json?: Record<string, string | number | boolean>;
};

export default function (req: BlissmoReq, _: Response, next: () => void) {
  if (req.method === "GET") {
    next();
    return;
  }
  // if (req.originalUrl !== "/webhooks") {
  //   express.json()(req, res, next);
  // } else {
  //   express.raw({ type: "application/json" })(req, res, next);
  // }
  let data = "";
  req.setEncoding("utf8");
  req.on("data", function (chunk: string) {
    data += chunk;
  });

  req.on("end", function () {
    req.body = data;
    req.json = JSON.parse(data);
    next();
  });
}
