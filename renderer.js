
const fs = require('fs');
const ExcelJS = require('exceljs');
const bookshelf = document.getElementById('bookshelf');
const bookContent = document.getElementById('book-content');

// 示例词书数据（可以从后端加载或其他方式获取）
const books = [
    { name: 'Book 1', filePath: '1.xlsx' },
    { name: 'Book 2', filePath: '1.xlsx' }
    // 添加更多词书...
];

// 动态生成词书列表
books.forEach(book => {
    const bookButtons = {}; // 用于跟踪已创建的按钮
    const booksData = {}; // 用于跟踪已导入的词书数据
    if (!bookButtons[book.name]) {
        const bookButton = document.createElement('button');
        bookButton.textContent = book.name;
        bookButton.addEventListener('click', () => {
            importBookData(book.filePath, book.name);
        });
        bookButtons[book.name] = bookButton; // 将按钮添加到跟踪对象
        bookshelf.appendChild(bookButton);
        console.log(bookshelf);

        // 初始化每个词书的数据数组
        booksData[book.name] = [];
    }
});
function importBookData(filePath, bookName) {
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

            // 此时 booksData[bookName] 包含了导入的单词数据
            console.log(`Data for ${bookName}:`, booksData[bookName]);
        })
        .catch(function (error) {
            console.error('Error reading Excel file:', error);
        });
}