function sortArrayByParams(array, sortDirection, field) {
  if (sortDirection) {
    return array.toSorted((a, b) => {
      return a[field].localeCompare(b[field]);
    });
  } else {
    return array.toSorted((a, b) => {
      return b[field].localeCompare(a[field]);
    });
  }
}

export default sortArrayByParams;
