export class CompilerError extends Error {
    constructor(line, linePosition, message) {
        super(`Error on line (${line}:${linePosition}): ${message}`);
        this.name = this.constructor.name;
    }
}

export class TokenizerError extends CompilerError {
    constructor(line, linePosition, message) {
        super(line, linePosition, message);
    }
}

export class ParserError extends CompilerError {
    constructor(line, linePosition, message) {
        super(line, linePosition, message);
    }
}
