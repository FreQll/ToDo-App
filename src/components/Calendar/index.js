import React, { useCallback, useMemo, useState } from "react";
import CalendarIcon from "../icons/CalendarIcon";
import "./styles.scss";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { monthNames, dayNames } from "../../constants/constants";

const Calendar = () => {
  const [opened, setOpened] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pickYearOpened, setPickYearOpened] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const currentYear = useMemo(() => {
    return currentDate.getFullYear();
  }, [currentDate]);

  const currentMonth = useMemo(() => {
    return currentDate.getMonth();
  }, [currentDate]);

  const currentDay = useMemo(() => {
    return currentDate.getDate();
  }, [currentDate]);

  const formatedData = useMemo(() => {
    return `${
      currentDay.toString().length === 1 ? `0${currentDay}` : `${currentDay}`
    }/${
      (currentMonth + 1).toString().length === 1
        ? `0${currentMonth + 1}`
        : `${currentMonth + 1}`
    }/${currentYear}`;
  }, [currentDay, currentMonth, currentYear]);

  const getDays = useMemo(() => {
    const daysInCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    const days = Array.from(Array(daysInCurrentMonth), (_, index) => index + 1); //TODO fix this part of code
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const emptyDaysArray = Array(firstDayOfMonth).fill("");

    return [...emptyDaysArray, ...days];
  }, [currentMonth, currentYear]);

  const getYears = useMemo(() => {
    const years = Array.from(
      { length: 2100 - 1900 },
      (_, index) => 1900 + index
    );
    return years;
  }, []);

  const previousMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
    setIsNext(false);
  }, [currentDate, setIsNext]);

  const nextMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
    setIsNext(true);
  }, [currentDate, setIsNext]);

  const handleCalendarOpen = useCallback(() => {
    setOpened((prevState) => !prevState);
  }, []);

  const pickYear = useCallback(() => {
    setPickYearOpened((prevState) => !prevState);
  }, []);

  const setYear = useCallback(
    (event) => {
      const selectedYear = event.currentTarget.getAttribute("data-year");
      const newDate = new Date(currentDate);
      newDate.setFullYear(selectedYear);
      setCurrentDate(newDate);
      pickYear();
    },
    [currentDate, pickYear]
  );

  const setDay = useCallback(
    (event) => {
      const selectedDay = event.currentTarget.getAttribute("data-day");
      const newDate = new Date(currentDate);
      newDate.setDate(selectedDay);
      setCurrentDate(newDate);
      handleCalendarOpen();
    },
    [currentDate, handleCalendarOpen]
  );

  return (
    <div className="calendar">
      <div className="calendar-input">
        <input value={formatedData} readOnly />
        <div onClick={handleCalendarOpen}>
          <CalendarIcon />
        </div>
      </div>

      <CSSTransition in={opened} timeout={400} classNames="date" unmountOnExit>
        <div className="date-picker">
          <div className="header">
            <div onClick={pickYear} className="date">
              <div>
                {`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
              </div>
              <div className={`year-pick ${pickYearOpened ? "open" : ""}`}>
                ▼
              </div>
            </div>
            {!pickYearOpened && (
              <div className="control-months">
                <div onClick={previousMonth}>‹</div>
                <div onClick={nextMonth}>›</div>
              </div>
            )}
          </div>

          {!pickYearOpened ? (
            <div className="date-view">
              <div className="days-grid">
                {dayNames &&
                  dayNames.map((dayOfWeek) => {
                    return (
                      <div key={uuidv4()} className="day-names">
                        {dayOfWeek}
                      </div>
                    );
                  })}
                <TransitionGroup component={null}>
                  {getDays.map((day) => {
                    return (
                      <CSSTransition
                        timeout={500}
                        classNames={`item${isNext ? "" : "-left"}`}
                        key={`day${uuidv4()}`}
                        exit={false}
                      >
                        <div
                          className={`${day ? "day-element" : ""}  ${
                            currentDay === day ? "active" : ""
                          }`}
                          data-day={day}
                          onClick={setDay}
                        >
                          {day}
                        </div>
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
              </div>
            </div>
          ) : (
            <div className="year-view">
              {getYears &&
                getYears.map((year) => {
                  return (
                    <div
                      key={`year${year}`}
                      className={`year-element ${
                        currentYear === year ? "active" : undefined
                      }`}
                    >
                      <div onClick={setYear} data-year={year}>
                        {year}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Calendar;
