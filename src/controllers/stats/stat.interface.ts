import { ApiProperty } from "@nestjs/swagger";

export class Stat {
    
    @ApiProperty()
    meeting: number;
    
    @ApiProperty()
    emergencies: number;
    
    @ApiProperty()
    videoMeeting: number;
    
    @ApiProperty()
    availablesAssits: number;
    
    @ApiProperty()
    orders: number;
    
    @ApiProperty()
    missingCalls: number;
}
