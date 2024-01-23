import { Field, TextInputValue } from "@discord-nestjs/core";
import { TextInputModalData } from "discord.js";

export class FormDto {
  @Field("Username")
  username: TextInputModalData;

  @TextInputValue() // Custom id is optional. By default, will be used property name.
  comment: string;
}
