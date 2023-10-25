import { Request, Response } from "express";
import { cwd } from "process";

export function publishMessageToTimelinePresenter(_req: Request, res: Response) {
    res.sendFile('./public/index.html', { root: cwd() });
}
