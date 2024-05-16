import {
    Client,
    ContextMenuCommandBuilder,
    SlashCommandBuilder,
    Snowflake,
    /** types */
    Message,
    ContextMenuCommandInteraction,
    ChatInputCommandInteraction,
    MessageComponentInteraction,
} from "discord.js";

declare module "handler.djs" {
    //#region classes
    export class Application {
        constructor(client: Client, data?: {
            commands?: string,
            events?: string,
            owners?: Array<string | number>,
            validations?: string,
            prefix?: string,
            applicationCommands?: boolean
            definedValidations?: boolean
        });
        build(): void;
    }

    export class CommandBuilder {
        private static $: string;

        static $N(_$: TemplateStringsArray): typeof CommandBuilder; // setName
        static $D(description: string): typeof CommandBuilder; // setDescription
        static $C(cooldown: number): typeof CommandBuilder; // setCooldown
        static $O(somename?: boolean): typeof CommandBuilder; // Owners
        static $L(label: string): typeof CommandBuilder; // setLabel | setCategory

        static $S(builder: SlashCommandBuilder): typeof CommandBuilder; // setSlashCommandBuilder | interactionOn
        static $CM(builder: ContextMenuCommandBuilder): typeof CommandBuilder;

        static $M<M = Message<true>>(call: (message: M) => any): typeof CommandBuilder; // setMessageExecution
        static $B<I = MessageComponentInteraction>(call: (interaction: I) => any): typeof CommandBuilder;

        static $I<I = ChatInputCommandInteraction>(call: (interaction: I) => any): typeof CommandBuilder; // setInteractionExecution
        static $CME<I = ContextMenuCommandInteraction>(call: (interaction: I) => any): typeof CommandBuilder;
    }

    export class EventBuilder {
        private static $: string;

        static $N(_$: TemplateStringsArray): typeof EventBuilder;
        static $E(call: (...arg0: any[]) => any): typeof EventBuilder;
        static $O(somename?: boolean): typeof EventBuilder;
        static $L(): typeof EventBuilder;
    }

    export class ValidationBuilder {
        static $E(validation: (controller: { message: Message<true> | Message, interaction: ChatInputCommandInteraction }, next: () => {}, end: () => {}) => any): typeof ValidationBuilder;
        static $O(order?: number): typeof ValidationBuilder;
        static get message(): typeof ValidationBuilder;
        static get interaction(): typeof ValidationBuilder;

        /** @deprecated Use .message */
        static get $M(): typeof ValidationBuilder;
        /** @deprecated use .interaction */
        static get $I(): typeof ValidationBuilder;

        static get end(): typeof ValidationBuilder;
        static $end(): undefined;
    }

    namespace utils {
        export function toDiscordId(text: string): string;
        export function isPositiveInteger(text: string): boolean;
        export const Intents: 3276799;
    }
    //#endregion
}

interface cooldown {
    message?: string,
    reply?: boolean,
    long?: boolean,
    Mdelete?: boolean,
    once?: boolean,
}

export interface ApplicationData {
    readonly owners?: Array<string | number>;
    readonly prefix?: string;
    setData<D = { [key: string]: any }>(data: D): void;
    getData<D = any>(key: string): D;
    setPrefix(prefix: string): ApplicationData;
    setCooldown(data: cooldown): ApplicationData;
    build(): void;
}

interface Command {
    name: string
    description: string,
    cooldown: string | number,
    label: string,
    message_support: boolean,
    interaction_support: boolean,
    context_support: boolean,
    button_support: boolean,
}

interface ApplicationDJS {
    prefix: string,
    owners: string[],
    cooldown: cooldown,
    commands: number,
    events: number,
}

declare module "discord.js" {
    export interface Client {
        Application: ApplicationData
    }

    type MessagePayloadTemplate = string | MessagePayload | MessageReplyOptions;

    export interface Message<InGuild extends boolean = boolean> {
        replyNoMention(options: MessagePayloadTemplate): Promise<Message<InGuild>>;
        sendTimedMessage(options: MessagePayloadTemplate, timeout: number, repliedUser: boolean): Promise<Message<InGuild>>;

        Eedit(options: MessagePayloadTemplate): Promise<Message<InGuild> | boolean>;
        Edelete(): Promise<Message<InGuild> | boolean>;

        args<type = any>(index: number): type;
        getUser(id: number | string | Snowflake, type?: 'cache' | 'fetch' | 'guild' | 'guild-fetch'): Promise<User>

        command: Command;
        Application: ApplicationDJS;
    }

    export interface ChatInputCommandInteraction {
        replyNoMention<inGuild extends boolean = true>(options: MessagePayloadTemplate): Promise<Message<inGuild>>;
        sendTimedMessage<inGuild extends boolean = true>(options: MessagePayloadTemplate, timeout: number): Promise<Message<inGuild>>;
    }

    export interface ContextMenuCommandInteraction {
        replyNoMention<inGuild extends boolean = true>(options: MessagePayloadTemplate): Promise<Message<inGuild>>;
        sendTimedMessage<inGuild extends boolean = true>(options: MessagePayloadTemplate, timeout: number): Promise<Message<inGuild>>;
    }
}