import { replySchema } from '../models/schema';
import { dispatchEntities } from '../utils/helpers';
import { requestGraphql } from '../utils/HTTPClient';
import { ADD_REPLY_TO_DISCUSSION, ADD_REPLY_TO_REPLY } from './actionTypes';
import { mutationCreateReply, mutationReplyToReply } from '../queryGenerators/replyMutations';

export const replyToDiscussion = input => dispatch => {
  return requestGraphql(mutationCreateReply(input), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.createReply) {
      dispatchEntities(res.data.data.createReply, dispatch, replySchema);
      dispatch({
        type: ADD_REPLY_TO_DISCUSSION,
        payload: {
          replyId: res.data.data.createReply.id,
          discussionId: res.data.data.createReply.discussion.id,
        },
      });
    }
  });
};

export const replyToReply = input => dispatch => {
  return requestGraphql(mutationReplyToReply(input), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.replyToReply) {
      dispatchEntities(res.data.data.replyToReply, dispatch, replySchema);
      dispatch({
        type: ADD_REPLY_TO_DISCUSSION,
        payload: {
          replyId: res.data.data.replyToReply.id,
          discussionId: res.data.data.replyToReply.discussion.id,
        },
      });
      dispatch({
        type: ADD_REPLY_TO_REPLY,
        payload: {
          parentId: input.parentId,
          childId: res.data.data.id,
        },
      });
    }

    return res;
  });
};

export default {};
