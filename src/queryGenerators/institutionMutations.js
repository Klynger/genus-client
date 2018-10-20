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
          }
        }
        admins {
          ...userFields
        }
        teachers {
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

export default {};
