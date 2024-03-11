import { FC } from "react";
import { Pagination } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { changePage, decrementPage, incrementPage } from "../store/productSlice";

interface ICustomPagination {
    paginationElemCount: number;
    curPage: number;
    limit: number;
    totalPoductCount: number;
}

const CustomPagination: FC<ICustomPagination> = ({
    paginationElemCount,
    curPage,
    limit,
    totalPoductCount
}) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleNextPage = () => {
        dispatch(incrementPage());
    }

    const handlePrevPage = () => {
        dispatch(decrementPage());
    }

    const handleChangePage = (pageNumber: number) => {
        dispatch(changePage(pageNumber));
    }

    return (
        <Pagination className="mt-3">
            {(curPage !== 1) && (
                <>
                    <Pagination.First onClick={() => handleChangePage} />
                    <Pagination.Prev onClick={handlePrevPage} />
                </>
            )}
            {Array.from({ length: paginationElemCount }, (_, i) => curPage + i - Math.floor(paginationElemCount / 2))
                .filter(pageNum => pageNum > 0 && pageNum <= (totalPoductCount / limit))
                .map((pageNum) => (
                    <Pagination.Item
                        key={pageNum}
                        value={pageNum}
                        active={pageNum === curPage}
                        onClick={() => dispatch(changePage(pageNum))}
                    >
                        {pageNum}
                    </Pagination.Item>
                ))}
            {(curPage !== (totalPoductCount / limit)) && (
                <>
                    <Pagination.Next onClick={handleNextPage} />
                    <Pagination.Last onClick={() => handleChangePage(totalPoductCount / limit)} />
                </>
            )}
        </Pagination>
    )
}

export default CustomPagination;