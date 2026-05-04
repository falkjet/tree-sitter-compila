#ifndef TREE_SITTER_COMPILA_H_
#define TREE_SITTER_COMPILA_H_

typedef struct TSLanguage TSLanguage;

#ifdef __cplusplus
extern "C" {
#endif

const TSLanguage *tree_sitter_compila(void);

#ifdef __cplusplus
}
#endif

#endif // TREE_SITTER_COMPILA_H_
