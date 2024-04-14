const { Client, Intents } = require('discord.js');
const express = require('express');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const app = express();

const TOKEN = process.env.TOKEN;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/send', async (req, res) => {
    const guildId = req.body.guildId;
    const channelId = req.body.channelId;
    const content = req.body.content;

    const targetGuild = client.guilds.cache.get(guildId);
    if (!targetGuild) {
        return res.json({ message: 'Invalid guild ID!' });
    }

    const targetChannel = targetGuild.channels.cache.get(channelId);
    if (!targetChannel || targetChannel.type !== 'GUILD_TEXT') {
        return res.json({ message: 'Invalid channel ID!' });
    }

    try {
        await targetChannel.send(content);
        res.json({ message: 'Message forwarded successfully!' });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Failed to forward message.' });
    }
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.login(TOKEN);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
