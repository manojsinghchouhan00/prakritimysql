const connection = require('../config/dbConfig');
// Get All diet
exports.getAllDiet = (req, resp) => {
    try {
        const query = 'SELECT * FROM diet';
        connection.execute(query, (err, results) => {
            if (err) {
                resp.status(500).send({ message: 'Failed to fetch diets' });
                return;
            }
            resp.send(results);
        });
    } catch (err) {
        resp.status(500).send({ message: 'Failed to fetch diets' });
    }
}
// Add diet
exports.addDiet = (req, resp) => {
    const { name, nextDate, earlyMorning, breakfastTime, lunchTime, postLunchSnacks, dinnerTime, lateNightSnacks, remark, remarkOut, nameOut, earlyMorningOut, breakfastTimeOut, lunchTimeOut, postLunchSnacksOut, dinnerTimeOut, lateNightSnacksOut, appoinmentDate } = req.body;

    // Prepare safe values for insertion, null if the field is missing
    const safeValues = [
        appoinmentDate || null,
        name || null,
        nextDate || null,
        earlyMorning || null,
        breakfastTime || null,
        lunchTime || null,
        postLunchSnacks || null,
        dinnerTime || null,
        lateNightSnacks || null,
        remark || null,
        nameOut || null,
        earlyMorningOut || null,
        breakfastTimeOut || null,
        lunchTimeOut || null,
        postLunchSnacksOut || null,
        dinnerTimeOut || null,
        lateNightSnacksOut || null,
        remarkOut || null
    ];

    const query = `
        INSERT INTO diet 
        (appoinmentDate, name, nextDate, earlyMorning, breakfastTime, lunchTime, 
        postLunchSnacks, dinnerTime, lateNightSnacks, remark, 
        nameOut, earlyMorningOut, breakfastTimeOut, lunchTimeOut, 
        postLunchSnacksOut, dinnerTimeOut, lateNightSnacksOut, remarkOut) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    try {
        // Execute MySQL insert query
        connection.execute(query, safeValues, (err, results) => {
            if (err) {
                console.error(err);
                return resp.status(500).send({ message: 'Failed to add diet to database' });
            }
            resp.send({ message: 'Diet added successfully', dietId: results.insertId });
        });
    } catch (err) {
        console.error('Error adding diet:', err);
        resp.status(500).send({ message: 'Failed to add diet' });
    }
}

// Update diet 
exports.updateDiet =  (req, resp) => {
    const {
        name,
        nextDate,
        earlyMorning,
        breakfastTime,
        lunchTime,
        postLunchSnacks,
        dinnerTime,
        lateNightSnacks,
        remark,
        remarkOut,
        nameOut,
        earlyMorningOut,
        breakfastTimeOut,
        lunchTimeOut,
        postLunchSnacksOut,
        dinnerTimeOut,
        lateNightSnacksOut,
        appoinmentDate
    } = req.body;

    // Prepare safe values for updating
    const safeValues = [
        name || null,
        nextDate || null,
        earlyMorning || null,
        breakfastTime || null,
        lunchTime || null,
        postLunchSnacks || null,
        dinnerTime || null,
        lateNightSnacks || null,
        remark || null,
        remarkOut || null,
        nameOut || null,
        earlyMorningOut || null,
        breakfastTimeOut || null,
        lunchTimeOut || null,
        postLunchSnacksOut || null,
        dinnerTimeOut || null,
        lateNightSnacksOut || null,
        appoinmentDate || null
    ];

    const query = `
        UPDATE diet SET 
        name=?, nextDate=?, earlyMorning=?, breakfastTime=?, lunchTime=?, 
        postLunchSnacks=?, dinnerTime=?, lateNightSnacks=?, remark=?, remarkOut=?, 
        nameOut=?, earlyMorningOut=?, breakfastTimeOut=?, lunchTimeOut=?, 
        postLunchSnacksOut=?, dinnerTimeOut=?, lateNightSnacksOut=?, 
        appoinmentDate=? 
        WHERE id = ?
    `;

    try {
        // Execute MySQL update query
        connection.execute(query, [...safeValues, req.params.id], (err, results) => {
            if (err) {
                console.error('Error updating diet:', err);
                resp.status(500).send({ message: 'Failed to update diet' });
                return;
            }
            resp.send({ message: 'Diet updated successfully' });
        });
    } catch (err) {
        console.error('Error updating diet:', err);
        resp.status(500).send({ message: 'Failed to update diet' });
    }
}

// Delete diet
exports.deleteDiet = (req, resp) => {
    try {
        const query = 'DELETE FROM diet WHERE id = ?';
        connection.execute(query, [req.params.id], (err, results) => {
            if (err) {
                resp.status(500).send({ message: 'Failed to delete diet' });
                return;
            }
            resp.send({ message: 'Diet deleted successfully' });
        });
    } catch (err) {
        resp.status(500).send({ message: 'Failed to delete diet' });
    }
}

// Get one data diet
exports.getOneDiet = (req, resp) => {
    try {
        const query = 'SELECT * FROM diet WHERE id = ?';
        connection.execute(query, [req.params.id], (err, results) => {
            if (err) {
                resp.status(500).send({ message: 'Failed to fetch diet' });
                return;
            }
            if (results.length === 0) {
                resp.send({ message: "Diet not found" });
            } else {
                resp.send(results[0]);
            }
        });
    } catch (err) {
        resp.status(500).send({ message: 'Failed to fetch diet' });
    }
}
// Serach diet
exports.searchDiet =  (req, resp) => {
    const searchKey = req.params.key;

    if (!searchKey) {
        return resp.status(400).send({ message: "Search key is required" });
    }

    try {
        const query = 'SELECT * FROM diet WHERE name LIKE ? OR remark LIKE ?';
        const searchTerm = `%${searchKey}%`;

        connection.execute(query, [searchTerm, searchTerm], (err, results) => {
            if (err) {
                return resp.status(500).send({ message: 'Failed to search diet' });
            }

            if (results.length === 0) {
                return resp.status(404).send({ message: 'No diets found matching the search term' });
            }

            resp.send(results);
        });
    } catch (err) {
        resp.status(500).send({ message: 'Failed to search diet' });
    }
}