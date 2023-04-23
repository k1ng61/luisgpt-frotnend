const { CronJob } = require('cron');
const fetch = require('node-fetch');

new CronJob(
'5 4 * * *',
async function() {
    const message = 'yeaa';
    console.log('GETTING!');
    const response =  await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      })

console.log('RESPONSE', response);
}, null, true, 'America/Los_Angeles');