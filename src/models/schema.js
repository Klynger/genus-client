import { schema } from 'normalizr';

const user = new schema.Entity('user');
const subject = new schema.Entity('subject');
const grade = new schema.Entity('grade');
const institution = new schema.Entity('institution');
const discussion = new schema.Entity('discussion');
const reply = new schema.Entity('reply');
const evaluation = new schema.Entity('evaluation');
const evaluationResult = new schema.Entity('evaluationResult');

subject.define({
  grade,
  teachers: [user],
  students: [user],
  forum: [discussion],
  evaluations: [evaluation],
});

grade.define({
  institution,
  students: [user],
  teachers: [user],
  subjects: [subject],
});

institution.define({
  grades: [grade],
  admins: [user],
  teachers: [user],
  students: [user],
});

discussion.define({
  replies: [reply],
  creator: user,
  subject,
});

reply.define({
  discussion,
  creator: user,
  replies: [reply],
  parent: reply,
});

user.define({
  teacherSubjects: [subject],
  studentSubjects: [subject],
  evaluationResults: [evaluationResult],
});

export const userSchema = user;
export const gradeSchema = grade;
export const replySchema = reply;
export const subjectSchema = subject;
export const discussionSchema = discussion;
export const evaluationSchema = evaluation;
export const institutionSchema = institution;
export const evaluationResultSchema = evaluationResult;
