import { useEffect, useState } from "react";
import axios from "axios";
import logo from "/logo.png";


type RecordTypes = {
  id: number;
fullName: string,
  fatherName: string;
  phoneNumber: string;
  genderName: string;
  departmentName: string;
  officialEmail: string;
  provinceName: string;
  hasAccount: string;
  attendanceId: string;
  temporaryAddress: string;
};

type EmployeeReportProps = {
  layout: string;
  page: string;
  width: string;
  setWidth: (width: string)=> void;
  dir: string;
};

export default function EmployeeReport({layout, page, width, setWidth, dir}: EmployeeReportProps) {
  const [data, setData] = useState<RecordTypes[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState(28)

  useEffect(() => {
    axios
      .get("http://localhost:3000/records")
      .then((response) => {
        const updatedData = response.data.map((record: RecordTypes) => {
          return {
            ...record,
            hasAccount: record.hasAccount === "true" ? "Yes" : "No",
          };
        });
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      if (layout === "portrait" && page === "A4") {
        setWidth("w-[210mm]");
        setRecordsPerPage(26);
      }
       else if (layout === "landscape" && page === "A4") {
          setWidth("w-[297mm]");
          setRecordsPerPage(18);

       }
       else if (layout === "portrait" && page === "A3") {
        setWidth("w-[297mm]");
        setRecordsPerPage(42);

      }
      else if (layout === "landscape" && page === "A3") {
        setWidth("w-[420mm]");
        setRecordsPerPage(26);
     }
     
     const direction =  dir === "english" ? "ltr" : "rtl";
       
    }, [width, layout, recordsPerPage, page, dir]);
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const thStyle =
    page === "A4"
      ? page === "A4" && layout === "portrait"
        ? `table-th text-[8px]`
        : `table-th text-[10px] font-bold`
      : page === "A3" && layout === "portrait"
      ? `table-th text-[10px] font-bold`
      : `table-th text-[12px] font-bold`;

  const tdStyle =
    page === "A4"
      ? page === "A4" && layout === "portrait"
        ? `table-td text-[8px]`
        : `table-td text-[9px] font-bold`
      : page === "A3" && layout === "portrait"
      ? `table-td text-[9px] font-bold`
      : `table-td text-[10px] font-bold`;


  const totalPages = Math.ceil(data.length / recordsPerPage);




  return (
    <div className={`${width} mx-auto px-5`} dir={dir}>
      {/* here this is sprateing the pages into multiple pages and map the data into the pages  */}
      {Array.from({ length: totalPages }).map((_, pageIndex) => (
        // this is the page break section starts
        <div key={pageIndex} className="page-break mb-5 py-2">
          {/* here is the table header section starts */}
          <div className="flex justify-between items-center text-black border-[2px] border-black border-b-0 px-2 py-4">
            <div className="flex-col justify-center items-center text-center">
              <img
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="mx-auto"
              />
              <p className="text-sm w-[20ch] font-bold pt-2">
                امارت اسلامی افغانستان وزارت انرژی آب
              </p>
            </div>
            <div className="text-lg text-center font-bold print:text-base">
              <h3>بسم الله الرحمن الرحیم</h3>
              <h3>Islamic Emirate of Afghanistan</h3>
              <h3 className="w-[25ch]">
                Ministry of Energy and Water Employees Report
              </h3>
            </div>
            <div className="flex-col justify-center items-center text-center">
              <img
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="mx-auto"
              />
              <p className="text-sm w-[20ch] font-bold pt-2">
                {" "}
                امارت اسلامی افغانستان وزارت انرژی آب
              </p>
            </div>
          </div>
          {/* here is the table header section ends */}
          {/* here table starts  */}
          <table className="table-style print:text-black">
            {/* here is the table header section starts  */}
            <thead className=" bg-gray-600">
              <tr className="w-full">
                <th scope="col" className={` ${thStyle}`}>
                  No
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Full Name
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Father Name
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Phone Number
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Gender
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Directorate
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Official Email
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Province
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Account
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Attendance ID
                </th>
                <th scope="col" className={` ${thStyle}`}>
                  Temporary Address
                </th>
              </tr>
            </thead>
            {/* here is the table header section ends  */}
            {/* here is the table body section starts and map the data  */}
            <tbody>
              {data
                .slice(
                  pageIndex * recordsPerPage,
                  (pageIndex + 1) * recordsPerPage
                )
                .map((record: RecordTypes) => (
                  <tr
                    className="bg-white"
                    key={record.id}
                    style={{ pageBreakInside: "avoid" }}
                  >
                    <td scope="row" className={`${tdStyle}`}>
                      {record.id}
                    </td>
                    <td className={`${tdStyle}`}>{record.fullName}</td>
                    <td className={`${tdStyle}`}>{record.fatherName}</td>
                    <td className={`${tdStyle}`}>{record.phoneNumber}</td>
                    <td className={`${tdStyle}`}>{record.genderName}</td>
                    <td className={`${tdStyle}`}>{record.departmentName}</td>
                    <td className={`${tdStyle}`}>{record.officialEmail}</td>
                    <td className={`${tdStyle}`}>{record.provinceName}</td>
                    <td className={`${tdStyle}`}>{record.hasAccount}</td>
                    <td className={`${tdStyle}`}>{record.attendanceId}</td>
                    <td className={`${tdStyle}`}>{record.temporaryAddress}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}