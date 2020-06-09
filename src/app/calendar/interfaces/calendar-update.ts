/**
 * mode 1 = Change to Previous or Next Month
 * mode 2 = Change to specific date (selected by datepicket)
 * mode 3 = Set filter to current date
 */
export enum CalendarUpdateMode {
    UPDATE_MONTH = 1,
    UPDATE_DATE = 2,
    UPDATE_FILTER = 3
}

export interface CalendarUpdate {
    mode: CalendarUpdateMode,
    value: string
}

