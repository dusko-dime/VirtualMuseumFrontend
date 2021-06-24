import React, {useEffect, useState} from "react";
import {fetchMuseums} from "../service/museum.service";
import MuseumCard from "../components/MuseumCard/MuseumCard";
import {Grid} from "@material-ui/core";
import styled from "styled-components";

const HomeLoggedIn = () => {

  const [museums, setMuseums] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await fetchMuseums();
        setMuseums(data);
      } catch (e) {
        console.error(e);
        setMuseums(null);
      }
    })();
  }, []);

  return <Container>
      <Grid container xs={10} lg={9} justify="center" direction="row">
        {museums && museums.map(museum => {
          return (
              <Grid key={museum.id} item xs={3}>
                <MuseumCard key={museum.id} {...museum}/>
              </Grid>
          )
        })}
      </Grid>
  </Container>;
};

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export default HomeLoggedIn;
