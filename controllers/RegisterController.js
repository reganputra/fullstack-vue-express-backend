
const express = require('express');

const {validationResult} = require('express-validator');

const bcrypt  = require('bcryptjs');

const prisma = require('../prisma/client/client');


// user register

const userRegister = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()){
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.array()
        })
    }

//     hash password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            }
        })

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: user
        })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })

    }
}

module.exports = {
    userRegister
}

