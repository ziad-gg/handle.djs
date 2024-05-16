class Base {
    static createCommandInterface(name, command) {
        return {
            name: name,
            description: command.description,
            cooldown: command.cooldown,
            label: command.label,
            message_support: command.MessageExecution && true,
            interaction_support: (command.InteractionExecution && command.builder) && true,
            context_support: (command.ContextMenuExecution && (command.UserContextMenuCommandBuilder || command.MessageContextMenuCommandBuilder)) && true,
            button_support: command.ButtonInteractionExecution && true,
        };
    }

    static createApplicationInterface(Application) {
        return {
            // username: Application.client.user.username,
            // id: Application.client.user.id,
            prefix: Application.prefix,
            owners: Application.owners,
            cooldown: Application.cooldownConfig,
            commands: Array.from(Application.commands.values()).length,
            events: Array.from(Application.events.values()).length,
        };
    }

}

module.exports = Base;