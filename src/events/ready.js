'use strict';

const { readdirSync } = require('fs');

/*
  This is an example for an event.
  There will always be the client object and the additional arguments of the specific event available.
 */
module.exports = client => {
  const { interactions, application } = client;

  const interactionFiles = readdirSync('./src/interactions').filter(file => file.endsWith('.js'));
  interactionFiles.forEach(file => {
    const interaction = require(`../interactions/${file}`);
    interactions.set(interaction.data.name, interaction);
  });

  return application.commands?.set([...interactions.map(i => i.data)]);
};
