import { Telegraf } from 'telegraf';

const PORT = process.env.PORT || 3000
const BOT_TOKEN = '5401732454:AAGk7e2YYvkCwXgfAk5IHQaOmcya8UIXfmc'
const isProduction = process.env.NODE_ENV === 'production'
const WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN

console.log({ PORT, BOT_TOKEN, isProduction, WEBHOOK_DOMAIN });

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
    const { id } = ctx.chat;
    const { first_name } = ctx.chat;
    bot.telegram.sendMessage(id, first_name);
});

if (isProduction) {
    bot.telegram.setWebhook(`${WEBHOOK_DOMAIN}/bot${BOT_TOKEN}`);
    bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
} else {
    bot.launch();
    const myBot = (await bot.telegram.getMe()).username;
    console.log(`Server has initialized bot nickname. Nick: ${myBot}`);
}
