import { FC } from "react";
import { IProduct } from "../interfaces/productInterfaces";
import { Spinner } from "react-bootstrap";

interface ITable {
    products: IProduct[];
    pendingRequest: boolean;
    className: string;
}

const Table: FC<ITable> = ({ products, pendingRequest, className }) => {

    return (
        <>
            {(products.length > 0 && !pendingRequest) ? (
                <table className={`table table-bordered table-hover table-sm ${className}`}>
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Название</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Бренд</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any) => {
                            return (
                                <tr key={product.id}>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.product}</td>
                                    <td>{product.price} руб.</td>
                                    <td>{product.brand || '-'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) : (
                <>
                    {pendingRequest ? (
                        <div>
                            <Spinner animation="border" className="mt-3" />
                            <div>Идет загрузка, пожалуйста, подождите...</div>
                        </div>
                    ) : (
                        <div>По вашему запросу ничего не найдено</div>
                    )}
                </>
            )}
        </>
    )
}

export default Table;