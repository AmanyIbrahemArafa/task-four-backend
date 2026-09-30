const express = require("express");
const app = express();

// Middleware لقراءة البيانات بصيغة JSON
app.use(express.json());

const port = process.env.PORT || 3000;

// الاتصال بقاعدة البيانات (مطابق لمجلد db وملف moongose)

require("./db/mongoose");
// مسارات المستخدمين (مطابق لمجلد route وملف users)
const userRoutes = require("./route/user");
app.use(userRoutes);

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});