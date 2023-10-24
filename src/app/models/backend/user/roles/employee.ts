export interface Employee {
    specialization: Specialization | undefined;
    skills: any;
    qualification: Qualification | undefined;
    expectedSalary: number | undefined;
    experiences: Experience[] | undefined;
}

interface Specialization {
    id: string;
    name: string;
}

interface Skill {
    id: string;
    name: string;
}

interface Qualification {
    id: string;
    name: string;
}

interface Experience {
    companyName: string;
    period: Period;
}

interface Period {
    from: number;
    to: number;
}

