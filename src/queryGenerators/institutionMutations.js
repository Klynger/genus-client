import { userFragment } from './institutionQueries';

export const mutationCreateInstitution = input => ({
  query: `
    mutation createNewInstitution($input: CreateInstitutionInput!) {
      createInstitution(input: $input) {
        id
        name
        email
        address
        phone
        grades {
          id
          name
          subjects {
            id
            name
            teachers {
              id
            }
            students {
              id
            }
            forum {
              id
              title
              replyNumber
              creationDate
              replies(page: 0, size: 10) {
                id
                content
                user {
                  id
                }
              }
              creator {
                id
              }
            }
          }
        }
        admins {
          ...userFields
        }
        teachers {
          ...userFields
        }
        students {
          ...userFields
        }
      }
    }
    ${userFragment}
  `,
  variables: {
    input,
  },
});

export const mutationJoinInstitution = code => ({
  query: `
    mutation joinNewInstitution($code: String!) {
      joinInstitution(code: $code) {
        id
        name
        email
        phone
        address
        grades {
          id
          name
          subjects {
            id
            name
            teachers {
              id
            }
            students {
              id
            }
            forum {
              id
              title
              replyNumber
              creationDate
              replies(page: 0, size: 10) {
                id
                content
                user {
                  id
                }
              }
              creator {
                id
              }
            }
          }
        }
        admins {
          ...userFields
        }

        teachers {
          ...userFields
        }
        students {
          ...userFields
        }
      }
    }
    ${userFragment}
  `,
  variables: {
    code,
  },
});

export const mutationUpdateInstitution = input => ({
  query: `
    mutation updateInstitution($input: UpdateInstitutionInput!) {
      updateInstitution(input: $input) {
        name
        email
        phone
        address
      }
    }
  `,
  variables: {
    input,
  },
});
