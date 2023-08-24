import 'dotenv/config';

import pm2 from 'pm2';

const config = {
    name: 'pm2-agent',
    cwd: process.cwd(),
    script: `npm`,
    args: ['run', 'app:start'],
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
};

pm2.start(config, () => {
    console.log('pm2-agent started');
});

process.exit(0);
