const express = require("express");
const multer = require("multer");
const csv = require("fast-csv");
const fs = require("fs");

const router = express.Router();

const { Employee } = require("../models");

const upload = multer({ dest: "tmp/csv/" });

//ADD EMPLOYEE
router.post("/add", async (req, res) => {
  const {
    body: { first_name, last_name, email },
  } = req;
  try {
    const newEmployee = await Employee.create({
      first_name,
      last_name,
      email,
    });
    return res.status(201).json(newEmployee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!", err: error });
  }
});

//ADD EMPLOYEES BY CSV FILE
router.post("/upload-csv", upload.single("file"), async (req, res) => {
  const fileRows = [];
  const employeeSuccessData = [];
  const employeeErrorData = []
  try {
    csv
      .parseFile(req.file.path)
      .on("data", (data) => {
        fileRows.push(data);
      })
      .on("end", async () => {
        fs.unlinkSync(req.file.path);
        
        if (fileRows.length > 0) {
          if (
            /first/.test(fileRows[0][0]) ||
            /last/.test(fileRows[0][1]) ||
            /email/.test(fileRows[0][2])
          ) {
            fileRows.shift();
          }

          fileRows.forEach((fileRow) => {
            if(fileRow[0] && fileRow[1] && fileRow[2] && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fileRow[2])) {
                employeeSuccessData.push({
                    first_name: fileRow[0],
                    last_name: fileRow[1],
                    email: fileRow[2],
                });
            }else {
                employeeErrorData.push({
                    first_name: fileRow[0],
                    last_name: fileRow[1],
                    email: fileRow[2],
                });
            }
          });
        }
        const newEmployees = await Employee.bulkCreate(employeeSuccessData);

        res.status(201).json({
            successCount: employeeSuccessData.length,
            errorCount: employeeErrorData.length,
            successEmployees: newEmployees,
            errorEmployees: employeeErrorData
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!", err: error });
  }
});

//GET ALL EMPLOYEES
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    return res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!", err: error });
  }
});

//UPDATE EMPLOYEE DETAILS
router.put("/update/:uuid", async (req, res) => {
  const {
    params: { uuid },
    body: { first_name, last_name, email },
  } = req;

  try {
    const updatedEmployee = await Employee.findOne({ where: { uuid } });
    updatedEmployee.first_name = first_name;
    updatedEmployee.last_name = last_name;
    updatedEmployee.email = email;
    await updatedEmployee.save();

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.log(error);
    return res.status(204).json({ error: "Something went wrong!", err: error });
  }
});

//DELETE EMPLOYEE
router.delete("/delete/:uuid", async (req, res) => {
  const {
    params: { uuid },
  } = req;

  try {
    const deletedEmployee = await Employee.findOne({ where: { uuid } });
    await deletedEmployee.destroy();

    return res.status(200).json({ message: "Employ deleted." });
  } catch (error) {
    console.log(error);
    return res.status(204).json({ error: "Something went wrong!", err: error });
  }
});

module.exports = router;
