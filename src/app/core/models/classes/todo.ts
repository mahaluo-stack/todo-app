import { GridDate } from "../interfaces/gridDate";
import { TimePicker } from "../interfaces/timePicker";

interface TodoFunc {
    finishTodo(date: Date): void;
    setId(id: string): void;
    getId(): string;
    checkFinished(): string;
}

export interface TodoFields {
    title: string;
    id: string;
    time: TimePicker;
    timeString: string;
    date?: GridDate;
    dateCreated: Date;
    dateFinished?: Date;
}

export class Todo implements TodoFunc, TodoFields {

    title: string;
    time!: TimePicker;
    timeString!: string;
    id!: string;
    dateCreated: Date;
    dateFinished: Date;

    constructor(title: string, dateCreated: Date, dateFinished: Date) {
        this.title = title;
        this.dateCreated = dateCreated ? dateCreated : new Date();
        this.dateFinished = dateFinished ? dateFinished : new Date();
    }


    setId(id: string) { this.id = id; }
    getId(): string { return this.id; }

    finishTodo(date: Date) { 
        this.dateFinished = date;
    }

    checkFinished(): string {
        return `${this.title} ` +
            (this.dateFinished !== null ?
                `was finished on: ${this.dateFinished}.`
                :
                `has not yet been finished.`
            )
    }
}