const connection = require('../config/dbConfig');

// Get Login User 
exports.loginUser =  (req, resp) => {
    if (req.body.loginId && req.body.password) {
        const { loginId, password } = req.body;
        try {
            const query = 'SELECT * FROM users WHERE loginId = ? AND password = ?';
            connection.execute(query, [loginId, password], (err, results) => {
                if (err) {
                    // console.error('Login error:', err);
                    resp.status(500).send({ message: 'Internal server error' });
                    return;
                }
                if (results.length === 0) {
                    resp.send({ message: "No result found" });
                } else {
                    resp.send(results[0]); // Return first matching user
                }
            });
        } catch (err) {
            // console.log("Error in login API", err);
        }
    } else {
        resp.send({ message: "Enter LoginId and Password" });
    }
}

// Get all User 
exports.getAllUser =  (req, resp) => {
    try {
        const query = 'SELECT * FROM users';
        connection.execute(query, (err, results) => {
            if (err) {
                // console.log("Error fetching users:", err);
                resp.status(500).send({ message: "Internal server error", error: err.message });
                return;
            }
            resp.send(results);
        });
    } catch (err) {
        // console.log("Error fetching users:", err);
        resp.status(500).send({ message: "Internal server error" });
    }
}

// Add User 
exports.addUser = (req, res) => {
    const { name, loginId, password, mobile } = req.body;

    // Ensure that all required fields are present
    if (!name || !loginId || !password || !mobile) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    // Prepare the SQL query to insert the new user
    const query = 'INSERT INTO users (name, loginId, password, mobile) VALUES (?, ?, ?, ?)';
    const values = [name, loginId, password, mobile];

    // Execute the query to insert the user
    connection.query(query, values, (err, result) => {
        if (err) {
            // Log the error to the server console and return a response with the error message
            // console.error('Error creating user:', err.sqlMessage);
            return res.status(500).json({
                message: 'Error creating user',
                result: err.sqlMessage,  // Return the error message from MySQL
            });
        }

        // If successful, respond with the success message and the new user ID
        res.status(201).json({
            message: 'User created successfully',
            userId: result.insertId,  // Return the inserted user's ID
        });
    });
}

// Update User 
exports.updateUser =  (req, resp) => {
    const { firstName, lastName, loginId, password, roleId } = req.body;
    try {
        const query = 'UPDATE users SET firstName = ?, lastName = ?, loginId = ?, password = ?, roleId = ? WHERE id = ?';
        connection.execute(query, [firstName, lastName, loginId, password, roleId, req.params.id], (err, results) => {
            if (err) {
                // console.error('Error updating user:', err);
                resp.status(500).send({ message: 'Failed to update user' });
                return;
            }
            resp.send({ message: 'User updated successfully' });
        });
    } catch (err) {
        // console.error('Error in updating user:', err);
        resp.status(500).send({ message: 'Failed to update user' });
    }
}


// Delete User
exports.deleteUser = (req, resp) => {
    try {
        const query = 'DELETE FROM users WHERE id = ?';
        connection.execute(query, [req.params.id], (err, results) => {
            if (err) {
                // console.error('Error deleting user:', err);
                resp.status(500).send({ message: 'Failed to delete user' });
                return;
            }
            resp.send({ message: 'User deleted successfully' });
        });
    } catch (err) {
        // console.error('Error deleting user:', err);
        resp.status(500).send({ message: 'Failed to delete user' });
    }
}

// Get one data User
exports.getOneUser =  (req, resp) => {
    try {
        const query = 'SELECT * FROM users WHERE id = ?';
        connection.execute(query, [req.params.id], (err, results) => {
            if (err) {
                // console.error('Error fetching user:', err);
                resp.status(500).send({ message: 'Failed to fetch user' });
                return;
            }
            if (results.length === 0) {
                resp.send({ message: "User not found" });
            } else {
                resp.send(results[0]);
            }
        });
    } catch (err) {
        // console.error('Error fetching user:', err);
        resp.status(500).send({ message: 'Failed to fetch user' });
    }
}

// Serach User
exports.searchUser =   (req, resp) => {
    const caseInsensitiveKey = `%${req.params.key}%`; // Prepare the key for case-insensitive search
    try {
        // SQL query with placeholders for dynamic search terms
        const query = 'SELECT * FROM users WHERE name LIKE ? OR loginId LIKE ?';

        // Execute the query, passing in the case-insensitive key twice (for both name and loginId)
        connection.execute(query, [caseInsensitiveKey, caseInsensitiveKey], (err, results) => {
            if (err) {
                // If an error occurs during the query execution, log and respond with a 500 status
                // console.error('Error searching user:', err);
                return resp.status(500).send({ message: 'Failed to search user' });
            }
            // Respond with the results from the search
            resp.send(results);
        });
    } catch (err) {
        // Catch any other errors and return a 500 status
        // console.error('Error searching user:', err);
        resp.status(500).send({ message: 'Failed to search user' });
    }
}