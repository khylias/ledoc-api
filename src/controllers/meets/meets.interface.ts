import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "../patients/patient.interface";

export class Meet {
    @ApiProperty()
    date: string;

    @ApiProperty()
    subject: string;

    @ApiProperty()
    patient: Patient;
}
