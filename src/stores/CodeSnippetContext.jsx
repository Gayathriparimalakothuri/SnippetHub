import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CodeSnippetContext = createContext();

const initialState = [
    // {
    //     id: 1,
    //     title: 'Hello World',
    //     code: 'console.log("Hello World");',
    //     language: 'javascript',
    //     category: "JavaScript",
    //     createdAt: new Date().toISOString()
    // },
    // {
    //     id: 2,
    //     title: 'React Component',
    //     code: 'function MyComponent() { return <div>Hello!</div>; }',
    //     language: 'javascript',
    //     category: "JavaScript",
    //     createdAt: new Date().toISOString()
    // },
    {
        id: 1,
        title: "Multiline Console Log",
        code: "console.log(\n  'Hello'\n  + ' '\n  + 'World!'\n);",
        language: "javascript",
        category: "JavaScript",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Multiline Print",
        code: "print(\"\"\"\nHello\nWorld!\n\"\"\")",
        language: "python",
        category: "Python",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: "Multiline System Output",
        code: "System.out.println(\n  \"Hello\\n\"\n  + \"World!\"\n);",
        language: "java",
        category: "Java",
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        title: "Multiline Standard Output",
        code: "std::cout << \"Hello\" << std::endl\n          << \"World!\" << std::endl;",
        language: "cpp",
        category: "C++",
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: "Multiline Basic Print",
        code: "puts(\n  \"Hello\\n\"\n  \"World!\"\n)",
        language: "ruby",
        category: "Ruby",
        createdAt: new Date().toISOString()
    },
    {
        id: 6,
        title: "Multiline Format Print",
        code: "printf(\n  \"Hello\\n\"\n  \"World!\\n\"\n);",
        language: "c",
        category: "C",
        createdAt: new Date().toISOString()
    },
    {
        id: 7,
        title: "Multiline Write-Host",
        code: "Write-Host \"Hello\"\nWrite-Host \"World!\"",
        language: "powershell",
        category: "PowerShell",
        createdAt: new Date().toISOString()
    },
    {
        id: 8,
        title: "Multiline Echo",
        code: "echo \"Hello\"\necho \"World!\"",
        language: "bash",
        category: "Bash",
        createdAt: new Date().toISOString()
    },

    {
        id: 10,
        title: "Multiline Alert",
        code: "alert(\n  'Hello\\n'\n  + 'World!'\n);",
        language: "javascript",
        category: "JavaScript",
        createdAt: new Date().toISOString()
    },
    {
        id: 11,
        title: "Multiline List Comprehension",
        code: "[x * 2\n for x in range(5)\n if x % 2 == 0]",
        language: "python",
        category: "Python",
        createdAt: new Date().toISOString()
    },
    {
        id: 12,
        title: "Multiline Stream Filter",
        code: "Arrays.asList(1, 2, 3, 4)\n  .stream()\n  .filter(n -> n % 2 == 0)\n  .forEach(System.out::println);",
        language: "java",
        category: "Java",
        createdAt: new Date().toISOString()
    },
    {
        id: 13,
        title: "Multiline Vector Initialization",
        code: "std::vector<int> numbers = {\n  1,\n  2,\n  3,\n  4,\n  5\n};",
        language: "cpp",
        category: "C++",
        createdAt: new Date().toISOString()
    },
    {
        id: 14,
        title: "Multiline Array Mapping",
        code: "[1, 2, 3].map do |x|\n  x * 3\nend",
        language: "ruby",
        category: "Ruby",
        createdAt: new Date().toISOString()
    },
    {
        id: 15,
        title: "Multiline For Loop",
        code: "for (int i = 0;\n     i < 5;\n     i++) {\n  printf(\"%d \\n\", i);\n}",
        language: "c",
        category: "C",
        createdAt: new Date().toISOString()
    },
    {
        id: 16,
        title: "Multiline Function Definition",
        code: "function greet(name) {\n  return (\n    'Hello, '\n    + name\n    + '!'\n  );\n}",
        language: "javascript",
        category: "JavaScript",
        createdAt: new Date().toISOString()
    },
    {
        id: 17,
        title: "Multiline Class Definition",
        code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print(\"Woof!\")",
        language: "python",
        category: "Python",
        createdAt: new Date().toISOString()
    },
    {
        id: 18,
        title: "Multiline Method Definition",
        code: "public class Calculator {\n    public int add(int a,\n                   int b) {\n        return a + b;\n    }\n}",
        language: "java",
        category: "Java",
        createdAt: new Date().toISOString()
    },
    {
        id: 19,
        title: "Multiline Template String",
        code: "const name = 'World';\nconsole.log(\n  `Hello,\n  ${name}!\n  How are you?`\n);",
        language: "javascript",
        category: "JavaScript",
        createdAt: new Date().toISOString()
    },
    {
        id: 20,
        title: "Multiline String Interpolation",
        code: "name = \"World\"\nputs(\n  \"Hello,\\n\"\n  \"\#{name}!\"\n)",
        language: "ruby",
        category: "Ruby",
        createdAt: new Date().toISOString()
    },
    {
        id: 21,
        title: "Multiline Variable Declaration",
        code: "let\n  message\n  =\n  \"Hello\";",
        language: "javascript",
        category: "JavaScript",
        createdAt: new Date().toISOString()
    },
    {
        id: 22,
        title: "Multiline Variable Assignment",
        code: "message\n  =\n  \"Goodbye\";",
        language: "javascript",
        category: "JavaScript",
        createdAt: new Date().toISOString()
    },
    {
        id: 23,
        title: "Multiline Conditional Statement",
        code: "if (age >= 18) {\n  console.log(\"Adult\");\n} else {\n  console.log(\"Minor\");\n}",
        language: "javascript",
        category: "JavaScript",
        createdAt: new Date().toISOString()
    },
    {
        id: 24,
        title: "Multiline Try-Catch Block",
        code: "try {\n  // Some code\n  // that might\n  // throw an error\n} catch (error) {\n  console.error(\n    \"An error occurred:\",\n    error\n  );\n}",
        language: "javascript",
        category: "JavaScript",
        createdAt: new Date().toISOString()
    },
    {
        id: 25,
        title: "Multiline Import Statement",
        code: "import\n  React\nfrom\n  'react';",
        language: "javascript",
        category: "JavaScript",
        createdAt: new Date().toISOString()
    }
];

// Load data from localStorage or fallback to initialSnippets
const getLocalData = () => {
  const localData = localStorage.getItem('snippets');
  return localData ? JSON.parse(localData) : initialState;
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SNIPPET':
      return [...state, action.payload];

    case 'UPDATE_SNIPPET':
      return state.map(snippet =>
        snippet.id === action.payload.id ? action.payload : snippet
      );

    case 'DELETE_SNIPPET':
      return state.filter(snippet => snippet.id !== action.payload);

    default:
      return state;
  }
};


export const CodeSnippetProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [], getLocalData);

  // Sync localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('snippets', JSON.stringify(state));
  }, [state]);

    // const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CodeSnippetContext.Provider value={{ snippets: state, dispatch }}>
            {children}
        </CodeSnippetContext.Provider>
    );
};



export const useCodeSnippets = () => useContext(CodeSnippetContext);
