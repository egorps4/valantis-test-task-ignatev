import { FC, useEffect } from "react";
import Table from "./components/Table";
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "./store/store";
import { getProductsAsync, getProductsIdsAsync } from "./store/productSlice";

const App: FC = () => {
  const { products, productsIds, page, limit } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(
      getProductsIdsAsync({
        action: 'get_ids',
        params: { limit, offset: page * limit }
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getProductsAsync({
        action: 'get_items',
        params: { ids: productsIds }
      })
    );
  }, [productsIds])

  return (
    <Container className="mt-5">
      <Table data={products} />
    </Container>
  );
}

export default App;
