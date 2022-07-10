const DiscordJS = require('discord.js');

module.exports = {
    data: {
        name: 'global_booster_started'
    },
    async execute(regexMatches, discordBot, configValue, isDiscordBotReady, isIngameBotReady){
        try {
    
            const globalBoosterStartedAlertChannelID = configValue.discord_channels.global_booster;

            const guildID = configValue.discord_bot.guild_id;

            const globalBoosterStartedAlertChannelName = discordBot.guilds.cache.get(guildID).channels.cache.get(globalBoosterStartedAlertChannelID).name;

            const globalBoosterStartedPingRoleID = configValue.roles_id.global_booster_ping;

            function isGBoosterImportant(globalBoosterDurationString, globalBoosterType){
                
                const globalBoosterMinutes = globalBoosterDurationString.match(new RegExp(/^([0-9]+) minutes/, 'm'));
            
                let functionResult;
            
                if(globalBoosterMinutes != null){
                    if(globalBoosterMinutes[1] >= 10){
                        functionResult = true;
                    } else {
                        functionResult = false;
                    }
                } else {
                    functionResult = false;
                }
                switch(globalBoosterType){
                    default:
                        functionResult = false;
                        break;
                    case 'Lucky':
                        functionResult = false;
                        break;
                    case 'Quarry':
                        functionResult = false;
                        break;
                }
                return functionResult;
            }

            const globalBoosterDetails = regexMatches[0];

            const globalBoosterOwner = globalBoosterDetails[0];

            const globalBoosterRarity = globalBoosterDetails[1];

            const globalBoosterType = globalBoosterDetails[2];

            const globalBoosterDurationString = globalBoosterDetails[3];

            let globalBoosterStartedThumbnailURL;

            switch(globalBoosterType){
                default:

                    globalBoosterStartedThumbnailURL = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/exclamation-mark_2757.png';
                    
                    break;
                case 'E-Token':

                    globalBoosterStartedThumbnailURL = 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/08/Magma_Cream_JE3_BE2.png/revision/latest?cb=20190501035730';
                    
                    break;
                case 'Proc Rate':

                    globalBoosterStartedThumbnailURL = 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e7/Diamond_Pickaxe_JE3_BE3.png/revision/latest?cb=20200226193952';
                    
                    break;
                case 'Lucky':

                    globalBoosterStartedThumbnailURL = 'https://static.wikia.nocookie.net/minecraft/images/5/5d/Block_of_Gold.png/revision/latest?cb=20191012230129';
                    
                    break;
                case 'Quarry':

                    globalBoosterStartedThumbnailURL = 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/d/d4/Magenta_Shulker_Box_Revision_1.png/revision/latest?cb=20190407101826';
                    
                    break;
            }

            const globalBoosterStartedEmbed = new DiscordJS.MessageEmbed()
                .setColor('#eb8334')
                .setTitle('GLOBAL BOOSTER')
                .setDescription(`Owner: ${globalBoosterOwner}\n` + `Type: ${globalBoosterType}\n` + `Rarity: ${globalBoosterRarity}\n` + `Duration: ${globalBoosterDurationString}`)
                .setThumbnail(`${globalBoosterStartedThumbnailURL}`)
                .setTimestamp()
                .setFooter({ text: 'Custom Coded By QimieGames', iconURL: 'https://images-ext-1.discordapp.net/external/HQFug-TJRekRG6wkhZL_wlEowWtUxuuR940ammbrz7k/https/cdn.discordapp.com/avatars/402039216487399447/347fd513aa2af9e8b4ac7ca80150b953.webp?width=115&height=115' });
    
            if(discordBot.guilds.cache.get(guildID).channels.cache.get(globalBoosterStartedAlertChannelID) != undefined){
                if(discordBot.guilds.cache.get(guildID).me.permissionsIn(globalBoosterStartedAlertChannelID).has('VIEW_CHANNEL') === true){
                    if(discordBot.guilds.cache.get(guildID).me.permissionsIn(globalBoosterStartedAlertChannelID).has('SEND_MESSAGES') === true){
                        if(isGBoosterImportant(globalBoosterDurationString, globalBoosterType) === true){
                            discordBot.guilds.cache.get(guildID).channels.cache.get(globalBoosterStartedAlertChannelID).send({ content: `|| <@&${globalBoosterStartedPingRoleID}> ||`, embeds: [globalBoosterStartedEmbed] });
                            return true;
                        } else {
                            discordBot.guilds.cache.get(guildID).channels.cache.get(globalBoosterStartedAlertChannelID).send({ embeds: [globalBoosterStartedEmbed] });
                            return true;
                        }
                    } else {
                        console.log(`[MCHPB] Error occured while sending global booster started alert in #${globalBoosterStartedAlertChannelName}!`);
                        return false;
                    }
                } else {
                    console.log(`[MCHPB] Error occured while viewing #${globalBoosterStartedAlertChannelName}!`);
                    return false;
                }
            } else {
                console.log('[MCHPB] Error occured while global booster started alert channel!');
                return false;
            }
        } catch {
            return 'ERROR';
        }
    }
}