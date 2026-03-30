const express = require('express');
const cors = require('cors');
const ExcelJS = require('exceljs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const EXCEL_PATH = path.join(__dirname, 'guestbook.xlsx');

app.post('/comment', async (req, res) => {
    const { message, sender } = req.body;

    const workbook = new ExcelJS.Workbook();
    let sheet;

    try {
        await workbook.xlsx.readFile(EXCEL_PATH);
        sheet = workbook.getWorksheet(1); // pakai index, bukan nama
    } catch {
        sheet = workbook.addWorksheet('Guestbook');
        sheet.addRow(['No', 'Name', 'Text']);
    }

    const nextNo = sheet.rowCount; // jumlah row sekarang = nomor urut
    sheet.addRow([nextNo, sender, message]);

    await workbook.xlsx.writeFile(EXCEL_PATH);

    res.send('Saved');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});