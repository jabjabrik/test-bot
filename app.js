import { Telegraf } from 'telegraf';

const PORT = process.env.PORT || 3000
const BOT_TOKEN = '5401732454:AAGk7e2YYvkCwXgfAk5IHQaOmcya8UIXfmc'
const isProduction = process.env.NODE_ENV === 'production'
const WEBHOOK_DOMAIN = process.env.CYCLIC_URL

console.log({ PORT, BOT_TOKEN, isProduction, WEBHOOK_DOMAIN });

const bot = new Telegraf(BOT_TOKEN);

bot.start(async ctx => {
    const { id } = ctx.chat;
    const { first_name } = ctx.chat;
    bot.telegram.sendMessage(id, first_name);
});

if (isProduction) {
    bot.launch({ webhook: { domain: WEBHOOK_DOMAIN, port: PORT } })
        .then(() => console.info(`The bot ${bot.botInfo.username} is running on server`))
} else {
    bot.launch();
    const myBot = (await bot.telegram.getMe()).username;
    console.log(`Server has initialized bot nickname. Nick: ${myBot}`);
}


// https://api.telegram.org/bot5401732454:AAGk7e2YYvkCwXgfAk5IHQaOmcya8UIXfmc/setWebhook?url=https://real-tan-moose-hem.cyclic.app


// To set webhook –
// https://api.telegram.org/bot5401732454:AAGk7e2YYvkCwXgfAk5IHQaOmcya8UIXfmc/setWebhook?url=https://teal-glamorous-fossa.cyclic.app&drop_pending_updates=true

// To delete webhook –
// https://api.telegram.org/bot5401732454:AAGk7e2YYvkCwXgfAk5IHQaOmcya8UIXfmc/deleteWebhook

// Get webhook information –
// https://api.telegram.org/bot5401732454:AAGk7e2YYvkCwXgfAk5IHQaOmcya8UIXfmc/getWebhookInfo