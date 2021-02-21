import { ApiProperty } from "@nestjs/swagger";

export class Dictionary {
    @ApiProperty()
    id: number;
    @ApiProperty()
    label: string;
}
