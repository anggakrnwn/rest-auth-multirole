const express = require('express')
const prisma = require('../../../prisma/client')
const { validationResult } = require('express-validator')

// GET all roles
const findRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "success get all roles",
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to get roles",
    });
  }
};

// GET role by ID
const findRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "success get role by id",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to get role",
    });
  }
};

// CREATE role
const createRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "validation error",
      errors: errors.array(),
    });
  }

  try {
    const role = await prisma.role.create({
      data: {
        name: req.body.name,
      },
    });

    res.status(201).json({
      success: true,
      message: "role created successfully",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to create role",
    });
  }
};

// UPDATE role
const updateRole = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "validation error",
      errors: errors.array(),
    });
  }

  try {
    const role = await prisma.role.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
      },
    });

    res.status(200).json({
      success: true,
      message: "role updated successfully",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to update role",
    });
  }
};

// DELETE role
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.role.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "role deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to delete role",
    });
  }
};

module.exports = {
  findRoles,
  findRoleById,
  createRole,
  updateRole,
  deleteRole,
};
