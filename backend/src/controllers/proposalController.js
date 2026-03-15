const admin = require('firebase-admin');
const { db } = require('../config/firebase');

const getAllProposals = async (req, res) => {
  try {
    const { role, uid } = req.user;
    let query = db.collection('proposals');

    if (role === 'proponent') {
      query = query.where('createdBy', '==', uid);
    } else if (role === 'scrutiny') {
      query = query.where('assignedTo', '==', uid);
    } else if (role === 'mom') {
      query = query.where('status', '==', 'referred_to_mom');
    }

    const snapshot = await query.get();
    const proposals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch proposals', message: error.message });
  }
};

const createProposal = async (req, res) => {
  try {
    const { uid, email } = req.user;
    const {
      title,
      category,
      description,
      details,
      sector,
      environmentalImpact,
      documents,
      paymentStatus
    } = req.body;

    const proposalData = {
      title,
      category,
      description,
      details: details || {},
      sector: sector || '',
      environmentalImpact: environmentalImpact || {},
      documents: documents || [],
      paymentStatus: paymentStatus || 'pending',
      status: 'submitted',
      createdBy: uid,
      proponentEmail: email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          status: 'submitted',
          timestamp: new Date().toISOString(),
          message: 'Application successfully submitted by proponent.'
        }
      ]
    };

    const docRef = await db.collection('proposals').add(proposalData);
    res.status(201).json({ id: docRef.id, ...proposalData });
  } catch (error) {
    console.error('Create Proposal Error:', error);
    res.status(500).json({ error: 'Failed to create proposal', message: error.message });
  }
};

const getProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid, role } = req.user;

    const doc = await db.collection('proposals').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    const proposal = { id: doc.id, ...doc.data() };

    // Authorization check
    if (role === 'proponent' && proposal.createdBy !== uid) {
      return res.status(403).json({ error: 'Forbidden: You do not have access to this proposal' });
    }

    res.json(proposal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch proposal', message: error.message });
  }
};

const updateProposalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, message } = req.body;
    const { uid } = req.user;

    const proposalRef = db.collection('proposals').doc(id);
    const doc = await proposalRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    const updateData = {
      status,
      updatedAt: new Date().toISOString(),
      history: admin.firestore.FieldValue.arrayUnion({
        status,
        timestamp: new Date().toISOString(),
        message: message || `Status updated to ${status} by ${uid}`,
        updatedBy: uid
      })
    };

    await proposalRef.update(updateData);
    res.json({ message: 'Status updated successfully', status });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status', message: error.message });
  }
};

module.exports = { getAllProposals, createProposal, getProposalById, updateProposalStatus };
