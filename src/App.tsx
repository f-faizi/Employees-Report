import { useRef, useState } from "react";
import "./App.css";
import EmployeeReport from "./components/EmployeeReport";
import { useReactToPrint } from "react-to-print";
import Orientation from "./components/Orientation";

function App() {
  const componentRef = useRef(null);
  const [orientationLayout, setOrientationLayout] = useState("portrait");
  const [font, setFont] = useState("8");
  const [width, setWidth] = useState<string>("");
  const [dirction, setDirction] = useState<string>("");
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    // onBeforePrint: () => alert("before printing..."),
    content: () => componentRef.current,
    // onAfterPrint: () => alert("after printing..."),
  });
  console.log(dirction);
  return (
    <>
      <div className="w-[210mm] mx-auto flex justify-between items-center px-4">
        <button
          className="bg-neutral-800 text-white text-sm px-10 py-2.5 rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
          onClick={handlePrint}
        >
          Print
        </button>
        <Orientation
          layout={orientationLayout}
          setLayout={setOrientationLayout}
          font={font}
          setFont={setFont}
          dir={dirction}
          setDir={setDirction}
        />
      </div>
      <div
        className={`w-[${width}] h-screen mt-5 mx-auto py-10 border-[10px] border-gray-800 rounded-lg overflow-y-auto bg-gray-700`}
      >
        <div ref={componentRef}>
          <EmployeeReport
            layout={orientationLayout}
            width={width}
            setWidth={setWidth}
            dir={dirction}
          />
        </div>
      </div>
    </>
  );
}

export default App;
