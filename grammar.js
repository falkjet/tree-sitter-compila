/**
 * @file Compila grammar for tree-sitter
 * @author Falk Markus Dursun Jetlund <fmjetlun@ifi.uio.no>
 * @license MIT
 */

/// <reference types='tree-sitter-cli/dsl' />
// @ts-check

const sepBy1 = (sep, it) => seq(it, repeat(seq(sep, it)))
const sepBy = (sep, it) => optional(sepBy1(sep, it))
const sepByTrail = (sep, par) => optional(seq(sepBy1(sep, par), optional(sep)))

module.exports = grammar({
  name: 'compila',

  extras: $ => [ $.comment, /\s/ ],
  word: $ => $.name,

  rules: {
    // TODO: multiple decls
    source_file: $ => seq(
      'program', $.name,
      'begin',
        sepByTrail(';', $.decl),
      'end',
    ),

    decl: $ => choice(
      $.var_decl,
      $.proc_decl,
      $.rec_decl,
    ),
    var_decl: $ => choice(
      seq('var', $.name, ':', $.type, optional(seq('=', $.exp))),
      seq('var', $.name, ':=', $.exp),
    ),
    proc_decl: $ => seq(
      'procedure', $.name, '(', sepByTrail(',', $.field_decl), ')',
        optional(seq(':', $.type)),
      'begin',
        optional(seq(sepByTrail(';', $.decl),
      'in')),
        sepByTrail(';', $.stmt),
      'end',
    ),
    rec_decl: $ => seq(
      'struct', $.name, '{',
        sepByTrail(';', $.field_decl),
      '}'),

    field_decl: $ => seq(
      $.name, ':', $.type,
    ),

    exp: $ => choice(
      // TODO: Correct precedence
      prec.left(1, seq($.exp, $.log_op, $.exp)),
      prec.left(2, seq('not', $.exp)),
      prec.left(10, seq($.exp, $.rel_op, $.exp)),
      prec.left(20, seq($.exp, $.arith_op, $.exp)),

      $.literal,
      $.call_stmt,
      seq('new', $.name),

      $.var,
      $.ref_var,
      $.deref_var,
      seq('(', $.exp, ')'),
    ),

    ref_var: $ => choice(
      seq('ref', '(', $.var, ')'),
      seq('ref', '(', $.ref_var, ')'),
    ),

    deref_var: $ => choice(
      seq('deref', '(', $.var, ')'),
      seq('deref', '(', $.deref_var, ')'),
    ),

    var: $ => choice(
      $.name,
      prec.left(30, seq($.exp, '.', $.name)),
    ),

    log_op: $ => choice('&&', '||'),
    rel_op: $ => choice('<', '<=', '>', '>=', '=', '<>'),
    arith_op: $ => choice('+', '-', '*', '/', '^'),
    literal: $ => choice(
      $.float_literal,
      $.int_literal,
      $.string_literal,
      $.bool_literal,
      'null',
    ),

    bool_literal: $ => choice('true', 'false'),

    stmt: $ => choice(
      $.assign_stmt,
      $.if_stmt,
      $.while_stmt,
      $.return_stmt,
      $.call_stmt,
    ),

    assign_stmt: $ => choice(
      seq($.var, ':=', $.exp),
      seq($.deref_var, ':=', $.exp),
    ),

    if_stmt: $ => seq(
      'if', $.exp, 'then',
        sepByTrail(';', $.stmt),
      optional(seq('else',
        sepByTrail(';', $.stmt))),
      'fi'),

    while_stmt: $ => seq(
      'while', $.exp, 'do',
        sepByTrail(',', $.stmt),
      'od',
    ),

    return_stmt: $ => seq('return', optional($.exp)),

    call_stmt: $ => seq($.name, '(', sepByTrail(',', $.exp), ')'),

    type: $ => choice(
      'float',
      'int',
      'string',
      $.name,
      seq('ref', '(', $.type, ')'),
    ),

    name: $ => /[\p{L}_][\p{L}0-9_]*/,

    float_literal: $ => /([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)/,
    int_literal: $ => /([0-9]+)/,
    string_literal: $ => token(choice(
      /"([^"\\]|\\["'nr\\])*"/,
      /'([^'\\]|\\["'nr\\])*'/,
    )),
    comment: $ => token(choice(
      /\(\*.*\*\)/,
      seq('//', /.*/),
    )),
  }
});
