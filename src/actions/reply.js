import { replySchema } from '../models/schema';
import { dispatchEntities } from '../utils/helpers';
import { requestGraphql } from '../utils/HTTPClient';
import { mutationCreateReply } from '../queryGenerators/replyMutations';
import { ADD_REPLY_TO_DISCUSSION, ADD_REPLY_TO_REPLY } from './actionTypes';

export const createReply = (input, isReplyToReply) => dispatch => {
  return requestGraphql(mutationCreateReply(input), localStorage.getItem('token')).then(res => {
    if (res.data.data && res.data.data.createReply) {
      dispatchEntities(res.data.data.createReply, dispatch, replySchema);

      if (isReplyToReply) {
        dispatch({
          type: ADD_REPLY_TO_REPLY,
          payload: {
            parentId: input.parentId,
            childId: res.data.data.createReply.id,
          },
        });
      }

      dispatch({
        type: ADD_REPLY_TO_DISCUSSION,
        payload: {
          discussionId: res.data.data.createReply.discussion.id,
          replyId: res.data.data.createReply.id,
        },
      });
    }

    return res;
  });
};

export default {};
