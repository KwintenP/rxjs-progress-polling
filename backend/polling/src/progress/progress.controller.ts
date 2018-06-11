import { Controller, Get } from '@nestjs/common';

interface ProgressUpdate {
    percentage: number;
    done: boolean;
}

@Controller('api/progress')
export class ProgressController {
    percentage = 0;

    @Get()
    progress(): ProgressUpdate {
        this.percentage = this.percentage + Math.floor(Math.random() * Math.floor(30));
        return {
            percentage: this.percentage > 100 ? 100 : this.percentage,
            done: this.percentage >= 100
        }
    }

    @Get('reset')
    reset(): string {
        this.percentage = 0;
        return 'reset the percentage';
    }
}
