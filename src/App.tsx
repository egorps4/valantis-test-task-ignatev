import { FC, useEffect } from "react";
import Table from "./components/Table";
import Container from 'react-bootstrap/Container';
import { Pagination, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "./store/store";
import { decrementPage, getProductsAsync, getProductsIdsAsync, incrementPage } from "./store/productSlice";

const App: FC = () => {
  const { products, productsIds, page, limit, isLoading, error } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(
      getProductsIdsAsync({
        action: 'get_ids',
        params: { limit, offset: page * limit }
      })
    );
  }, [page]);

  useEffect(() => {
    if (productsIds.length > 0) {
      dispatch(
        getProductsAsync({
          action: 'get_items',
          params: { ids: productsIds }
        })
      );
    }
  }, [productsIds])

  const nextPage = () => {
    dispatch(incrementPage());
  }

  const prevPage = () => {
    dispatch(decrementPage());
  }

  return (
    <Container className="mt-5">
      <Pagination>
        <Pagination.Prev onClick={prevPage} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
      {error && (
        <div className="text-danger mb-2">{error}</div>
      )}
      {!isLoading ? (
        <Table data={products} />
      ) : (
        <div>
          <Spinner animation="border" />
          <div>Идет загрузка, пожалуйста, подождите...</div>
        </div>
      )}
    </Container>
  );
}

export default App;
