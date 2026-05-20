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

Then run `:TSInstall compila` (or `:TSInstallFromGrammar compila`)

### tree-sitter setup

clone this repo under one of the `parser-directories` paths in your tree-sitter config, 
```sh
tree-sitter init-config

mkdir -p ~/git
git clone https://github.com/falkjet/tree-sitter-compila ~/git/tree-sitter-compila
```

or add the parent directory of this repository to the that list:
```sh
__inplace() { tmp="$(mktemp)"; cat > "$tmp" && mv "$tmp" "$1" }

tree-sitter init-config

git clone git@github.com:falkjet/tree-sitter-compila
cd tree-sitter-compila

jq --arg path "${PWD%/*}" \
    '."parser-directories" += [$path]' \
    "${XDG_CONFIG_HOME:$HOME/.config}"/tree-sitter/config.json |
        __inplace "${XDG_CONFIG_HOME:$HOME/.config}"/tree-sitter/config.json
```

