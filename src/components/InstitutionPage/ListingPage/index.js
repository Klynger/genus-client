import React from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListFormat from './ListFormat';
import EmptyView from './EmptyView';
import { ResponsiveTitle } from '../../utils/SharedComponents';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListingPage = ({ institutions }) => (
  <Fade style={{ width: '100%' }} in>
    <Container>
      <ResponsiveTitle>Instituições</ResponsiveTitle>
      {institutions.length > 0 ?
        <ListFormat institutions={institutions} /> :
        <EmptyView />
      }
    </Container>
  </Fade>
);

ListingPage.propTypes = {
  institutions: PropTypes.array,
};

ListingPage.defaultProps = {
  institutions: [],
};

function mapStateToProps({ institution }) {
  return {
    institutions: institution.allIds.map(id => institution.byId[id]),
  };
}

export default connect(mapStateToProps)(ListingPage);
