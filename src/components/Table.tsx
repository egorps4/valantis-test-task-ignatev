import { FC } from "react";
import { IProduct } from "../interfaces/productInterfaces";
import { Spinner } from "react-bootstrap";
import DICTIONARY from "../сommon/dictionary";

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
                            <th scope="col">{DICTIONARY.ID}</th>
                            <th scope="col">{DICTIONARY.NAME}</th>
                            <th scope="col">{DICTIONARY.PRICE}</th>
                            <th scope="col">{DICTIONARY.BRAND}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any) => {
                            return (
                                <tr key={product.id}>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.product}</td>
                                    <td>{product.price} {DICTIONARY.RUB}</td>
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
                            <div>{DICTIONARY.LOADING}</div>
                        </div>
                    ) : (
                        <div>{DICTIONARY.NOT_FOUND}</div>
                    )}
                </>
            )}
        </>
    )
}

export default Table;