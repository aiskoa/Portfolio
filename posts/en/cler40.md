---
title: "Cler Discord Bot Version 4.7"
excerpt: "Multipurpose Discord Bot for Node and PostgreSQL"
date: "Oct 01 2024"
cover_image: "/blog/cler2.webp"
alt: "Cler 14 Discord"
tags1: "JavaScript"
tags2: "PostgreSQL"
---

![Cler](https://raw.githubusercontent.com/aiskoa/Cler/refs/heads/main/title.jpg)

# Cler

## Cler Discord multipurpose bot

**Cler** is a Discord bot to manage your server, it has multiple commands such as administration, utility and fun.

[Cler's Monitor](https://bit.ly/cler-bot)

[Invite Cler on your server](https://discord.com/oauth2/authorize?client_id=774150617546883073&permissions=8&scope=bot)

![Cler_Info](https://i.imgur.com/c7p8GwP.png)

## Latest Version and What's New

**v4.7.20**

## (Asynchronous Transfer Mode)

* Use the prefix. `c!` or the Slash `/` for moderation commands
* Bot in Discord.js v14.16.2

P.S.: If I abandoned this project it's because I got bored or made a better version.

![ClerAPPS](https://i.imgur.com/qs2J4eg.png)

## 💻 Installation

To install and run Cler locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone git@github.com:aiskoa/Cler.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd Cler
    ```

3. **Create a .env configuration file inside the directory**:

    ```bash
    BOT_TOKEN=YOUR_BOT_TOKEN
    CLIENT_ID=YOUR_CLIENT_ID
    GUILD_ID=YOUR_GUILD_ID
    PREFIX='YOUR_PREFIX'
    COLOR='0x5e10f8'
    OWNER=YOUR_DISCORD_ID
    ```

4. **Install the dependencies**:

    ```bash
    npm install
    ```

5. **Run the global load command**:

    ```bash
    npm deploy-commands.js
    ```

6. **Run the start command**:

    ```bash
    npm start
    ```

    Go to your discord server where you invited your bot and run the /help command.

## Commands

Full list of commands in [Documentation](https://aiskoa.gitbook.io/cler)

Structure and Diagramming in [Github](https://github.com/aiskoa/Cler) Repository

## Admin / Mod

* `/mute  <@member> <reason>` Mutes the tagged member.
* `/unmute  <@member> <reason>` Unmutes the tagged member.
* `/set_mute  <@rol>` Defines the Mute role on the server **Important**.
* `/ban <@member> <reason>` Permanently bans the tagged member from the server.
* `/unban <@member>` Revokes the ban from the previous command.
* `/kick <@member> <reason>` Kicks the tagged member from the server.
* `/softban <@member> <reason>` Temporarily kicks the tagged member from the server for 7 days.
* `/warn <@member> <reason>` Warns the selected member

Full list of commands in [Documentation](https://aiskoa.gitbook.io/cler)

### Contextual commands

* `View Avatar` Sends a user's avatar Gif / Image.

Full list of commands in [Documentation](https://aiskoa.gitbook.io/cler)

---

### COMMAND WARN SLASH AND PREFIX

```javascript
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('megadb');
const warnDB = new db.crearDB('warnings'); // Use crearDB to initialize the database

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warns a server member.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user you want to warn')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the warning')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers), // Warning permissions

  name: 'warn', // Name for commands with prefix
  description: 'Warns a server member.',
  
  async executeSlash(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason provided.';
    await this.warnMember(interaction, member, reason);
  },
  
  async executePrefix(message, args) {
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'No reason provided.';
    if (!member) {
      //<a:denyxbox:1287542408082358292> are global emojis, uploaded from discord dev portal
      return message.reply('<a:denyxbox:1287542408082358292> | Please mention a valid user.');
    }
    await this.warnMember(message, member, reason);
  },

  async warnMember(context, member, reason) {
    const isInteraction = !!context.isCommand;

    // Check if it has warning permissions (only in prefixes)
    if (!isInteraction && !context.member.permissions.has('MODERATE_MEMBERS')) {
      return context.reply({ content: '<:win11erroicon:1287543137505378324> | You do not have permission to warn members.', ephemeral: true });
    }

    if (!member) {
      return context.reply({ content: '<:440warning:1287542257985126501> | Please select a valid member.', ephemeral: true });
    }

    try {
      // Try to send a direct message to the user
      try {
        await member.send(`<a:1302moderatorprogramsalumnia:1287542225399709737> You have received a warning on the server ${context.guild.name} by ${context.user.tag}. Reason: ${reason}`);
      } catch (error) {
        console.log(`[LOG] Could not send a direct message to ${member.user.tag}.`);
      }

      // Register warning in MegaDB
      if (!await warnDB.has(`warnings.${member.id}`)) {
        await warnDB.set(`warnings.${member.id}`, []);
      }
      await warnDB.push(`warnings.${member.id}`, { 
        reason: reason, 
        moderator: context.user.tag, 
        timestamp: new Date().toISOString() 
      });

      // Create embed to notify the channel
      const warnEmbed = new EmbedBuilder()
        .setColor(0xffff00) // Yellow
        .setTitle('<a:1302moderatorprogramsalumnia:1287542225399709737> **WARNING**')
        .setDescription(`${member.user.tag} has received a warning.`)
        .addFields(
          { name: '<a:9755discordstaffanimated:1287542237571321896> Moderator', value: `${context.user.tag}`, inline: true },
          { name: '<:discordcopyid:1287542182080679997> Member', value: `${member.user.tag}`, inline: true },
          { name: '<:discordeditprofile:1287542190926467094> Reason', value: reason, inline: false }
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: 'Warning registered', iconURL: context.user.displayAvatarURL() });

      // Send the embed as a response
      await context.reply({ embeds: [warnEmbed] });

      // Log in console
      console.log(`[LOG] ${context.user.tag} has warned ${member.user.tag} in ${context.guild.name}`);
    } catch (error) {
      console.error(error);
      context.reply({ content: 'There was an error warning this member.', ephemeral: true });
    }
  },
};
```

The most complex part or module is index.js, but since it is very long I am not going to put it, I recommend checking the project's github.

But in summary I revived the project, if I abandon it again it is because I got bored hahaha, so now it has more commands and has a save function, oh, I hosted it on an intel celeron with little ram, likewise in another blog I will give the characteristics of the NAS and the PC.

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check issues page.

1. **Fork the Repository**: Create a copy of the repository in your GitHub account.
2. **Create a Branch**:

    ```bash
    git checkout -b your-branch-name
    ```

3. **Make your Changes**: Make the modifications you want to add.
4. **Commit and Push**:

    ```bash
    git add .
    git commit -m "Description of the changes"
    git push origin your-branch-name
    ```

5. **Create a Pull Request**: Open a Pull Request from your branch to the main branch of the repository.

### ❤️ Show your support

Give a ⭐️ if this _project helped you!_

### 💜 License

Copyright © 2024 [aiskoa](https://aiskoa.vercel.app). This project is [AGPL](/LICENSE) licensed.