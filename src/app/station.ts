
export interface Station {
    name: string;
    members: string[];
    events: {
        description: string;
        number?: string | undefined;
        red: boolean;
        date: string;
        attendance: boolean[];
    }[]
}
