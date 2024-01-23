import { DiscordModule as _DiscordModule } from "@discord-nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GatewayIntentBits } from "discord.js";
import { RegisterCommand } from "./commands/register.command";
import { DiscordController } from "./discord.controller";
import { DiscordService } from "./discord.service";

@Module({
  imports: [
    _DiscordModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        token: cfg.get("DISCORD_BOT_TOKEN"),
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DiscordController],
  providers: [DiscordService, RegisterCommand],
})
export class DiscordModule {}
