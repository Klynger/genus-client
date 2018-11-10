import { discussionSchema } from '../models/schema';
import { dispatchEntities } from '../components/utils/helpers';
import { requestGraphql } from '../components/utils/HTTPClient';
import { mutationCreateDiscussion } from '../queryGenerators/discussionMutations';
import { ADD_DISCUSSION_TO_SUBJECT } from './actionTypes';

export const createDiscussion = input => dispatch => {
  return requestGraphql(mutationCreateDiscussion(input), localStorage.getItem('token')).then(
    res => {
      const result = res;
      if (res.data.data && res.data.data.createDiscussion) {
        dispatchEntities(res.data.data.createDiscussion, dispatch, discussionSchema);
        dispatch({
          type: ADD_DISCUSSION_TO_SUBJECT,
          payload: {
            subjectId: res.data.data.createDiscussion.subject.id,
            discussionId: res.data.data.createDiscussion.id,
          },
        });
      }
      return result;
    },
  );
};

export default {};
