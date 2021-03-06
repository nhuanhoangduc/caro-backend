// Load env
require('dotenv').config();

const Seneca = require('seneca');
const RepositoryName = require('caro-shared-resource/RepositoryName');



// Load services
Seneca()
    .quiet()
    .use('seneca-amqp-transport')
    .use('services/sendUserId')
    .use('services/broadcast')
    .listen({
        type: 'amqp',
        pin: `repo:${RepositoryName.SOCKET_SERVER},service:*`,
        hostname: process.env.AMQP_HOSTNAME,
        port: process.env.AMQP_PORT,
        vhost: process.env.AMQP_VHOST,
        username: process.env.AMQP_USERNAME,
        password: process.env.AMQP_PASSWORD,
    })
    .ready(function() {
        console.log('--- Service ready:', this.id);
        console.log('--- Plugins:', Object.keys(this.list_plugins()));
    });

