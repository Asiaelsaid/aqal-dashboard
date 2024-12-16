import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import ReactPaginate from "react-paginate";

interface IPaginationProps {
    totalPages: number;
    onPageChange: (page: { selected: number }) => void;
  }

const Pagination= ({  totalPages, onPageChange }: IPaginationProps) => {
    return (
        <ReactPaginate
          previousLabel={
            <span className="flex items-center space-x-1">
              <FaArrowLeftLong className="mr-1" />
              <span className="text-gray-600">Previous</span>
            </span>
          }
          nextLabel={
            <span className="flex items-center space-x-1">
              <span className="text-gray-600">Next</span>
              <FaArrowRight className="ml-1" />
            </span>
          }
          breakLabel="..."
          onPageChange={onPageChange}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          containerClassName="flex items-center justify-between mt-6"
          previousClassName="mr-auto text-sm text-purple-600   "
          nextClassName="ml-auto text-sm text-purple-600 "
          pageClassName="w-8 h-8 flex items-center justify-center rounded-full text-sm text-gray-500 hover:bg-gray-200"
          activeClassName="bg-gray-100 text-gray-600"
          disabledClassName="text-gray-400 cursor-not-allowed"
          breakClassName="text-gray-500"
        />
      );
};

export default Pagination;