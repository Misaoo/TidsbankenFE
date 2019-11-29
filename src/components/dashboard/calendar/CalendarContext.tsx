import React from 'react';

const CalendarContext = React.createContext<any>({});
// Setting displayname for the context to allow to easier see the context in Reacts developer tools.
CalendarContext.displayName = "CalendarContext";

export default CalendarContext;