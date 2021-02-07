// States
export const layoutState = store => store.layout;

// Selectors
export const isSidebarActive = store => layoutState(store).isSidebarActive;
