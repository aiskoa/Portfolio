---
title: "[🇪🇸] Cler Discord Bot Version 4.7"
excerpt: "Multiprospose Discord Bot for Node and PostgreSQL"
date: "Oct 01 2024"
cover_image: "/blog/cler2.webp"
alt: "Cler 14 Discord"
tags1: "JavaScript"
tags2: "PostgreSQL"
---

![Cler](https://raw.githubusercontent.com/Rawierdt/Cler/refs/heads/main/title.jpg)

# Cler

## Cler Discord multipurpose bot

**Cler** es una bot de Discord para administrar tu servidor, cuenta con multiples comandos como de administración, utilidad y de diversión.

[Cler's Monitor](https://bit.ly/cler-bot)

[Invite Cler on your server](https://discord.com/oauth2/authorize?client_id=774150617546883073&permissions=8&scope=bot)

![Cler_Info](https://i.imgur.com/c7p8GwP.png)

## Lastest Version and What's New

**v4.7.20**

## (Asynchronous Transfer Mode)

* Usa el prefix. `c!` o el Slash `/` Para comandos de moderación
* Bot en Discord.js v14.16.2

Postdata: Si abandoné este proyecto es porque me aburrí o hice una mejor versión.

![ClerAPPS](https://i.imgur.com/qs2J4eg.png)

## 💻 Installation

Para instalar y ejecutar Cler localmente, sigue estos pasos:

1. **Clona el repositorio**:

    ```bash
    git clone git@github.com:Rawierdt/Cler.git
    ```

2. **Navega al directorio del proyecto**:

    ```bash
    cd Cler
    ```

3. **Crea un archivo de configuración .env dentro del directorio**:

    ```bash
    BOT_TOKEN=YOUR_BOT_TOKEN
    CLIENT_ID=YOUR_CLIENT_ID
    GUILD_ID=YOUR_GUILD_ID
    PREFIX='YOUR_PREFIX'
    COLOR='0x5e10f8'
    OWNER=YOUR_DISCORD_ID
    ```

4. **Instala las dependencias**:

    ```bash
    npm install
    ```

5. **Ejecuta el comando de carga global**:

    ```bash
    npm deploy-commands.js
    ```

6. **Ejecuta el comando de inicio**:

    ```bash
    npm start
    ```

    Dirigete a tu servidor de discord al que invitaste a tu bot y ejecuta el comando de /help.

## Comandos

Lista completa de comandos en [Documentación](https://rawier.gitbook.io/cler)

Estructura y Diagramación en Repositorio de [Github](https://github.com/Rawierdt/Cler)

## Admin / Mod

* `/mute  <@member> <reason>` Silencia al miembro etiquetado.
* `/unmute  <@member> <reason>` Quita el Silenco del miembro etiquetado.
* `/set_mute  <@rol>` Define el rol de Mute en el servidor **Importante**.
* `/ban <@member> <reason>` Expulsa del servidor de manera difinitiva al miembro etiquetado.
* `/unban <@member>` Revoca la prohibición del comando anterior.
* `/kick <@member> <reason>` Expulsa del servidor al miembro etiquetado.
* `/softban <@member> <reason>` Expulsa del servidor al miembro etiquetado de manera temporal por 7 dias.
* `/warn <@member> <reason>` Notifica al miembro seleccionado

Lista completa de comandos en [Documentación](https://rawier.gitbook.io/cler)

### Comandos contextuales

* `Ver Avatar` Envia el avatar de un usuario Gif / Imagen.

Lista completa de comandos en [Documentación](https://rawier.gitbook.io/cler)

---

### COMMAND WARN SLASH Y PREFIX

```javascript
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('megadb');
const warnDB = new db.crearDB('warnings'); // Usar crearDB para inicializar la base de datos

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Advierte a un miembro del servidor.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('El usuario que deseas advertir')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Razón de la advertencia')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers), // Permisos de advertencia

  name: 'warn', // Nombre para comandos con prefijo
  description: 'Advierte a un miembro del servidor.',
  
  async executeSlash(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No se proporcionó razón.';
    await this.warnMember(interaction, member, reason);
  },
  
  async executePrefix(message, args) {
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'No se proporcionó razón.';
    if (!member) {
      //<a:denyxbox:1287542408082358292> son emojis globales, subidos desde discord dev portal
      return message.reply('<a:denyxbox:1287542408082358292> | Por favor menciona a un usuario válido.');
    }
    await this.warnMember(message, member, reason);
  },

  async warnMember(context, member, reason) {
    const isInteraction = !!context.isCommand;

    // Verificar si tiene permisos de advertencia (solo en prefijos)
    if (!isInteraction && !context.member.permissions.has('MODERATE_MEMBERS')) {
      return context.reply({ content: '<:win11erroicon:1287543137505378324> | No tienes permiso para advertir miembros.', ephemeral: true });
    }

    if (!member) {
      return context.reply({ content: '<:440warning:1287542257985126501> | Por favor selecciona a un miembro válido.', ephemeral: true });
    }

    try {
      // Intentar enviar un mensaje directo al usuario
      try {
        await member.send(`<a:1302moderatorprogramsalumnia:1287542225399709737> Has recibido una advertencia en el servidor ${context.guild.name} por ${context.user.tag}. Razón: ${reason}`);
      } catch (error) {
        console.log(`[LOG] No se pudo enviar un mensaje directo a ${member.user.tag}.`);
      }

      // Registrar advertencia en MegaDB
      if (!await warnDB.has(`warnings.${member.id}`)) {
        await warnDB.set(`warnings.${member.id}`, []);
      }
      await warnDB.push(`warnings.${member.id}`, { 
        reason: reason, 
        moderator: context.user.tag, 
        timestamp: new Date().toISOString() 
      });

      // Crear embed para notificar al canal
      const warnEmbed = new EmbedBuilder()
        .setColor(0xffff00) // Amarillo
        .setTitle('<a:1302moderatorprogramsalumnia:1287542225399709737> **ADVERTENCIA**')
        .setDescription(`${member.user.tag} ha recibido una advertencia.`)
        .addFields(
          { name: '<a:9755discordstaffanimated:1287542237571321896> Moderador', value: `${context.user.tag}`, inline: true },
          { name: '<:discordcopyid:1287542182080679997> Miembro', value: `${member.user.tag}`, inline: true },
          { name: '<:discordeditprofile:1287542190926467094> Razón', value: reason, inline: false }
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: 'Advertencia registrada', iconURL: context.user.displayAvatarURL() });

      // Enviar el embed como respuesta
      await context.reply({ embeds: [warnEmbed] });

      // Log en consola
      console.log(`[LOG] ${context.user.tag} ha advertido a ${member.user.tag} en ${context.guild.name}`);
    } catch (error) {
      console.error(error);
      context.reply({ content: 'Hubo un error al advertir a este miembro.', ephemeral: true });
    }
  },
};
```

El apartado o modulo más complejo es el index.js, pero debido a que es muy largo no pienso ponerlo, recomiendo revisar el github del proyecto.

Pero en resumen el proyecto lo revivi, si lo abandono de nuevo es porque me aburri jajaja, asi que ahora tiene mas comandos y tiene una funcion de guardar, a si, lo aloje en un intel celeron con poca ram, de igual forma en otro blog daré las caracteristicas del NAS y de la PC.

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check issues page.

1. **Haz un Fork del Repositorio**: Crea una copia del repositorio en tu cuenta de GitHub.
2. **Crea una Rama**:

    ```bash
    git checkout -b nombre-de-tu-rama
    ```

3. **Haz tus Cambios**: Realiza las modificaciones que deseas agregar.
4. **Commit y Push**:

    ```bash
    git add .
    git commit -m "Descripción de los cambios"
    git push origin nombre-de-tu-rama
    ```

5. **Crea un Pull Request**: Abre un Pull Request desde tu rama a la rama principal del repositorio.

### ❤️ Show your support

Give a ⭐️ if this _project helped you!_

### 💜 License

Copyright © 2024 [Rawier](https://rawier.vercel.app). This project is [AGPL](/LICENSE) licensed.
