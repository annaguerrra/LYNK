import { Request, Response, NextFunction, response } from "express"

export const validatePasswordFormat = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body

    if (password.length < 8)
        return res.status(400).send({ response: 'Password must be at least 8 caracteres' })

    if (!/[A-Z]/.test(password))
        return res.status(400).send({ response: 'Password must have an upper case caracter'})

    if (!/[a-z]/.test(password))
        return res.status(400).send({ response: 'Password must have a lower case caracter'})

    if (!/[^a-zA-Z0-9]/.test(password))
        return res.status(400).send({ response: 'Password must have an especial caracter'})

    if (!/\d/.test(password))
        return res.status(400).send({ response: 'Password must have a number'})
}