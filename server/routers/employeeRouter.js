const express = require('express');

const router = express.Router();

const {Employee} = require('../models')

//ADD EMPLOYEE
router.post('/add', async (req, res) => {
    const {
        body: {
            first_name,
            last_name,
            email
        }
    } = req
    try {
        const newEmployee = await Employee.create({
            first_name,
            last_name,
            email
        })
        return res.status(201).json(newEmployee)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong!', err: error})
    }
})

//GET ALL EMPLOYEES
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.findAll()
        return res.status(200).json(employees)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong!', err: error})
    }
})

//UPDATE EMPLOYEE DETAILS
router.put('/update/:uuid', async (req, res) => {
    const {
        params: {
            uuid
        },
        body: {
            first_name,
            last_name,
            email
        }
    } = req

    try {
        const updatedEmployee = await Employee.findOne({where: {uuid}})
        updatedEmployee.first_name = first_name
        updatedEmployee.last_name = last_name
        updatedEmployee.email = email
        await updatedEmployee.save()

        return res.status(200).json(updatedEmployee)
    } catch (error) {
        console.log(error)
        return res.status(204).json({error: 'Something went wrong!', err: error})
    }
})

//DELETE EMPLOYEE
router.delete('/delete/:uuid', async (req, res) => {
    const {
        params: {
            uuid
        }
    } = req

    try {
        const deletedEmployee = await Employee.findOne({where: {uuid}})
        await deletedEmployee.destroy()

        return res.status(200).json({message: 'Employ deleted.'})
    } catch (error) {
        console.log(error)
        return res.status(204).json({error: 'Something went wrong!', err: error})
    }
})

module.exports = router;