import { isValidObjectId } from "mongoose";

const checkObjectId = (req, res, next) => {
    if(!isValidObjectId(req.params.id)) {
        res.status(400).json({ msg: 'Invalid ID' });
        throw new Error(`Invalid ID of: ${req.params.id}`);
    }
    next();
}

export default checkObjectId;