import React, { useEffect, useState } from "react";
import * as R from "ramda";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import inputStyles from "./Input.module.scss";
import "./InputDatePicker.scss";
import { Typography } from "@mui/material";

interface InputDatePickerProps {
  label?: string;
  value?: string;
  className?: any;
  onChange?: (value: string | string[]) => void;
  onBlur?: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  dateFormat?: string;
  disabledPreviousDate?: boolean;
}

const InputDatePicker: React.FunctionComponent<InputDatePickerProps> = ({
  label = "",
  value = "",
  className = null,
  onChange = () => {},
  onBlur = () => {},
  error = false,
  helperText = null,
  disabled = false,
  placeholder = "",
  dateFormat = "DD/MM/YYYY",
  disabledPreviousDate = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<any>("");

  const handleDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    onChange(dateString);
  };

  useEffect(() => {
    if (!R.isEmpty(value) && !R.isEmpty(value)) {
      setSelectedDate(dayjs(value, dateFormat));
    }
  }, [value]);

  const renderDisabledPreviousDate = (current: any) => {
    // Disable all dates before tomorrow
    return current && current < dayjs().startOf("day");
  };

  const dateRender = (current: any) => {
    const style: any = {};
    if (current.isSame(dayjs(), "day")) {
      style.background = "#1890ff";
      style.color = "white";
    }
    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    );
  };

  return (
    <div className={inputStyles.container}>
      <div className={inputStyles.label_container}>
        <p>{label}</p>
      </div>

      <div style={{ width: "100%" }}>
        <DatePicker
          className={[className].join(" ")}
          value={selectedDate}
          format={dateFormat}
          onChange={handleDateChange}
          onBlur={(e) => {
            const target = e.target as HTMLInputElement; // Explicitly cast event.target
            onBlur(target.value);
          }}
          placeholder={placeholder}
          disabled={disabled}
          status={error === true ? "error" : ""}
          disabledDate={
            disabledPreviousDate === true
              ? renderDisabledPreviousDate
              : undefined
          }
          dateRender={dateRender}
        />

        {helperText ? (
          <Typography
            className={inputStyles.custom_helper_text}
            style={
              {
                "--color": error === false ? "black" : null,
              } as any
            }
          >
            {helperText}
          </Typography>
        ) : null}
      </div>
    </div>
  );
};

export default InputDatePicker;
