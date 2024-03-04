import { FC } from "react";

const Table: FC<{ data: any }> = ({ data }) => {

    return (
        <table className="table table-bordered table-hover">
            <thead className="table-dark">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Название</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Бренд</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product: any) => {
                    return (
                        <tr key={product.id}>
                            <th scope="row">{product.id}</th>
                            <td>{product.name}</td>
                            <td>{product.price} руб.</td>
                            <td>{product.brand}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;