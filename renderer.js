
const fs = require('fs');
const ExcelJS = require('exceljs');
const bookshelf = document.getElementById('bookshelf');
const bookContent = document.getElementById('book-content');

// 示例词书数据（可以从后端加载或其他方式获取）
const books = [
    { name: 'Bio Words', filePath: '/words/Bio Vocabulary (179 Words).xlsx' },
    { name: '1', filePath: '1.xlsx' },
    { name: 'GRE Warm-up', filePath: 'words/GRE warm up (240 words).xlsx' },
    { name: 'College Words', filePath: 'words/important words for college students lyas K. (274 Words).xlsx' },
    { name: 'GRE', filePath: 'words/The GRE Quantitative Reasoning Test Arithmetic.xlsx' },
    { name: 'TOEFL', filePath: 'words/TOEFL Vocabulary (1000 Words).xlsx' }
    // 添加更多词书...
];

// 动态生成词书列表
const booksData = {}; // 用于跟踪已导入的词书数据
books.forEach(book => {
    const bookButtons = {}; // 用于跟踪已创建的按钮
    if (!bookButtons[book.name]) {
        const bookButton = document.createElement('button');
        bookButton.textContent = book.name;
        bookButton.addEventListener('click', () => {
            importBookData(book.name);
        });
        bookButtons[book.name] = bookButton; // 将按钮添加到跟踪对象
        bookshelf.appendChild(bookButton);

        // 初始化每个词书的数据数组
        booksData[book.name] = [];
    }
});
function importBookData(bookName) {
    // 遍历数组
    for (var i = 0; i < books.length; i++) {
        if (books[i].name === bookName) {
            // 找到匹配的name值，获取对应的filepath值
            var filePath = myArray[i].filepath;
            break;
        }
    }
    const workbook = new ExcelJS.Workbook();

    workbook.xlsx.readFile(filePath)
        .then(function () {
            const worksheet = workbook.getWorksheet(1);

            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                const entry = {
                    word: row.getCell(1).value,
                    definition: row.getCell(2).value,
                    example: row.getCell(3).value
                };
                // 将数据添加到特定词书的数组中
                booksData[bookName].push(entry);
            }); 
            localStorage.setItem('WordData', booksData);
            window.location.href = 'frontend/html/words.html';
            // 此时 booksData[bookName] 包含了导入的单词数据
            console.log(`Data for ${bookName}:`, booksData[bookName]);
        })
        .catch(function (error) {
            console.error('Error reading Excel file:', error);
        });
}