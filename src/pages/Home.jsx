import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

// CSS
import "./Home.css";
// Date Range Picker
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { registerLicense } from "@syncfusion/ej2-base";

function Home() {
  registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NHaF5cWWdCf1FpRGFGfV5yd0VAalhQTnRaUj0eQnxTdEZiWH5ccXxRRGBcUER1WQ=="
  );
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        setData(res.data);
        setAllData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSelect = (args) => {
    const selectedDates = args && args.value;

    if (selectedDates && selectedDates.length === 2) {
      const startDateObj = new Date(
        selectedDates[0].setHours(0, 0, 0, 0)
      ).getTime();
      const endDateObj = new Date(
        selectedDates[1].setHours(23, 59, 59, 999)
      ).getTime();

      let filteredData = allData.filter((dataItem) => {
        if (dataItem.Date) {
          let dataDate = new Date(dataItem.Date).getTime();
          console.log("Data date:", dataDate);
          console.log("Start date:", startDateObj);
          console.log("End date:", endDateObj);
          return dataDate >= startDateObj && dataDate <= endDateObj;
        }
        return false;
      });
      localStorage.setItem("filteredData", JSON.stringify(filteredData));
      console.log(filteredData);

      setFiltered(filteredData);
      setStartDate(selectedDates[0]);
      setEndDate(selectedDates[1]);
      setData(filteredData);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Users</h1>

      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <div className="date">
            <DateRangePickerComponent
              onChange={handleSelect}
              startDate={startDate}
              endDate={endDate}
            />
            {data.map((item) => (
              <div key={item.id}></div>
            ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">Name</th>
                <th className="table-header">Services</th>
                <th className="table-header">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => {
                let date = new Date(d.Date);
                let formattedDate = date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <tr key={i}>
                    <td className="table-data">{d.ID}</td>
                    <td className="table-data">{d.Name}</td>
                    <td className="table-data">{d.Service}</td>
                    <td className="table-data">{formattedDate}</td>
                    <td className="table-data">
                      <button className="btn btn-sm btn-info me-2">Read</button>
                      <button className="btn btn-sm btn-primary me-2">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link
          to={{ pathname: "/PDF", state: { data: filtered } }}
          className={`btn btn-success ${filtered.length === 0 && "disabled"}`}
        >
          {" "}
          PDF{" "}
        </Link>
      </div>
    </div>
  );
}

export default Home;
