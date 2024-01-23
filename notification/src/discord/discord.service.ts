import { InjectDiscordClient, On, Once } from "@discord-nestjs/core";
import { Injectable } from "@nestjs/common";
import { Client, Message } from "discord.js";

@Injectable()
export class DiscordService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client
  ) {}

  @Once("ready")
  onReady() {
    console.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On("messageCreate")
  async onMessage(message: Message): Promise<void> {
    if (!message.author.bot) {
      await message.reply("I'm watching you");
    }
  }
}
