import { loader } from 'graphql.macro';

const {
  loc: {
    source: { body: getInstitutionsFromLoggedUser },
  },
} = loader('./graphql/institution/getInstitutionsFromLoggedUser.graphql');

export const queryFindInstitutionsByOwner = () => ({
  query: getInstitutionsFromLoggedUser,
});

export default {};
