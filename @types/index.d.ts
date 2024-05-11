import {
    ChatInputCommandInteraction,
    Client,
    ContextMenuCommandBuilder,
    Message,
    SlashCommandBuilder,
    Snowflake
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

        static $M<M = Message<true>>(call: (message: M) => (Promise<any> | any)): typeof CommandBuilder; // setMessageExecution
        static $I<I = ChatInputCommandInteraction>(call: (interaction: I) => (Promise<any> | any)): typeof CommandBuilder; // setInteractionExecution
        static $CME<I = ChatInputCommandInteraction>(call: (interaction: I) => (Promise<any> | any)): typeof CommandBuilder;
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
    }
    //#endregion
}

export interface ApplicationData {
    readonly owners?: Array<string | number>;
    readonly prefix?: string;
    setData<D = { [key: string]: any }>(data: D): void;
    getData<D = any>(key: string): D;
    build(): void;
}


declare module "discord.js" {
    export interface Client {
        Application: ApplicationData
    }

    type MessagePayloadTemplate = string | MessagePayload | MessageReplyOptions;

    export interface Message<InGuild extends boolean = boolean> {
        replyNoMention(options: MessagePayloadTemplate): Promise<Message<InGuild>>;
        sendTimedMessage(options: MessagePayloadTemplate, timeout: number): Promise<Message<InGuild>>;

        Eedit(options: MessagePayloadTemplate): Promise<Message<InGuild> | boolean>;
        Edelete(): Promise<Message<InGuild> | boolean>;

        args(index: number): string | undefined;
        getUser(id: number | string | Snowflake, type?: 'cache' | 'fetch' | 'guild' | 'guild-fetch'): Promise<User>
    }
}