type OrientationProps = {
  layout: string;
  setLayout: (layout: string) => void;
  page: string;
  setPage: (page: string) => void;
  font: any;
  setFont: (font: string) => void;
  dir: string;
  setDir: (dir: string) => void;
};

export default function Orientation({
  layout,
  setLayout,
  page,
  setPage,
  dir,
  setDir
}: 
OrientationProps) {

  return (
    <form className="w-[50%]">
      <div className="flex justify-between items-center">
          <select
            id="states"
            className="rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            value={dir}
            onChange={(e) => setDir(e.target.value as any)}
          >
            <option selected value="ltr">
              English
            </option>
            <option value="rtl">پشتو</option>
          </select>

        <select
          id="states"
          className="rounded-s-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
          value={page}
          onChange={(e) => setPage(e.target.value as any)}
        >
          <option selected value="A4">
            A4
          </option>
          <option value="A3">A3</option>
        </select>
        <select
          id="states"
          className="rounded-e-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
          value={layout}
          onChange={(e) => setLayout(e.target.value as any)}
        >
          <option selected value="portrait">
            Portrait
          </option>
          <option value="landscape">Landscape</option>
        </select>
      </div>
    </form>
  );
}
