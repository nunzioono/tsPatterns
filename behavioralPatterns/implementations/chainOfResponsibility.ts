export interface Handler {
    handle(request: string);
    setNext(handler: Handler): Handler;
}