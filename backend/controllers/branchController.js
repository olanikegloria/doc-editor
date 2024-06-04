const Document = require('../models/documentModel');
const Branch = require('../models/branchModel');

function applyChanges(content, changes) {
    const patches = dmp.patch_make(content, changes);
    const [newContent] = dmp.patch_apply(patches, content);
    return newContent;
  }

exports.createbranch = async(res, req) =>{
 const {id} = req.params;
 const {name, createdBy} = req.body;
 try{
    const branch = new Branch({name, changes:[], createdBy })
    await branch.save();

    const document = await Document.findById(id);
    if(!document){
        return res.status(404).json({message: 'document not found'})
    }
    document.branches.push(branch._id)
    await document.save();

    res.status(201).json(branch)

 }catch(error){
    res.status(400).json({ error: error.message });
 }
}

exports.editBranch = async (req, res) => {
    const { id, branchName } = req.params;
    const { changes } = req.body;
    try {
      const document = await Document.findById(id).populate('branches');
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      const branch = document.branches.find(b => b.name === branchName);
      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }
      branch.changes.push(...changes);
      await branch.save();
  
      res.json(branch);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.mergeBranch = async (req, res) => {
    const { id, branchName } = req.params;
    try {
      const document = await Document.findById(id).populate('branches');
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      const branch = document.branches.find(b => b.name === branchName);
      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }
  
      document.content = applyChanges(document.content, branch.changes);
      await document.save();
  
      res.json(document);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.deleteBranch = async (req, res) => {
    const { id, branchName } = req.params;
    try {
      const document = await Document.findById(id).populate('branches');
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      const branch = document.branches.find(b => b.name === branchName);
      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }
  
      await Branch.findByIdAndDelete(branch._id);
      document.branches.pull(branch._id);
      await document.save();
  
      res.json({ message: 'Branch deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  