export abstract class State {
    abstract setContext(c: Context);
}

export abstract class Context {
    abstract state: State;

    changeState(state: State){
        this.state = state;
    }

}