import { NodeOperationError } from 'n8n-workflow';
export class Random {
    constructor() {
        this.description = {
            displayName: 'Random',
            name: 'random',
            icon: 'file:random.svg',
            group: ['transform'],
            version: 1,
            description: 'True Random Number Generator using Random.org',
            defaults: {
                name: 'Random',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    options: [
                        {
                            name: 'True Random Number Generator',
                            value: 'trng',
                            description: 'Generate an integer using Random.org',
                            action: 'Generate number',
                        },
                    ],
                    default: 'trng',
                },
                {
                    displayName: 'Min',
                    name: 'min',
                    type: 'number',
                    typeOptions: { minValue: -1_000_000_000, maxValue: 1_000_000_000 },
                    default: 1,
                    required: true,
                    description: 'Minimum integer (inclusive)',
                },
                {
                    displayName: 'Max',
                    name: 'max',
                    type: 'number',
                    typeOptions: { minValue: -1_000_000_000, maxValue: 1_000_000_000 },
                    default: 60,
                    required: true,
                    description: 'Maximum integer (inclusive)',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter('min', i);
            const max = this.getNodeParameter('max', i);
            if (!Number.isFinite(min) || !Number.isFinite(max)) {
                throw new NodeOperationError(this.getNode(), 'Min and Max must be valid numbers', { itemIndex: i });
            }
            if (Math.floor(min) !== min || Math.floor(max) !== max) {
                throw new NodeOperationError(this.getNode(), 'Min and Max must be integers', { itemIndex: i });
            }
            if (min > max) {
                throw new NodeOperationError(this.getNode(), 'Min must be less than or equal to Max', { itemIndex: i });
            }
            // Build Random.org URL
            const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
            // Use n8n's httpRequest helper (respects proxies, etc.)
            const response = await this.helpers.httpRequest({
                method: 'GET',
                url,
                // random.org returns text/plain with a trailing newline
                headers: { 'Accept': 'text/plain' },
                returnFullResponse: false,
            });
            const parsed = parseInt(String(response).trim(), 10);
            if (!Number.isFinite(parsed)) {
                throw new NodeOperationError(this.getNode(), 'Unexpected response from Random.org', { itemIndex: i });
            }
            returnData.push({ json: { result: parsed, min, max, source: 'random.org' } });
        }
        return this.prepareOutputData(returnData);
    }
}
