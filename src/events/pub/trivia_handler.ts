// import type { ModalSubmitInteraction } from "discord.js";
import { errorLog, event } from "utils";

let tried = 3;

export default event("interactionCreate", async ({}, interaction) => {
  try {
    if (!interaction.isButton()) return;

    if (
      interaction.customId === "confirmTrivia" ||
      interaction.customId === "cancelTrivia"
    ) {
      if (interaction.customId === "confirmTrivia") {
        const randomTrivia = await fetch(
          process.env.API_ENDPOINT_NEXT + "/bot/commands/trivia",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${process.env.BOT_TOKEN}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            return data as { question: string; answer: string };
          });

        await interaction.update({
          content: `### Great! Let's guess!\n-# You have 30 seconds to answer!\n### First Question:\n\`${randomTrivia.question}\``,
          components: [],
        });

        const collectorFilter = (m: any) => m.author.id === interaction.user.id;
        const collector = interaction.channel?.createMessageCollector({
          filter: collectorFilter,
          time: 30000,
        });

        collector?.on("collect", async (m) => {
          if (m.content.toLowerCase() === randomTrivia.answer.toLowerCase()) {
            await m.reply({ content: "Correct!" });

            const nextTrivia = await fetch(
              process.env.API_ENDPOINT_NEXT + "/bot/commands/trivia",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${process.env.BOT_TOKEN}`,
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                return data as { question: string; answer: string };
              });

            if (nextTrivia) {
              await m.reply(`### Next Question:\n\`${nextTrivia.question}\``);
            } else {
              await m.reply("No more questions! Game over!");
              collector?.stop();
            }
          } else {
            tried = tried - 1;

            if (tried > 0) {
              await m.reply(
                "Incorrect! Try again! You have " + tried + " tries left."
              );
            } else {
              await m.reply(
                `Incorrect! The answer is \`${randomTrivia.answer}\``
              );
              collector?.stop();
            }
          }
        });

        collector?.on("end", async () => {
          return await interaction.channel?.send("Time's up! Game over!");
        });
      } else {
        return await interaction.update({
          content: "Maybe next time!",
          components: [],
        });
      }
    }
  } catch (error) {
    errorLog(error, "trivia_handler.ts", "interactionCreate");
  }
});
