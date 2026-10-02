export class NotFoundError{
    constructor(message){
        super(message);
        this.name = constructor.name;
    }
}