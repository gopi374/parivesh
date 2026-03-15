const admin = require('firebase-admin');
const { db } = require('../config/firebase');

const referToMoM = async (req, res) => {
  try {
    const { id } = req.params;
    const { committee, meetingDate, priority } = req.body;
    const { uid } = req.user;

    const proposalRef = db.collection('proposals').doc(id);
    const doc = await proposalRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    const updateData = {
      status: 'referred_to_mom',
      meetingDetails: {
        committee: committee || 'General EAC',
        meetingDate: meetingDate || new Date().toISOString(),
        referredBy: uid,
        referredAt: new Date().toISOString(),
        priority: priority || 'Medium'
      },
      updatedAt: new Date().toISOString(),
      history: admin.firestore.FieldValue.arrayUnion({
        status: 'referred_to_mom',
        timestamp: new Date().toISOString(),
        message: `Project referred to ${committee} by Scrutiny Officer.`,
        updatedBy: uid
      })
    };

    await proposalRef.update(updateData);
    res.json({ message: 'Project successfully referred to MoM', status: 'referred_to_mom' });
  } catch (error) {
    console.error('Refer to MoM Error:', error);
    res.status(500).json({ error: 'Failed to refer project', message: error.message });
  }
};

const getAssignedTasks = async (req, res) => {
  try {
    const { uid, role } = req.user;
    let query = db.collection('proposals');

    if (role === 'scrutiny') {
       // Filter for tasks assigned to this officer or tasks in 'submitted' status
       query = query.where('status', 'in', ['submitted', 'in_scrutiny', 'eds_sought']);
    }

    const snapshot = await query.get();
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assigned tasks', message: error.message });
  }
};

module.exports = { referToMoM, getAssignedTasks };
