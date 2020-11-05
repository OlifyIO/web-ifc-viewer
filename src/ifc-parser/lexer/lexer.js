import "../../../node_modules/chevrotain/lib/chevrotain.js";
const newToken = chevrotain.createToken;
const Lexer = chevrotain.Lexer;

//Tokens / vocabulary for constructing the parser primitives

const tokens = [];

tokens.push(
  newToken({
    name: "ExpressId",
    pattern: /#\d+/,
  })
);

tokens.push(
  newToken({
    name: "IfcGuid",
    pattern: /'[a-zA-Z0-9_$]{22}'(?=[\)|,])/,
  })
);

tokens.push(
  newToken({
    name: "Asterisk",
    pattern: /\*/,
  })
);

tokens.push(
  newToken({
    name: "IfcValue",
    pattern: /IFC[A-Z]+?(?=\()/,
  })
);

tokens.push(
  newToken({
    name: "DefaultValue",
    pattern: /\$/,
  })
);

tokens.push(
  newToken({
    name: "EmptyText",
    pattern: /''(?=[\)|,])/,
  })
);

tokens.push(
  newToken({
    name: "Text",
    pattern: /'.+?'(?=[\)|,])/,
  })
);

tokens.push(
  newToken({
    name: "Boolean",
    pattern: /\.T\.|\.F\./,
  })
);

tokens.push(
  newToken({
    name: "Enum",
    pattern: /\.[A-Z_]+?\./,
  })
);

tokens.push(
  newToken({
    name: "Number",
    pattern: /[0-9.E-]+/,
  })
);

tokens.push(
  newToken({
    name: "EqualSign",
    pattern: /=/,
  })
);

tokens.push(
  newToken({
    name: "OpenPar",
    pattern: /\(/,
  })
);

tokens.push(
  newToken({
    name: "ClosePar",
    pattern: /\)/,
  })
);

tokens.push(
  newToken({
    name: "Semicolon",
    pattern: /;/,
  })
);

tokens.push(
  newToken({
    name: "Comma",
    pattern: /,/,
  })
);

tokens.push(
  newToken({
    name: "NewLine",
    pattern: /[\n\r]+/,
    group: chevrotain.Lexer.SKIPPED,
  })
);

tokens.push(
  newToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: chevrotain.Lexer.SKIPPED,
  })
);

const lexer = new Lexer(tokens);
const vocabulary = {};
tokens.forEach((tokenType) => {
  vocabulary[tokenType.name] = tokenType;
});

export { tokens, lexer, vocabulary };