export interface Command {
    execute();
}

export abstract class Receiver {

    abstract doSomething(cmd: string);

}

export class Invoker {
    protected onStartAction: Command;
    protected onEndAction: Command;

    start() {
        this.onStartAction.execute();
    }

    end() {
        this.onEndAction.execute();
    }

    isCommand(command): boolean{
        return command.execute !== undefined;
    }

}