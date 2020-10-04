const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
require('dotenv').config()

const imageScene = require('./scenes/imageScene').imageScene
const videoScene = require('./scenes/videoScene').videoScene

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Stage([imageScene, videoScene])
bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
    let userFirstName = ctx.message.from.first_name
    let message = ` Hello master ${userFirstName}, i am OCR bot your humble servant. \n
    Where would you like to extract text from ?`

    let options = Markup.inlineKeyboard([
        Markup.callbackButton('Extract from 🖼️', 'extractFromImage'),
        Markup.callbackButton('Extract from 🎬', 'extractFromVideo'),
    ]).extra()
    ctx.reply(message, options)
})

bot.action('extractFromImage', Stage.enter('imageScene'))
bot.action('extractFromVideo', Stage.enter('videoScene'))

bot.launch()
