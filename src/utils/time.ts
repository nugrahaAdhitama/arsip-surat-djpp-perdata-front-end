export const getMonthName = (monthNumber: any) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNumber];
};

export const formatDate = (inputDateString: any) => {
  const date = new Date(inputDateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = getMonthName(date.getUTCMonth());
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
};

export const convertToDefaultDateValue = (dateTimeString: string) => {
  // Extract the date part from the dateTimeString
  const datePart = dateTimeString.split(" ")[0];

  // Return the date part, which is in the format "YYYY-MM-DD"
  return datePart;
};
