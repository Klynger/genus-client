import { schema } from 'normalizr';

const user = new schema.Entity('user');
const subject = new schema.Entity('subject');
const grade = new schema.Entity('grade');
const institution = new schema.Entity('institution');
const discussion = new schema.Entity('discussion');
const reply = new schema.Entity('reply');
const evaluation = new schema.Entity('evaluation');
const studentSubject = new schema.Entity('studentSubject');

subject.define({
  teachers: [user],
  students: [user],
  forum: [discussion],
  studentSubjects: [studentSubject],
  grade,
});

grade.define({
  subjects: [subject],
  institution,
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

studentSubject.define({
  user,
  subject,
  evaluations: [evaluation],
});

user.define({
  teacherSubjects: [subject],
  studentSubjects: [subject],
  studentSubjectRelations: [studentSubject],
});

export const userSchema = user;
export const gradeSchema = grade;
export const replySchema = reply;
export const subjectSchema = subject;
export const discussionSchema = discussion;
export const evaluationSchema = evaluation;
export const institutionSchema = institution;
export const studentSubjectSchema = studentSubject;
