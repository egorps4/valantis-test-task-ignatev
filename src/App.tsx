import { FC, useEffect } from "react";
import Table from "./components/Table";
import Container from 'react-bootstrap/Container';
import ProductService from "./services/ProductService";

const fakeData = [
  {
      id: 1,
      name: 'Рубашка',
      price: '5214',
      brand: 'адидас',
  },
  {
      id: 2,
      name: 'Cумка',
      price: '5324',
      brand: 'Бренд',
  },
  {
      id: 3,
      name: 'Ботинки',
      price: '2345',
      brand: 'найк',
  },
]

const App: FC = () => {

  return (
    <Container className="mt-5">
      <Table data={fakeData} />
    </Container>
  );
}

export default App;
