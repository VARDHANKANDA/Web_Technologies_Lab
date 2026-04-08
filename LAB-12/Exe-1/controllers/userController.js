// Sample in-memory data
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// GET all users
exports.getAllUsers = (req, res) => {
    res.json(users);
};

// GET user by ID (Route parameter)
exports.getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
};

// POST (Create user)
exports.createUser = (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

// PUT (Update user)
exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name;
    res.json(user);
};

// DELETE user
exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);

    res.json({ message: 'User deleted successfully' });
};