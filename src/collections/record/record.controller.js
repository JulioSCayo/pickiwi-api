import Record from './record.model.js';

const createRecord = async (req, res) => {
    const record = new Record(req.body);
    record.paid = false;

    try {
        const recordSaved = await record.save();
        res.status(200).json(recordSaved);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

const updateRecord = async (req, res) => {
    const { id } = req.params;
    const recordUpdate = req.body;

    try {
        await Record.findByIdAndUpdate(id, recordUpdate);
        res.status(200).json({message: 'Record updated'});
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteRecord = async (req, res) => {
    const { id } = req.params;

    try {
        await Record.findByIdAndDelete(id);
        res.status(200).json({message: 'Record deleted'});
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const record = await Record.findById(id);
        res.status(200).json(record);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findAllRecords = async (req, res) => {
    try {
        const records = await Record.find({});
        res.status(200).json(records);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

export default {
    createRecord,
    updateRecord,
    deleteRecord,
    findRecord,
    findAllRecords
};