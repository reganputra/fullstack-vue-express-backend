
const express = require('express');
const prisma = require('../prisma/client/client');
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");


const findUsers = async (req, res) => {
    try {

        //get all users from database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get all users successfully",
            data: users,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

 const createUser = async (req, res) => {

     const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                message: "Validation error",
                errors: errors.array(),
            });
        }

     const hashedPassword = await bcrypt.hash(req.body.password, 10);

        try{
        //     insert user data
            const user = await prisma.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                },
            });

            res.status(200).send({
                success: true,
                message: "User created successfully",
                data: user,
            });

        }catch (error){
            res.status(500).send({
                success: false,
                message: "Internal server error",
            });
        }
 }

//  get user by id
const getUserById = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where:{
                id: Number(id),
            },
            select:{
                id: true,
                name: true,
                email: true,
            },
        });

        res.status(200).send({
            success: true,
            message: `Get user By ID :${id}`,
            data: user,
        });
    }catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }

};

//  update user
const updateUser = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = await prisma.user.update({
            where:{
                id: Number(id),
            },
            data:{
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        res.status(200).send({
            success: true,
            message: `User updated successfully`,
            data: user,
        });
    }catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }

};

// delete user
const destroyUser = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    try {
        const user = await prisma.user.delete({
            where:{
                id: Number(id),
            },
        });

        res.status(200).send({
            success: true,
            message: `User deleted successfully`,
            data: user,
        });
    }catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

module.exports = { findUsers, createUser, getUserById, updateUser, destroyUser };