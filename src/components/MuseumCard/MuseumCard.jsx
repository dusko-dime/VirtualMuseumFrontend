import React from "react";
import styled from "styled-components";

const MuseumCard = ({id, name, museumType, city, latitude, longitude}) => {
    return (
        <Container>
            {name}
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  width: 200px;
  height: 300px;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 10px;
`;

export default MuseumCard;