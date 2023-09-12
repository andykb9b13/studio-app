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
    const formattedDate = `${date.getDate()} / ${date.getMonth()} / ${date.getDay()} / ${date.getYear()}`;
    return formattedDate;
  }
}

const dateService = new DateService();

export default dateService;
