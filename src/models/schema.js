import { schema } from 'normalizr';

const userSchema = new schema.Entity('user');
const subjectSchema = new schema.Entity('subject');
const gradeSchema = new schema.Entity('grade');
const institutionSchema = new schema.Entity('institution');
const discussionSchema = new schema.Entity('discussion');
const replySchema = new schema.Entity('reply');

subjectSchema.define({
  teachers: [userSchema],
  students: [userSchema],
  forum: [discussionSchema],
  grade: gradeSchema,
});

gradeSchema.define({
  subjects: [subjectSchema],
  institution: institutionSchema,
});

institutionSchema.define({
  grades: [gradeSchema],
  admins: [userSchema],
  teachers: [userSchema],
  students: [userSchema],
});

discussionSchema.define({
  replies: [replySchema],
});

replySchema.define({
  discussion: discussionSchema,
  user: userSchema,
});

export const user = userSchema;
export const subject = subjectSchema;
export const grade = gradeSchema;
export const institution = institutionSchema;
export const discussion = discussionSchema;
export const reply = replySchema;
