---
title: "ALO POLISIA Community"
excerpt: "A gamer community for everyone!"
date: "Dec 12 2022"
cover_image: "/blog/alop.webp"
alt: "Alo Polisia"
tags1: "PHP"
tags2: "SQL"
---

![Banner](https://i.imgur.com/BD7u7kY.png)

# ALO POLSIA

## Gamer Community for everyone!

**ALO POLISIA 🍁** Was a gamer community that emerged before the pandemic, where various activities were developed thanks to the Staff.

A heartfelt thank you to all those who accompanied us, both those who are still with us and those who have sadly left us.

The site was built with **PHP** and **MySQL** for user management and the database for both the web server and the game server.

**Oracle and PL/SQL** were used on one occasion for database management with the Minecraft Bedrock server.

### Admin Console Image

![Console](https://i.imgur.com/0HXaliv.png)

### Lobby Image of the First MC Server

![Spawn](https://i.imgur.com/YqkC6Yi.png)

### Image of the First Construction on the First Server

![Lb1](https://i.imgur.com/9UrQr3x.png)

### Screenshot of the Community on Discord

![SS](https://i.imgur.com/Raosfeg.png)

### Closing Image

![Cierre](https://i.imgur.com/SgTDHoU.png)

### Here are some images that will go down in posterity

![LLOGO](https://i.imgur.com/pllkmTt.png)

![EmilySS](https://i.imgur.com/sa8VLDl.png)

![GG](https://i.imgur.com/KDyJLqP.png)

![Dejaserver](https://i.imgur.com/j7Ni4t1.png)

![Selfie](https://i.imgur.com/bI7aFGv.png)

![Const](https://i.imgur.com/AHwAiCC.png)

![Angie](https://i.imgur.com/BVcFncL.png)

### LogBlock Config (SQL)

```yaml
consumer:
  forceToProcessAtLeast: 200
  delayBetweenRuns: 2
  queueWarningSize: 1000
  timePerRun: 1000
  fireCustomEvents: false
  useBukkitScheduler: true
tools:
  toolblock:
    item: BEDROCK
    removeOnDisable: true
    canDrop: false
    leftClickBehavior: TOOL
    mode: LOOKUP
    aliases:
    - tb
    rightClickBehavior: BLOCK
    defaultEnabled: true
    dropToDisable: false
    permissionDefault: OP
    params: area 0 all sum none limit 15 desc since 60d silent
  tool:
    leftClickBehavior: NONE
    item: WOODEN_PICKAXE
    defaultEnabled: true
    mode: LOOKUP
    dropToDisable: false
    removeOnDisable: true
    aliases:
    - t
    params: area 0 all sum none limit 15 desc since 60d silent
    permissionDefault: OP
    canDrop: true
    rightClickBehavior: TOOL
lookup:
  linesPerPage: 15
  hardLinesLimit: 100000
  dateFormat: MM-dd HH:mm:ss
  defaultTime: 30 minutes
  defaultDist: 20
  linesLimit: 1500
mysql:
  password: password
  host: db4free.net
  port: 3306
  database: name_db
  requireSSL: false
  user: admin
questioner:
  askRollbacks: true
  askRedos: true
  askClearLogs: true
  banPermission: mcbans.ban.local
  askRollbackAfterBan: false
  askClearLogAfterRollback: true
logging:
  logFireSpreadAsPlayerWhoCreatedIt: true
  logCreeperExplosionsAsPlayerWhoTriggeredThese: false
  logFluidFlowAsPlayerWhoTriggeredIt: false
  logPlayerInfo: false
  logEnvironmentalKills: false
  hiddenPlayers: []
  ignoredChat:
  - /register
  - /login
  logBedExplosionsAsPlayerWhoTriggeredThese: true
  logKillsLevel: PLAYERS
  hiddenBlocks:
  - AIR
  - CAVE_AIR
  - VOID_AIR
clearlog:
  auto:
  - world "world" before 365 days all
  - world "world" player lavaflow waterflow leavesdecay before 7 days all
  - world "world" entities before 365 days
  - world "world_nether" before 365 days all
  - world "world_nether" player lavaflow waterflow leavesdecay before 7 days all
  - world "world_nether" entities before 365 days
  - world "world_the_end" before 365 days all
  - world "world_the_end" player lavaflow waterflow leavesdecay before 7 days all
  - world "world_the_end" entities before 365 days
  dumpDeletedLog: false
  autoClearLogDelay: 6h
  enableAutoClearLog: false
rollback:
  maxTime: 2 days
  dontRollback:
  - LAVA
  - TNT
  - FIRE
  maxArea: 50
  replaceAnyway:
  - LAVA
  - WATER
  - FIRE
  - GRASS_BLOCK
version: '1.14.1-SNAPSHOT (build #65)'
debug: false
safety:
  id:
    check: true
loggedWorlds:
- world
- world_nether
- world_the_end
previousMinecraftVersion: 1.14.4

```

---

Copyright © 2024 [Aiskoa](https://aiskoa.vercel.app). This project is [MIT](/LICENSE) licensed.