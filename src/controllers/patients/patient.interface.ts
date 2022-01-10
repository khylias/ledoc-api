import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class PatientDocument {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    extension: string;

    @IsOptional()
    @ApiProperty()
    uploadAt: string;
}

class PatientTreatment {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    drug: number;

    @IsNotEmpty()
    @ApiProperty({type: 'array', items: { type: 'number'}})
    repeat: number[];

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    duration: number;
}

export class Patient {
    @ApiProperty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    gender?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    allergies?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    height?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    weight?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    lastIncome?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    lastSubject?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    bloodGroup?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    socialNumber?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    notes?: string;
    
    @IsOptional()
    @ApiProperty({
        type: PatientDocument,
        isArray: true,
    })
    documents?: PatientDocument[];

    @IsOptional()
    @ApiProperty({
        type: PatientTreatment,
        isArray: true,
    })
    treatments?: PatientTreatment[];
}