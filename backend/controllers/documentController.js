const Document = require('../models/documentModel');

exports.createDocument = async(req, res)=>{
    const {title, content } = req.body;
    const document = new Document({ title, content, branches: []})
    try{
     await document.save();
     res.status(201).json(document);
    }catch(error){
      res.status(400).json({error: error.message})
    }
}

exports.getDocument = async(req, res)=>{
   try{
    const document = await Document.findById(req.params.id).populate('branches')
    if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.json(document);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

exports.deleteDocument = async (req, res) => {
    try {
      const document = await Document.findByIdAndDelete(req.params.id);
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };