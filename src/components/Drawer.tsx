import { DateRangePicker } from "../shared/components";

const Drawer = () => {
  return (
    <div className="flex flex-col">
      <DateRangePicker
        name="dateRangePicker"
        pastDayLimit={30}
        rangeLimit={10}
      />
    </div>
  );
};

export default Drawer;
