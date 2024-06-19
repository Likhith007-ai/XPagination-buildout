import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export const EmployeeDataTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
      } catch (error) {
        setError(error.message);
        alert("failed to fetch data")
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="employee-data-table">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePrevClick}>
          Previous
        </button>
        <span className="page-number">{currentPage}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeDataTable;
