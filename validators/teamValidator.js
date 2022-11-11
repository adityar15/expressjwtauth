const { body, validationResult } = require("express-validator");
exports.teamValidator = [
    body("name").isString().isLength({ min: 3 }).not().isEmpty(),
    body("department").isString().isLength({ min: 3 }).not().isEmpty(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });   
        
        next()
    }
]