// States
export const titlesState = store => store.titles;

// Selectors
export const getTitles = store => titlesState(store).titles;
