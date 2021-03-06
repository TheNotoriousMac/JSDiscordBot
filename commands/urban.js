const Discord = require("discord.js");
const urban = require("urban");
module.exports = {
  name: "urban",
  description: "urban dictionary command",
  execute(channel, args) {
    const main = require("../helperFunctions.js")
    args.shift();

    if (args.length < 1) {
      main.post(channel, "Please enter something!");
      return;
    }

    let XD = args.join(" ");

    urban(XD).first(json => {
      if (!json) return main.post(channel, "No results found!")

      let urbEmbed = new Discord.RichEmbed()
        .setColor("00ff00")
        .setTitle(json.word)
        .setDescription(json.definition)
        .addField("Upvotes", json.thumbs_up, true)
        .addField("Downvotes", json.thumbs_down, true)
        .setFooter(`Written by: ${json.author}`);

      main.post(channel, urbEmbed)
    });
  }
}