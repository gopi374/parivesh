import { Timestamp } from 'firebase-admin/firestore';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'student' | 'admin' | 'judge';
  college?: string;
  department?: string;
  phone?: string;
  bio?: string;
  registeredEvents: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'sustainability' | 'innovation' | 'competition' | 'workshop' | 'talk';
  date: Timestamp;
  startTime: string;
  endTime: string;
  venue: string;
  maxParticipants: number;
  currentParticipants: number;
  registrationDeadline: Timestamp;
  isOpen: boolean;
  bannerImageURL?: string;
  tags: string[];
  organizer: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  teamName?: string;
  teamMembers?: { name: string; email: string; college: string }[];
  status: 'pending' | 'confirmed' | 'rejected' | 'waitlisted';
  paymentStatus: 'unpaid' | 'paid' | 'waived';
  submittedAt: Timestamp;
  confirmedAt?: Timestamp;
  notes?: string;
}

export interface JudgeScore {
  judgeId: string;
  innovation: number;
  feasibility: number;
  impact: number;
  presentation: number;
  sustainability: number;
  comment: string;
  scoredAt: Timestamp;
}

export interface Submission {
  id: string;
  userId: string;
  eventId: string;
  registrationId: string;
  title: string;
  description: string;
  problemStatement?: string;
  solution?: string;
  sdgGoals?: string[];
  environmentalImpact?: string;
  fileURLs: string[];
  videoURL?: string;
  aiScore?: number;
  aiAnalysis?: string;
  judgeScores?: JudgeScore[];
  finalScore?: number;
  status: 'draft' | 'submitted' | 'under_review' | 'judged';
  submittedAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AIConversation {
  id: string;
  userId: string;
  sessionId: string;
  messages: {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Timestamp;
  }[];
  context?: 'event_help' | 'submission_review' | 'environment_query' | 'general';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Report {
  id: string;
  userId: string;
  type: 'carbon_footprint' | 'sustainability_audit' | 'event_summary' | 'submission_analysis';
  title: string;
  data: Record<string, unknown>;
  pdfURL?: string;
  generatedAt: Timestamp;
}

export interface LeaderboardEntry {
  id: string;
  eventId: string;
  eventTitle: string;
  rankings: {
    rank: number;
    userId: string;
    teamName?: string;
    submissionId: string;
    finalScore: number;
    college?: string;
  }[];
  updatedAt: Timestamp;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  actionURL?: string;
  createdAt: Timestamp;
}
