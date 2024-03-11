import { FC, FormEvent, MouseEvent, useEffect, useState } from "react";
import Table from "./components/Table";
import Container from 'react-bootstrap/Container';
import { Alert, Button, Form, InputGroup, Spinner, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "./store/store";
import { getProductsAsync, getFilteredProductsAsync, changePage } from "./store/productSlice";
import { FilterName } from "./сommon/enum";
import CustomPagination from "./components/Pagination";
import { getProductsFieldsAsync } from "./store/productFieldSlice";
import { fetchWithRetry } from "./utils/fetchWithRetry";

const App: FC = () => {
  const {
    products,
    page,
    limit,
    pendingRequest,
    error
  } = useSelector((state: RootState) => state.products);

  const {
    fields,
    pendingRequest: pendingRequestFields,
    error: errorFields,
  } = useSelector((state: RootState) => state.productsFields);

  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      getProductsFieldsAsync({
        action: 'get_fields',
      })
    );
  }, [])

  useEffect(() => {
    fetchWithRetry(dispatch, getProductsAsync, {
      action: 'get_ids',
      params: { limit, offset: page * limit }
    })
  }, [page]);


  const handleFilterClick = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;

    if (target.value === filterValue) {
      setFilterValue(null);

      if (isFiltered) {
        dispatch(
          getProductsAsync({
            action: 'get_ids',
            params: { limit, offset: 1 * limit }
          })
        );

        setIsFiltered(false);
        setSearchValue('')
      }
      return
    }

    setFilterValue(target.value);
  }

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (filterValue && searchValue) {
      dispatch(
        getFilteredProductsAsync({
          action: 'filter',
          params: {
            [filterValue]: filterValue === 'price' ? Number(searchValue) : searchValue,
          }
        })
      );

      dispatch(changePage(1));
      setIsFiltered(true);
    }
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Container className="mt-5">
      {products.length > 0 && page && (
        <CustomPagination
          paginationElemCount={5}
          totalPoductCount={isFiltered ? products.length : 1000}
          limit={isFiltered ? products.length : limit}
          curPage={page}
        />
      )}
      <div>
        <div>Фильтр по:</div>
        {!errorFields ? (
          <Stack direction="horizontal" gap={2} className="mt-2">
            {fields.map((field: string, index: number) => (
              <Button
                key={index}
                id={field}
                variant={"dark"}
                name={field}
                value={field}
                active={filterValue === field}
                onClick={handleFilterClick}
              >
                {FilterName[field as keyof typeof FilterName]}
              </Button>
            ))}
          </Stack>
        ) : (
          <div className="text-danger">{errorFields}</div>
        )}
      </div>
      {filterValue && (
        <Form onSubmit={handleSearchSubmit}>
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              placeholder="Поиск"
              aria-describedby="search"
              value={searchValue}
              onChange={handleChangeSearch}
            />
            <Button
              variant="outline-secondary"
              id="search"
              type="submit"
            >
              Найти
            </Button>
          </InputGroup>
        </Form>
      )}
      {!error ? (
        <Table products={products} pendingRequest={pendingRequest} className="mt-3" />
      ) : (
        <Alert variant={'danger'} className="mt-3">
          {error}
        </Alert>
      )}
    </Container >
  );
}

export default App;
