const { body } = require('express-validator')
const prisma = require('../../prisma/client')

const validateUser = [
    body('name').notEmpty().withMessage('name is required'),
    body('email')
                .notEmpty().withMessage('email is required')
                .isEmail().withMessage('email invalid')
                .custom(async (value) => {
                    if (!value) {
                        throw new Error('email is required')
                    }
                    const user = await prisma.user.findUnique({where: {email: value}})
                    if(user && user.id !== Number(req.params.id)) {
                        throw new Error('email already exists')
                    }
                    return true;
                }),
    body('password').isLength({min: 6}).withMessage('password min 6 character')
]

module.exports= {validateUser}

