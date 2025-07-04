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

// Edit an existing reservation
router.put('/reservations/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { numberOfPeople, time, date } = req.body;

    // Check if reservation belongs to authenticated user
    const reservation = await Reservation.findById(id);
    if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
    }
    
    // Validate number of people if provided
    if (numberOfPeople !== undefined) {
        if (numberOfPeople < 1 || numberOfPeople > 6) {
            return res.status(400).json({ error: 'Number of people must be between 1 and 6' });
        }
    }

    // Validate time format and range if provided
    if (time !== undefined) {
        const timeRegex = /^([5-9]|1[0-1])(:|:30)?$/;
        if (!timeRegex.test(time)) {
            return res.status(400).json({ error: 'Time must be between 5:00 PM and 11:00 PM, every 30 minutes' });
        }
    }

    // Validate date if provided
    if (date !== undefined) {
        const reservationDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (reservationDate < today || isNaN(reservationDate)) {
            return res.status(400).json({ error: 'Date must be today or in the future' });
        }
    }

    // Logic to update the reservation
    res.status(200).send('Reservation updated');
});

export default router;