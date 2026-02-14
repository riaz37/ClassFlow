import { Controller, All, Req, Res } from '@nestjs/common';
import { serve } from 'inngest/express';
import { InngestService } from './inngest.service';
import { inngest } from './inngest.client';

@Controller('inngest')
export class InngestController {
    constructor(private readonly inngestService: InngestService) { }

    @All()
    async handleRequest(@Req() req: any, @Res() res: any) {
        const handler = serve({
            client: inngest,
            functions: this.inngestService.getFunctions(),
        });
        return handler(req, res);
    }
}
