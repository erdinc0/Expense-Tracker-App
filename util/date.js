export let getFormattedDate = (date) => {
  let ay = date.getMonth() + 1;
  return date.getFullYear() + "-" + ay + "-" + date.getDate();
};

export let getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
