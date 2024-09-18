const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

router.put('/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});


// let users = [
//   { id: 1, name: 'John Doe' },
//   { id: 2, name: 'Kane Koe' }
// ];

// router.get('/', (req, res) => {
//   res.json(users);
// });

// router.post('/', (req, res) => {
//   const newUser = req.body;
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// router.put('/:id', (req, res) => {
//   const userId = parseInt(req.params.id);
//   const updatedUser = req.body;
//   users = users.map(user => user.id === userId ? updatedUser : user);
//   res.json(updatedUser);
// });

// router.delete('/:id', (req, res) => {
//   const userId = parseInt(req.params.id);
//   users = users.filter(user => user.id !== userId);
//   res.status(204).send('deleted');
// });

module.exports = router;