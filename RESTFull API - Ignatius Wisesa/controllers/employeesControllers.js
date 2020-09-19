// Import Database
const db = require('../database/db')
// Import Helper
const {
    reverse, 
    fibonacci,
    combination
} = require('../helper/algorithms')

module.exports = {
    /**
    * @routes GET
    * @description Fetch all employees
    * @access All
    */
    fetchAllEmployees : (req,res) => {
        // Set SQL Syntax
        // Get List Employees SQL
        var fetchAllEmployeesSql = `SELECT * FROM employees;`

        // Database Action
        db.query(fetchAllEmployeesSql, (err, fetchResult) => {
            if(err) res.status(500).send(err)

            if (fetchResult.length === 0) {
                return res.status(400).send({ 
                    error: true, 
                    message: 'Employees not found!' 
                });
            } else {
                return res.status(200).send(
                    fetchResult
                );
            }
        })
    },

    /**
    * @routes GET
    * @description Fetch employee detail
    * @access All
    */
    fetchEmployeeByID : (req,res) => {
        // Get params query
        const {
            id
        } = req.params

        // Validate params query
        if(
            id === '' || id === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send employee id!` 
            })
        } else if(
            isNaN(id)
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Incorrect employee id type!` 
            })
        } else if(
            id.split('').length > 10
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Employee id is too long!!` 
            })
        }

        // Set SQL Syntax
        // Get Detail Employee SQL
        var fetchDetailEmployeeSql = `SELECT * FROM employees WHERE id = ?;`

        // Database Action
        db.query(fetchDetailEmployeeSql, [id],(err, fetchResult) => {
            if(err) res.status(500).send(err)

            if (fetchResult.length === 0) {
                return res.status(400).send({ 
                    error: true, 
                    message: 'Employee not found!' 
                });
            } else {
                return res.status(200).send(
                    fetchResult[0]
                );
            }
        })
    },

    /**
    * @routes POST
    * @description Add employee
    * @access ALL
    */
    addEmployee : (req,res) => {
        // Get Employee Detail
        const { 
            name,
            phone_number,
            jobtitle
        } = req.body

        // Validate input
        // Name Validation
        if(
            name === '' || name === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send employee's name!` 
            })
        } else if(
            name.split('').length > 50
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Employee's name is too long!` 
            })
        }
        // Phone Number Validation
        if(
            phone_number === '' || phone_number === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send employee's phone number!` 
            })
        } else if(
            phone_number.split('').length > 16
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Employee's phone number is too long!` 
            })
        }
        // Job Title Validation
        if(
            jobtitle === '' || jobtitle === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send employee's job title!` 
            })
        } else if(
            jobtitle.split('').length > 25
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Employee's job title is too long!` 
            })
        }

        // Set Data
        const data = {
            name,
            phone_number,
            jobtitle
        };
        
        // Set SQL Syntax
        // Add Employee SQL
        let addNewEmployeeSql = `INSERT INTO employees SET ? `;

        // Database Action
        db.query(addNewEmployeeSql, data, (err, insertResult) => {
            if (err) return res.status(500).send(err);

            if (insertResult.insertId === 0) {
                return res
                    .status(400)
                    .send({ 
                        error: true, 
                        message: "Insert employee failed!" 
                    })
            } else {
                // Set SQL Syntax
                // Get Last Inserted Employee SQL
                var fetchLastInsertedEmployeeSql = `SELECT * FROM employees WHERE name = ? ORDER BY id DESC LIMIT 1;`

                // Database Action
                db.query(fetchLastInsertedEmployeeSql, [name],(err, fetchResult) => {
                    if(err) res.status(500).send(err)

                    if (fetchResult.length === 0) {
                        return res.status(400).send({ 
                            error: true, 
                            message: 'Employees not found!' 
                        });
                    } else {
                        return res.status(201).send(
                            fetchResult[0]
                        );
                    }
                })
            }
        })
    },

    /**
    * @routes PUT
    * @description Update Employee
    * @access ALL
    */
    updateEmployee : (req,res) => {
        // Get params query
        const {
            id
        } = req.params

        // Validate params query
        if(
            id === '' || id === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send employee id!` 
            })
        } else if(
            isNaN(id)
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Incorrect employee id type!` 
            })
        } else if(
            id.split('').length > 10
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Employee id is too long!!` 
            })
        }

        // Get New Employee Detail
        const { 
            name,
            phone_number,
            jobtitle
        } = req.body

        // Validate input
        // Name Validation
        if(
            name === '' || name === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send employee's name!` 
            })
        } else if(
            name.split('').length > 50
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Employee's name is too long!` 
            })
        }
        // Phone Number Validation
        if(
            phone_number === '' || phone_number === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send employee's phone number!` 
            })
        } else if(
            phone_number.split('').length > 16
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Employee's phone number is too long!` 
            })
        }
        // Job Title Validation
        if(
            jobtitle === '' || jobtitle === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send employee's job title!` 
            })
        } else if(
            jobtitle.split('').length > 25
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Employee's job title is too long!` 
            })
        }

        // Set Data
        const data = {
            name,
            phone_number,
            jobtitle
        };
        
        // Set SQL Syntax
        // Update Employee SQL
        const updateEmployeeSql = `UPDATE employees SET ? WHERE (id = ?)`;
        
        // Database Action
        db.query(updateEmployeeSql, [data, parseInt(id)], (err, updateEmployeeResult) => {
            if (err) return res.status(500).send(err);

            if (updateEmployeeResult.affectedRows === 0) {
                return res
                    .status(400)
                    .send({ 
                        error: true, 
                        message: "Update employee failed!" 
                    })
            } else {
                // Set SQL Syntax
                // Get Last Inserted Employee SQL
                var fetchLastInsertedEmployeeSql = `SELECT * FROM employees WHERE name = ? ORDER BY id DESC LIMIT 1;`

                // Database Action
                db.query(fetchLastInsertedEmployeeSql, [name],(err, fetchResult) => {
                    if(err) res.status(500).send(err)

                    if (fetchResult.length === 0) {
                        return res.status(400).send({ 
                            error: true, 
                            message: 'Employees not found!' 
                        });
                    } else {
                        return res.status(201).send(
                            fetchResult[0]
                        );
                    }
                })
            }
        })
    },

    /**
    * @routes DELETE
    * @description Delete employee
    * @access ALL
    */
    deleteEmployee : (req,res) => {
        // Get params query
        const {
            id
        } = req.params

        // Validate params query
        if(
            id === '' || id === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send employee id!` 
            })
        } else if(
            isNaN(id)
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Incorrect employee id type!` 
            })
        } else if(
            id.split('').length > 10
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Employee id is too long!!` 
            })
        }

        // Set SQL Syntax
        // Delete Employee SQL
        const deleteEmployeeSql = `DELETE from employees WHERE id = ?`;
        
        // Database Action
        db.query(deleteEmployeeSql, [parseInt(id)], (err, deleteEmployeeResult) => {
            if (err) return res.status(500).send(err);

            if (deleteEmployeeResult.affectedRows === 0) {
                return res
                    .status(400)
                    .send({ 
                        error: true, 
                        message: "Delete employee failed!" 
                    })
            } else {
                return res
                    .status(204)
                    .send()
            }
        })
    },

    /**
    * @routes POST
    * @description Reverse Algorithm
    * @access ALL
    */
    reverseAlgorithm : (req,res) => {
        // Get Character
        const { 
            character
        } = req.body

        // Validate input
        // Character Validation
        if(
            character === '' || character === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send the character as input!` 
            })
        } else if(
            character.split('').length > 300
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Character is too long!` 
            })
        }

        // Send Result
        return res
        .status(200)
        .send({
            result: reverse(character)
        })
    },

    /**
    * @routes POST
    * @description Fibonacci Algorithm
    * @access ALL
    */
    fibonacciAlgorithm : (req,res) => {
        // Get Fibonacci Number
        const { 
            n
        } = req.body

        // Validate input
        // Fibonacci Number Validation
        if(
            n === '' || n === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send n as input!` 
            })
        } else if(
            isNaN(n)
        ){
            return res.status(400).send({ 
                error: true, 
                message: `N type is false!` 
            })
        }

        // Send Result
        return res
        .status(200)
        .send({
            result: fibonacci(n)
        })
    },

    /**
    * @routes POST
    * @description Combination Algorithm
    * @access ALL
    */
    combinationAlgorithm : (req,res) => {
        // Get Fibonacci Number
        const { 
            n, r
        } = req.body

        // Validate input
        // N Validation
        if(
            n === '' || n === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send n as input!` 
            })
        } else if(
            isNaN(n)
        ){
            return res.status(400).send({ 
                error: true, 
                message: `N type is false!` 
            })
        }
        // R Validation
        // N Validation
        if(
            r === '' || r === undefined
        ){
            return res.status(400).send({ 
                error: true, 
                message: `Please send r as input!` 
            })
        } else if(
            isNaN(r)
        ){
            return res.status(400).send({ 
                error: true, 
                message: `R type is false!` 
            })
        }

        // Send Result
        return res
        .status(200)
        .send({
            result: combination(n, r)
        })
    },
}