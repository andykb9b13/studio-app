// Utility functions for working with and manipulating dates

class DateService {
  constructor(today) {
    this.today = today;
    this.getTodaysDate();
    this.makeDateObj();
  }
  dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  dateObj = {
    date: 0,
    month: 0,
    year: 0,
    hour: 0,
    minute: 0,
    seconds: 0,
    day: 0,
    dayName: "",
    monthName: "",
  };

  getTodaysDate() {
    this.today = new Date();
    return this.today;
  }

  makeDateObj() {
    this.dateObj.date = this.today.getDate();
    this.dateObj.month = this.today.getMonth();
    this.dateObj.year = this.today.getFullYear();
    this.dateObj.hour = this.today.getHours();
    this.dateObj.minute = this.today.getMinutes();
    this.dateObj.seconds = this.today.getSeconds();
    this.dateObj.day = this.today.getDay();
    this.dateObj.dayName = this.dayNames[this.dateObj.day];
    this.dateObj.monthName = this.monthNames[this.dateObj.month];
    return this.dateObj;
  }

  formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    // Adding 1 to get the correct month (0-based index)
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }
}

const dateService = new DateService();

export default dateService;
