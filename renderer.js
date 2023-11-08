
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
    const bookButton = document.createElement('button');
    bookButton.textContent = book.name;
    bookButton.addEventListener('click', () => {
        importBookData(book.filePath);
    });
    bookshelf.appendChild(bookButton);
});
function importBookData(filePath) {
    const workbook = new ExcelJS.Workbook();
    const wordsArray = [];
    
    workbook.xlsx.readFile(filePath)
        .then(function () {
            const worksheet = workbook.getWorksheet(1);

            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                wordsArray.push({
                    word: row.getCell(1).value,
                    definition: row.getCell(2).value,
                    example: row.getCell(3).value
                });
            });

            // 此时 wordsArray 包含了导入的单词数据
            console.log(wordsArray);
        })
        .catch(function (error) {
            console.error('Error reading Excel file:', error);
        });
}
x   