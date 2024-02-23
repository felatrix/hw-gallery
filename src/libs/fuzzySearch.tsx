export const fuzzySearch = (query: string, itemTitle: string): boolean => {
    const searchTermLowerCase = query.toLowerCase();
    const itemTitleLowerCase = itemTitle.toLowerCase();
    let i = 0;
    let j = 0;

    while (i < searchTermLowerCase.length && j < itemTitleLowerCase.length) {
      if (searchTermLowerCase[i] === itemTitleLowerCase[j]) {
        i++;
      }
      j++;
    }

    return i === searchTermLowerCase.length;
  };
