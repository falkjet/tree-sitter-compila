package tree_sitter_compila_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_compila "codeberg.org/falkjet/compila/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_compila.Language())
	if language == nil {
		t.Errorf("Error loading Compila grammar")
	}
}
