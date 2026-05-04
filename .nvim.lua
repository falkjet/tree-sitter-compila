vim.filetype.add{
	extension = {
		cmp = "compila"
	}
}

vim.treesitter.language.add('compila', {
	path = '/home/falk/UiO/in5380 - Compiler Construction/tree-sitter-compila/libtree-sitter-compila.so',
})

vim.treesitter.language.register('compila', 'compila')
