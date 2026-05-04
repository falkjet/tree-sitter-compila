(name) @variable
(int_literal) @number
(float_literal) @number
(comment) @comment
(string_literal) @string

(field_decl (name) @variable.parameter)

(rec_decl (name) @type)
(proc_decl (name) @function)
(call_stmt (name) @function)
(var
  (exp)
  (name) @variable.member)

(type (name) @type)

; (function_definition (identifier) @function)
; (call (identifier) @function)
;
; (struct_definition
;   name: (identifier) @type.struct)
; (struct_field name: (identifier) @variable.member)
; (struct_field type: (identifier) @type)

["true" "false"] @boolean

[
  "float"
  "int"
  "string"
] @type.builtin

[
  "program"
  "procedure"
  "begin"
  "end"
  "if"
  "then"
  "else"
  "fi"
  "while"
  "do"
  "od"
  "struct"
  "var"
  "ref"
  "deref"
  "in"
  "return"
] @keyword

[
  "."
  ","
  ";"
  "="
  ":="
  ":"
] @punctuation.delimiter

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket
;
; ;; vim: sw=0 ts=2 et
