import express from 'express';

const router = express.Router();

// Create a new reservation
router.post('/reservations', (req, res) => {
    const { numberOfPeople, time, date } = req.body;
    
    // Validate number of people
    if (!numberOfPeople || numberOfPeople < 1 || numberOfPeople > 6) {
        return res.status(400).json({ error: 'Number of people must be between 1 and 6' });
    }

    // Validate time format and range
    const timeRegex = /^([5-9]|1[0-1])(:|:30)?$/;
    if (!time || !timeRegex.test(time)) {
        return res.status(400).json({ error: 'Time must be between 5:00 PM and 11:00 PM, every 30 minutes' });
    }

    // Validate date
    const reservationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!date || reservationDate < today || isNaN(reservationDate)) {
        return res.status(400).json({ error: 'Date must be today or in the future' });
    }
    // Logic to create a new reservation
    res.status(201).send('Reservation created');
});

// Delete an existing reservation
router.delete('/reservations/:id', (req, res) => {
    const { id } = req.params;
    // Logic to delete a reservation by id
    res.status(200).send('Reservation cancelled');
});

export default router;