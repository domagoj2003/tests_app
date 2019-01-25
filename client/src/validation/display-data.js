export const resultsDisplay = data => {
  data.forEach(element => {
    element.grade = element.grade === "prvi" ? 1 : element.grade;
    element.grade = element.grade === "drugi" ? 2 : element.grade;
    element.grade = element.grade === "treci" ? 3 : element.grade;
    element.grade = element.grade === "cetvrti" ? 4 : element.grade;
    element.grade = element.grade === "peti" ? 5 : element.grade;
    element.grade = element.grade === "sesti" ? 6 : element.grade;
    element.grade = element.grade === "sedmi" ? 7 : element.grade;
    element.grade = element.grade === "osmi" ? 8 : element.grade;

    let regExp = /_/gi;

    let subjectUpperCase = element.subject[0].toUpperCase();
    let subjectLowerCase = element.subject
      .slice(1, element.length)
      .toLowerCase();
    element.subject = subjectUpperCase
      .concat(subjectLowerCase)
      .replace(regExp, " ");

    let sectionUpperCase = element.section[0].toUpperCase();
    let sectionLowerCase = element.section
      .slice(1, element.length)
      .toLowerCase();
    element.section = sectionUpperCase
      .concat(sectionLowerCase)
      .replace(regExp, " ");

    return element;
  });
  return data;
};

export const dataDisplay = data => {
  let regExp = /_/gi;

  let subjectUpperCase = data[0].toUpperCase();
  let subjectLowerCase = data.slice(1, data.length).toLowerCase();
  return (data = subjectUpperCase
    .concat(subjectLowerCase)
    .replace(regExp, " "));
};

export const results_sort_desc = (result1, result2) => {
  if (result1.percentage > result2.percentage) return -1;
  if (result1.percentage < result2.percentage) return 1;
  return 0;
};

export const date_sort_desc = (result1, result2) => {
  if (result1.date > result2.date) return -1;
  if (result1.date < result2.date) return 1;
  return 0;
};
