import React from 'react';
import PropTypes from 'prop-types';
import { Fade } from '@material-ui/core';
import { connect } from 'react-redux';

const DetailsPage = ({ institution }) => {
  let toRender;
  if (institution) {
    toRender = (
      <div>
        Details works
      </div>
    );
  } else {
    toRender = <p>Não há nenhuma instituição selecionada</p>;
  }

  return (
    <Fade in>
      {toRender}
    </Fade>
  );
};

DetailsPage.propTypes = {
  institution: PropTypes.object,
};

function mapStateToProps({ institution }) {
  return {
    institution: institution.byId[institution.selectedInstitution],
  };
}

export default connect(mapStateToProps)(DetailsPage);
