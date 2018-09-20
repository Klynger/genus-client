import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const EmptyView = () => (
  <Container>
    <Typography>
      Você não possui nenhuma instituição
    </Typography>
  </Container>
);

export default EmptyView;
