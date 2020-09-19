const express = require('express')
const router = express.Router()
const { employeesControllers } = require('../controllers');

/**
* @routes GET
* @description Fetch all employees
* @access All
*/
router.get("/employees", employeesControllers.fetchAllEmployees);

/**
* @routes GET
* @description Fetch employee detail
* @access All
*/
router.get("/employees/:id", employeesControllers.fetchEmployeeByID);

/**
* @routes POST
* @description Add employee
* @access ALL
*/
router.post("/employees", employeesControllers.addEmployee);

/**
* @routes PUT
* @description Update Employee
* @access ALL
*/
router.put("/employees/:id", employeesControllers.updateEmployee);

/**
* @routes DELETE
* @description Delete employee
* @access ALL
*/
router.delete("/employees/:id", employeesControllers.deleteEmployee);

/**
* @routes POST
* @description Reverse Algorithm
* @access ALL
*/
router.post("/reverse", employeesControllers.reverseAlgorithm);

/**
* @routes POST
* @description Fibonacci Algorithm
* @access ALL
*/
router.post("/fibonacci", employeesControllers.fibonacciAlgorithm);

/**
* @routes POST
* @description Combination Algorithm
* @access ALL
*/
router.post("/combination", employeesControllers.combinationAlgorithm);

module.exports = router;