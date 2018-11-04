import { requestGraphql } from '../components/utils/HTTPClient';
import { mutationCreateDiscussion } from '../queryGenerators/discussionMutations';
import { SAVE_DISCUSSION, SAVE_REPLY, ADD_DISCUSSION_TO_SUBJECT } from './actionTypes';

export const createDiscussion = input => dispatch => {
  return requestGraphql(mutationCreateDiscussion(input), localStorage.getItem('token')).then(
    res => {
      const result = res;
      if (res.data.data && res.data.data.createDiscussion) {
        const discussion = {
          ...res.data.data.createDiscussion,
          replies: res.data.data.createDiscussion.replies.map(reply => ({
            ...reply,
            user: reply.user.id,
            discussion: res.data.data.createDiscussion.id,
          })),
          creator: res.data.data.createDiscussion.creator.id,
          subject: res.data.data.createDiscussion.subject.id,
        };

        discussion.replies.forEach(reply => {
          dispatch({
            type: SAVE_REPLY,
            reply,
          });
        });

        dispatch({
          type: SAVE_DISCUSSION,
          discussion,
        });

        dispatch({
          type: ADD_DISCUSSION_TO_SUBJECT,
          payload: {
            subjectId: discussion.subject,
            discussionId: discussion.id,
          },
        });
      }
      return result;
    },
  );
};

export default {};
