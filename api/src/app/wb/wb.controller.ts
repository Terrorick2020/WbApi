import { Request, Response } from 'express'

import asyncHandler from 'express-async-handler'


const typedAsyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => {
    return asyncHandler(fn as unknown as (...args: unknown[]) => void);
}

export default {
    getWbApi: typedAsyncHandler(
        async ( req: Request, res: Response ) => {

            res.status(200).json({
                message: 'success'
            })
        }
    )
}