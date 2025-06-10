const express = require("express");
const prisma = require("../../../prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const findUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.status(201).json({
      success: true,
      message: "success get all user",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "not get all user",
    });
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "validation error",
      errors: errors.array(),
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      success: true,
      message: "user berhasil dibuat",
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "internal server error",
    });
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).send({
      success: true,
      message: `get user by id :${id}`,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(401).json({
      success: false,
      message: "error validation",
      errors: errors.array(),
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
        success: true,
        message: 'update sukses',
        data: user,
    })
  } catch (error) {
    res.status(401).json({
        success: false,
        message: 'internal server error',

    })
  }
};


const deleteUser = async (req, res) => {
    const { id} = req.params;

    try {
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json({
            success: true,
            message: 'success delete user',

        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'internal server error'
        })
    }

}
module.exports = { findUsers, createUser, findUserById, updateUser, deleteUser };
