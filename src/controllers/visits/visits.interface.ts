import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class Visits {
    @IsNotEmpty()
    @ApiProperty({ enum: ['individual', 'tour'] })
    type: 'individual' | 'tour';

    @IsOptional()
    @ApiProperty({ required: false })
    id?: string;
}

export class IndividualVisits extends Visits {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Patient UUID'})
    patient?: string;

    @IsDateString()
    @ApiProperty({ description: 'Format YYYY-MM-DD'})
    date?: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    @ApiProperty({ description: 'Heure de départ format HH:MM' })
    startTime?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    subject?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Tour UUID', required: false })
    tour?: string;
}

export class TourVisits extends Visits {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsMilitaryTime()
    @IsNotEmpty()
    @ApiProperty({ description: 'Heure de départ format HH:MM'})
    startTime: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({type: [String], description: 'Individual visits UUID'})
    individuals: string[];
}