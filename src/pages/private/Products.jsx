import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React from 'react';
import SkinProduct from '../../components/Products/SkinProduct';
import { db } from '../../config/firebase-config';

function Home({ isAdmin }) {
  const productsCollection = collection(db, 'products');
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    let unsub = null;
    (async function () {
      const q = query(productsCollection);
      unsub = onSnapshot(q, querySnapshot => {
        setProducts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
    })();

    return () => {
      if (unsub) unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth='lg' sx={{ marginY: 5 }}>
        <Grid container spacing={5}>
          {products.map((product, index) => {
            return <SkinProduct key={index} product={product} isAdmin={isAdmin} />;
          })}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
