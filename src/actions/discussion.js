import { dispatchEntities } from '../utils/helpers';
import { discussionSchema } from '../models/schema';
import { requestGraphql } from '../utils/HTTPClient';
import { ADD_DISCUSSION_TO_SUBJECT, READ_NOTIFICATION } from './actionTypes';
import { mutationCreateDiscussion } from '../queryGenerators/discussionMutations';
import { readNotificationMutation } from '../queryGenerators/NotificationMutations';

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

export const readNotification = input => dispatch =>
  requestGraphql(readNotificationMutation(input), localStorage.getItem('token')).then(res => {
    if (res.data && res.data.data && res.data.data.readNotification) {
      dispatch({
        type: READ_NOTIFICATION,
        id: input,
      });
    }
  });

export default {};
