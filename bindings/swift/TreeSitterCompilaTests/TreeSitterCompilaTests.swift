import XCTest
import SwiftTreeSitter
import TreeSitterCompila

final class TreeSitterCompilaTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_compila())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Compila grammar")
    }
}
