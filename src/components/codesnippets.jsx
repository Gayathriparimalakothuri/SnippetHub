const CodeSnippets = {
    "codeSnippets": [
      // {
      //   "id": 1,
      //   "title": "Console Log",
      //   "code": "console.log('Hello World!');",
      //   "language": "javascript",
      //   "category": "JavaScript"
      // },
      // {
      //   "id": 2,
      //   "title": "Hello World Function",
      //   "code": "function helloWorld() {\n  console.log('Hello World!');\n}()\n console.log('output)\n consoel.log()\n helloWorld(); \n console.log()",
      //   "language": "javascript",
      //   "category": "JavaScript"
      // }

        {
          "id": 1,
          "title": "Multiline Console Log",
          "code": "console.log(\n  'Hello'\n  + ' '\n  + 'World!'\n);",
          "language": "javascript",
          "category": "JavaScript"
        },
        {
          "id": 2,
          "title": "Multiline Print",
          "code": "print(\"\"\"\nHello\nWorld!\n\"\"\")",
          "language": "python",
          "category": "Python"
        },
        {
          "id": 3,
          "title": "Multiline System Output",
          "code": "System.out.println(\n  \"Hello\\n\"\n  + \"World!\"\n);",
          "language": "java",
          "category": "Java"
        },
        {
          "id": 4,
          "title": "Multiline Standard Output",
          "code": "std::cout << \"Hello\" << std::endl\n          << \"World!\" << std::endl;",
          "language": "cpp",
          "category": "C++"
        },
        {
          "id": 5,
          "title": "Multiline Basic Print",
          "code": "puts(\n  \"Hello\\n\"\n  \"World!\"\n)",
          "language": "ruby",
          "category": "Ruby"
        },
        {
          "id": 6,
          "title": "Multiline Format Print",
          "code": "printf(\n  \"Hello\\n\"\n  \"World!\\n\"\n);",
          "language": "c",
          "category": "C"
        },
        {
          "id": 7,
          "title": "Multiline Write-Host",
          "code": "Write-Host \"Hello\"\nWrite-Host \"World!\"",
          "language": "powershell",
          "category": "PowerShell"
        },
        {
          "id": 8,
          "title": "Multiline Echo",
          "code": "echo \"Hello\"\necho \"World!\"",
          "language": "bash",
          "category": "Bash"
        },
        {
          "id": 10,
          "title": "Multiline Alert",
          "code": "alert(\n  'Hello\\n'\n  + 'World!'\n);",
          "language": "javascript",
          "category": "JavaScript"
        },
        {
          "id": 11,
          "title": "Multiline List Comprehension",
          "code": "[x * 2\n for x in range(5)\n if x % 2 == 0]",
          "language": "python",
          "category": "Python"
        },
        {
          "id": 12,
          "title": "Multiline Stream Filter",
          "code": "Arrays.asList(1, 2, 3, 4)\n  .stream()\n  .filter(n -> n % 2 == 0)\n  .forEach(System.out::println);",
          "language": "java",
          "category": "Java"
        },
        {
          "id": 13,
          "title": "Multiline Vector Initialization",
          "code": "std::vector<int> numbers = {\n  1,\n  2,\n  3,\n  4,\n  5\n};",
          "language": "cpp",
          "category": "C++"
        },
        {
          "id": 14,
          "title": "Multiline Array Mapping",
          "code": "[1, 2, 3].map do |x|\n  x * 3\nend",
          "language": "ruby",
          "category": "Ruby"
        },
        {
          "id": 15,
          "title": "Multiline For Loop",
          "code": "for (int i = 0;\n     i < 5;\n     i++) {\n  printf(\"%d \\n\", i);\n}",
          "language": "c",
          "category": "C"
        },
        {
          "id": 16,
          "title": "Multiline Function Definition",
          "code": "function greet(name) {\n  return (\n    'Hello, '\n    + name\n    + '!'\n  );\n}",
          "language": "javascript",
          "category": "JavaScript"
        },
        {
          "id": 17,
          "title": "Multiline Class Definition",
          "code": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print(\"Woof!\")",
          "language": "python",
          "category": "Python"
        },
        {
          "id": 18,
          "title": "Multiline Method Definition",
          "code": "public class Calculator {\n    public int add(int a,\n                   int b) {\n        return a + b;\n    }\n}",
          "language": "java",
          "category": "Java"
        },
        {
          "id": 19,
          "title": "Multiline Template String",
          "code": "const name = 'World';\nconsole.log(\n  `Hello,\n  ${name}!\n  How are you?`\n);",
          "language": "javascript",
          "category": "JavaScript"
        },
        {
          "id": 20,
          "title": "Multiline String Interpolation",
          "code": "name = \"World\"\nputs(\n  \"Hello,\\n\"\n  \"\#{name}!\"\n)",
          "language": "ruby",
          "category": "Ruby"
        },
        {
          "id": 21,
          "title": "Multiline Variable Declaration",
          "code": "let\n  message\n  =\n  \"Hello\";",
          "language": "javascript",
          "category": "JavaScript"
        },
        {
          "id": 22,
          "title": "Multiline Variable Assignment",
          "code": "message\n  =\n  \"Goodbye\";",
          "language": "javascript",
          "category": "JavaScript"
        },
        {
          "id": 23,
          "title": "Multiline Conditional Statement",
          "code": "if (age >= 18) {\n  console.log(\"Adult\");\n} else {\n  console.log(\"Minor\");\n}",
          "language": "javascript",
          "category": "JavaScript"
        },
        {
          "id": 24,
          "title": "Multiline Try-Catch Block",
          "code": "try {\n  // Some code\n  // that might\n  // throw an error\n} catch (error) {\n  console.error(\n    \"An error occurred:\",\n    error\n  );\n}",
          "language": "javascript",
          "category": "JavaScript"
        },
        {
          "id": 25,
          "title": "Multiline Import Statement",
          "code": "import\n  React\nfrom\n  'react';",
          "language": "javascript",
          "category": "JavaScript"
        }
      
    ]
  }

  export default CodeSnippets;