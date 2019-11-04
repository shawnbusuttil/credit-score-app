export type Employment = "Student" | "Part-Time" | "Full-Time";

export interface Customer {
    id: number;
    name: string;
    dateOfBirth: string;
    employment: Employment;
    annualIncome: number;
    address: {
        houseNumber: number;
        postCode: string;
    };
}