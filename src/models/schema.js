import { schema } from 'normalizr';

const user = new schema.Entity('user');
const subject = new schema.Entity('subject');
const grade = new schema.Entity('grade');
const institution = new schema.Entity('institution');
const discussion = new schema.Entity('discussion');
const reply = new schema.Entity('reply');

subject.define({
  teachers: [user],
  students: [user],
  forum: [discussion],
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
  user,
});

export const userSchema = user;
export const gradeSchema = grade;
export const replySchema = reply;
export const subjectSchema = subject;
export const discussionSchema = discussion;
export const institutionSchema = institution;
