const Box = require('../models/Box');

class BoxController {
    async store(req, res) {
        const { title } = req.body;
        if (!title) title = 'New Box';
        const box = await Box.create({ title: title });

        return res.json(box);
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });

        return res.json(box);
    }

    async list(_, res) {
        const boxList = await Box.find().populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });

        return res.json(boxList);
    }
}

module.exports = new BoxController();
