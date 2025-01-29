
const express = require("express");

const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const prisma = require('../prisma/client/client');

const userLogin = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()){
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.array()
        })
    }

   try {
   //      find user
       const  user = await prisma.user.findUnique({
          where: {
              email: req.body.email
          },
           select: {
               id: true,
               name: true,
               email: true,
               password: true
           },
       });

   //     if user not found
       if (!user){
           return res.status(404).json({
               success: false,
               message: 'User not found'
           })
       }

   //     compare password
       const validPassword = await bcrypt.compare(
           req.body.password,
           user.password
       );

       //password incorrect
       if (!validPassword)
           return res.status(401).json({
               success: false,
               message: "Invalid password",
           });

       //generate token JWT
       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
           expiresIn: "1h",
       });

       // Destructure to remove password from user object
       const { password, ...userWithoutPassword } = user;

       //return response
       res.status(200).send({
           success: true,
           message: "Login successfully",
           data: {
               user: userWithoutPassword,
               token: token,
           },
       });

   } catch (error) {
       return res.status(500).json({
           success: false,
           message: 'Internal server error',
           error: error.message
       })
   }
}

module.exports = {
    userLogin
}