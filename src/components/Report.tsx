import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "/logo.png";

type RecordTypes = {
  id: number;
  firstName: string;
  surName: string;
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
export default function Report() {
  const [data, setData] = useState<RecordTypes[]>([]);
  const [orientation, setOrientation] = useState("portrait");
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const recordsPerPage = 13;
  const recordsPerPage = currentPage === 1 ? 13 : 20; // Adjust records per

  data.map((record: RecordTypes) => {
    if (record.hasAccount === "true") {
      record.hasAccount = "Yes";
    } else {
      record.hasAccount = "No";
    }
  });

  useEffect(() => {
    axios.get("http://localhost:3000/records").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="border-2 border-red-500 container mx-auto">
      <div className="flex justify-between items-center dark:bg-slate-700">
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
        <div className="text-2xl font-bold print:text-base">
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
      <table className="text-gray-500 dark:text-gray-400 border-collapse">
        <thead className="w-full  text-gray-900 dark:text-white bg-gray-400 dark:bg-black">
          <tr className="w-full">
            <th scope="col" className="border-2 border-gray-600">
              No
            </th>
            <th scope="col" className="px-1 py-2 border-2 border-gray-600">
              Full Name
            </th>
            <th scope="col" className="px-1 py-2 border-2 border-gray-600">
              Father Name
            </th>
            <th scope="col" className="px-1 py-2 border-2 border-gray-600">
              Phone Number
            </th>
            <th scope="col" className=" px-1 py-2 border-2 border-gray-600">
              Gender
            </th>
            <th scope="col" className=" px-1 py-2 border-2 border-gray-600">
              Directorate
            </th>
            <th scope="col" className=" px-1 py-2 border-2 border-gray-600">
              Official Email
            </th>
            <th scope="col" className=" px-1 py-2 border-2 border-gray-600">
              Province
            </th>
            <th scope="col" className=" px-1 py-2 border-2 border-gray-600">
              Account
            </th>
            <th scope="col" className=" px-1 py-2 border-2 border-gray-600">
              Attendance ID
            </th>
            <th scope="col" className="px-1 py-2 border-2 border-gray-600">
              Temporary Address
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((record: RecordTypes) => (
            <tr
              className="bg-white dark:bg-gray-800"
              key={record.id}
              style={{ pageBreakInside: "avoid" }}
            >
              <td
                scope="row"
                className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white  border-2 border-gray-600"
              >
                {record.id}
              </td>
              <td className="px-1 py-1  border-2 border-gray-600">
                {record.firstName + record.surName}
              </td>
              <td className="px-1 py-1 border-2 border-gray-600">
                {record.fatherName}
              </td>
              <td className="px-1 py-1 border-2 border-gray-600">
                {record.phoneNumber}
              </td>
              <td className="px-1 py-1 border-2 border-gray-600">
                {record.genderName}
              </td>
              <td className="px-1 py-1 w-28 border-2 border-gray-600">
                {record.departmentName}
              </td>
              <td className="px-1 py-1 border-2 border-gray-600">
                {record.officialEmail}
              </td>
              <td className="px-1 py-1 border-2 border-gray-600">
                {record.provinceName}
              </td>
              <td className="px-1 py-1 border-2 border-gray-600">
                {record.hasAccount}
              </td>
              <td className="px-1 py-1 border-2 border-gray-600">
                {record.attendanceId}
              </td>
              <td className="px-1 py-1 border-2 border-gray-600">
                {record.temporaryAddress}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
