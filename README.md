# Tree sitter compila

tree sitter grammar for the language made in the compiler construction course
[IN5380](https://www.uio.no/studier/emner/matnat/ifi/IN5380/) at UiO

This grammar is a less strict than the more the grammar given as exercise in
2026 as it allows trailing semi colons and commas most places

## neovim setup

Add this to you neovim config

```lua
require 'nvim-treesitter.parsers'.compila = {
    install_info = {
        url = "https://github.com/falkjet/tree-sitter-compila",
        queries = "queries",
    },
}

vim.filetype.add {
    extension = {
        cmp = "compila"
    },
}
```

Then run `:TSInstall compila`
